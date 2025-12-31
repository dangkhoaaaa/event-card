import { client } from './client';
import { Card, CreateCardDto } from '@/types';

export const cardApi = {
  getAll: async (hostName?: string): Promise<Card[]> => {
    const params = hostName ? { hostName } : {};
    const response = await client.get<Card[]>('/cards', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Card> => {
    const response = await client.get<Card>(`/cards/${id}`);
    return response.data;
  },

  getBySlug: async (slug: string): Promise<Card> => {
    const response = await client.get<Card>(`/cards/slug/${slug}`);
    return response.data;
  },

  create: async (
    data: CreateCardDto,
    images?: Record<string, File>,
  ): Promise<Card> => {
    const formData = new FormData();
    formData.append('templateId', data.templateId);
    formData.append('title', data.title);
    formData.append('hostName', data.hostName);
    
    // Separate text content from image placeholders
    const textContent: Record<string, string> = {};
    const imageKeys: string[] = [];
    
    // Handle images as Record<string, File> or File[]
    if (images && !Array.isArray(images)) {
      Object.keys(data.content).forEach((key) => {
        const value = data.content[key];
        // Check if this is an image placeholder or if there's an image file for this key
        if (value === '__IMAGE_PLACEHOLDER__' || images[key]) {
          // This is an image placeholder
          if (images[key]) {
            imageKeys.push(key);
            // Add placeholder to content so backend knows which key this image belongs to
            textContent[key] = '__IMAGE_PLACEHOLDER__';
          }
        } else if (typeof value === 'string') {
          // Regular text content
          textContent[key] = value;
        }
      });
      
      formData.append('content', JSON.stringify(textContent));
      formData.append('imageKeys', JSON.stringify(imageKeys));
      
      if (data.isPublished !== undefined) {
        formData.append('isPublished', String(data.isPublished));
      }

      if (imageKeys.length > 0) {
        // Append images in the same order as imageKeys
        imageKeys.forEach((key) => {
          if (images[key]) {
            formData.append('images', images[key]);
          }
        });
      }
    } else {
      // Handle as simple content without images
      formData.append('content', JSON.stringify(data.content));
      if (data.isPublished !== undefined) {
        formData.append('isPublished', String(data.isPublished));
      }
    }

    const response = await client.post<Card>('/cards', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  update: async (id: string, data: Partial<CreateCardDto>): Promise<Card> => {
    const response = await client.patch<Card>(`/cards/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await client.delete(`/cards/${id}`);
  },
};

