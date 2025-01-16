import { apiClient } from './client';
import { z } from 'zod';

// Define the Company schema with Zod
export const CompanySchema = z.object({
  id: z.number(),
  name: z.string(),
  created_at: z.string(),
  modified_at: z.string(),
  abn: z.string().nullable(),
  archived: z.boolean().nullable(),
  archived_date: z.string().nullable(),
  archived_reason: z.string().nullable(),
  client: z.boolean().nullable(),
  logo: z.string().url().nullable(),
  msa: z.boolean().nullable(),
  msa_expiry: z.tuple([z.string().nullable(), z.string().nullable()]).nullable(),
  description: z.string().nullable(),
  industry_name: z.string().nullable(),
  website: z.string().url().nullable(),
  founded: z.number().min(1800).max(new Date().getFullYear()).nullable(),
});

export interface CompanyFilterParams {
  client: boolean;
  msa_expiry: string[];
  search_term: string;
  page: number;
  per_page: number;
}

export type Company = z.infer<typeof CompanySchema>;

export const companiesApi = {
  getAll: async () => {
    const { data } = await apiClient.get('/company');
    return CompanySchema.array().parse(data);
  },

  getById: async (id: number) => {
    const { data } = await apiClient.get(`/company/${id}`);
    return CompanySchema.parse(data);
  },

  filter: async (params: CompanyFilterParams) => {
    try {
      const { data } = await apiClient.post('/company/filtered', params);
      return data;
    } catch (error) {
      console.error('Filter request failed:', error);
      throw error;
    }
  },

  update: async (id: number, data: Partial<Company>) => {
    const { data: response } = await apiClient.patch(`/company/${id}`, data);
    return CompanySchema.parse(response);
  },
};