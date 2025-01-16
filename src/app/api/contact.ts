import { apiClient } from './client';
import { z } from 'zod';

// Define the Contact schema
const ContactSchema = z.object({
  id: z.number(),
  avatar: z.instanceof(Uint8Array).nullable(),
  insightly_id: z.number().nullable(),
  default_email: z.string().nullable(),
  employment_type: z.number().nullable(),
  DOB: z.date().nullable(),
  first_name: z.string(),
  focus_email: z.string().nullable(),
  focus_fit: z.number().nullable(),
  focus_status: z.number().nullable(),
  freq_of_catchup: z.string().nullable(),
  legal_name: z.string().nullable(),
  linkedIn: z.string().url().nullable(),
  modified_by: z.number().nullable(),
  nationality: z.string().nullable(),
  last_name: z.string().nullable(),
  other_phone: z.string().nullable(),
  open_to_work: z.boolean().nullable(),
  title: z.string().nullable(),
  mobile: z.string().nullable(),
  personal_email: z.string().nullable(),
  portal_access: z.boolean().nullable(),
  visa_subclass: z.string().nullable(),
  target_salary: z.tuple([z.number().nullable(), z.number().nullable()]).nullable(),
  source_contact: z.number().nullable(),
  source: z.number().nullable(),
  target_daily_rate: z.tuple([z.number().nullable(), z.number().nullable()]).nullable(),
  work_email: z.string().nullable(),
  created_at: z.date().nullable(),
  modified_at: z.date().nullable(),
  email: z.string().nullable().nullable(),
  phone: z.string().nullable().nullable(),
  position: z.string().nullable().nullable(),
  company_id: z.number().nullable(),
});

export interface CustomerType {
  id: number;
  name: string;
  // Add other fields as needed
}

export interface ActionType {
  id: number;
  name: string;
  // Add other fields as needed
}
  
export type Contact = z.infer<typeof ContactSchema>;

// API functions
export const contactsApi = {

  getAll: async () => {
    const { data } = await apiClient.get('/contact/all');
    return data;
  },

  getById: async (id: number) => {
    const { data } = await apiClient.get(`/contact/${id}`);
    return data;
  },

  // getByCompany: async (companyId: number) => {
  //   const { data } = await apiClient.get(`/company/${companyId}/contacts`);
  //   return data;
  // },

  // create: async (contact: Omit<Contact, 'id'>) => {
  //   const { data } = await apiClient.post('/contact', contact);
  //   return data;
  // },

  // update: async (id: number, contact: Partial<Contact>) => {
  //   const { data } = await apiClient.patch(`/contact/${id}`, contact);
  //   return data;
  // },

  // delete: async (id: number) => {
  //   await apiClient.delete(`/contact/${id}`);
  // },

  filter: async (params: {
    filters: Record<string, any>;
    page: number;
    per_page: number;
    search: string;
  }) => {
    try {
      const { data } = await apiClient.post('/contact/filter', {
        filters: params.filters || {},
        page: params.page || 1,
        per_page: params.per_page || 25,
        search: params.search || ''
      });
      return data;
    } catch (error) {
      console.error('Filter request failed:', error);
      throw error;
    }
  },

  getCustomerTypes: async (contactId: number): Promise<CustomerType[]> => {
    const response = await apiClient.get(`/contacts/${contactId}/customer-types`);
    return response.data;
  },

  getActionTypes: async (contactId: number): Promise<ActionType[]> => {
    const response = await apiClient.get(`/contacts/${contactId}/action-types`);
    return response.data;
  },

};