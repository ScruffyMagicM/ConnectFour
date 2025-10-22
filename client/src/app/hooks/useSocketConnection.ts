// Base hook that manages the socket connection itself
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocketConnection = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('Socket connected');
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Socket disconnected');
    });

    return () => {
      newSocket.close();
    };
  }, []);

  return { socket, isConnected };
};
