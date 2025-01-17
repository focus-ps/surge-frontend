import { apiClient } from './client';
import { z } from 'zod';

export interface Industry {
  id: number;
  name: string;
}

export interface AccountDirector {
  id: number;
  name: string;
}

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
  msa_expiry: z.string().nullable(), 
  description: z.string().nullable(),
  company_industry_id: z.number().nullable(),
  industry_name: z.string().nullable(),
  website: z.string().nullable(),
  founded: z.number().nullable(),
  owner_id: z.number().nullable(),
  consultant_reviewer: z.string().nullable(),
  short_description: z.string().nullable(),
  postscript_notes: z.string().nullable(),
});

export const CompanyUpdateSchema = CompanySchema.partial();

export interface CompanyFilterParams {
  client: boolean;
  msa_expiry: string[];
  search_term: string;
  page: number;
  per_page: number;
}

export type Company = z.infer<typeof CompanySchema>;
export type CompanyUpdate = z.infer<typeof CompanyUpdateSchema>;

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

  update: async (id: number, data: Partial<CompanyUpdate>) => {
    try {
      const { data: response } = await apiClient.patch(`/company/${id}`, data);
      return CompanySchema.parse(response);
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw error;
    }
  },

  getIndustries: async (): Promise<Industry[]> => {
    try {
      const { data } = await apiClient.get('/company/industries');
      return data;
    } catch (error) {
      console.error('Failed to fetch industries:', error);
      throw error;
    }
  },

  getAccountDirectors: async (): Promise<AccountDirector[]> => {
    try {
      const { data } = await apiClient.get('/account-directors');
      return data;
    } catch (error) {
      console.error('Failed to fetch owners:', error);
      throw error;
    }
  },
};
