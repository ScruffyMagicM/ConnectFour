import type { ApiResponse } from '../interfaces/api.interface';

export async function createApiResponse<T>(data: Promise<T>, message = 'Request successful'): Promise<ApiResponse<T>> {
    const localData = await data;
  
    return {
        data: localData,
        message,
        success: true,
  };
}