import { apiClient } from './client';
import { z } from 'zod';

// Define types using Zod schemas
export const ContactSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email().nullable(),
  phone: z.string().nullable(),
  company_id: z.number(),
  position: z.string().nullable(),
  // ... add other fields from your backend model
});

export type Contact = z.infer<typeof ContactSchema>;

// API functions
export const contactsApi = {
  getAll: async () => {
    const { data } = await apiClient.get('/contacts');
    return data;
  },

  getById: async (id: number) => {
    const { data } = await apiClient.get(`/contact/${id}`);
    return data;
  },

  getByCompany: async (companyId: number) => {
    const { data } = await apiClient.get(`/company/${companyId}/contacts`);
    return data;
  },

  create: async (contact: Omit<Contact, 'id'>) => {
    const { data } = await apiClient.post('/contact', contact);
    return data;
  },

  update: async (id: number, contact: Partial<Contact>) => {
    const { data } = await apiClient.patch(`/contact/${id}`, contact);
    return data;
  },

  delete: async (id: number) => {
    await apiClient.delete(`/contact/${id}`);
  },

  filter: async (filters: any) => {
    const { data } = await apiClient.post('/contact/filtered', filters);
    return data;
  },
};