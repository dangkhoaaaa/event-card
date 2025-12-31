import { apiClient } from './client';
import { Guest, CreateGuestDto, GuestStatistics } from '@/types';

export const guestApi = {
  getAll: async (cardId: string): Promise<Guest[]> => {
    const response = await apiClient.get<Guest[]>('/guests', {
      params: { cardId },
    });
    return response.data;
  },

  getStatistics: async (cardId: string): Promise<GuestStatistics> => {
    const response = await apiClient.get<GuestStatistics>(
      `/guests/statistics/${cardId}`,
    );
    return response.data;
  },

  create: async (data: CreateGuestDto): Promise<Guest> => {
    const response = await apiClient.post<Guest>('/guests', data);
    return response.data;
  },

  createBulk: async (data: {
    cardId: string;
    names: string[];
    email?: string;
  }): Promise<Guest[]> => {
    const response = await apiClient.post<Guest[]>('/guests/bulk', data);
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<CreateGuestDto & { response?: string; message?: string }>,
  ): Promise<Guest> => {
    const response = await apiClient.patch<Guest>(`/guests/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/guests/${id}`);
  },

  markAsViewed: async (cardId: string, name: string): Promise<Guest> => {
    const response = await apiClient.get<Guest>(
      `/guests/view/${cardId}/${encodeURIComponent(name)}`,
    );
    return response.data;
  },
};



