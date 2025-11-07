import { ApiResponse, ApiError } from '../types/api.types';
import { API_CONFIG } from '../config/api.config';

class ApiClient {
  private baseURL: string;
  private timeout: number;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string, timeout: number, headers: Record<string, string>) {
    this.baseURL = baseURL;
    this.timeout = timeout;
    this.defaultHeaders = headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          ...this.defaultHeaders,
          ...options.headers
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.message || 'API request failed');
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        throw error;
      }
      throw new Error('Unknown error occurred');
    }
  }

  async get<T>(endpoint: string, socketId: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    const queryString = params
      ? '?' + new URLSearchParams(params).toString()
      : '';
    return this.request<T>(`${endpoint}${queryString}`, {
      method: 'GET',
      headers: { 'x-socket-id': socketId },
    });
  }

  async post<T>(endpoint: string, socketId: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'x-socket-id': socketId },
    });
  }

  async put<T>(endpoint: string, socketId: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'x-socket-id': socketId },
    });
  }

  async delete<T>(endpoint: string, socketId: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      headers: { 'x-socket-id': socketId },
    });
  }

  async patch<T>(endpoint: string, socketId: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'x-socket-id': socketId },
    });
  }
}

export const apiClient = new ApiClient(
  API_CONFIG.baseURL,
  API_CONFIG.timeout,
  API_CONFIG.headers
);
