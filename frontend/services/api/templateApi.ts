import { apiClient } from './client';
import { Template, CardType } from '@/types';

export const templateApi = {
  getAll: async (type?: CardType): Promise<Template[]> => {
    const params = type ? { type } : {};
    const response = await apiClient.get<Template[]>('/templates', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Template> => {
    const response = await apiClient.get<Template>(`/templates/${id}`);
    return response.data;
  },

  create: async (data: Partial<Template>, thumbnail?: File): Promise<Template> => {
    const formData = new FormData();
    formData.append('name', data.name || '');
    formData.append('type', data.type || CardType.OTHER);
    formData.append('design', JSON.stringify(data.design || {}));
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    const response = await apiClient.post<Template>('/templates', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};



