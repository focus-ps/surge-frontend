import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { companiesApi, Company, CompanyFilterParams } from "../app/api/company";

export const useCompanies = () => {
  return useQuery<Company[]>({
    queryKey: ["companies"],
    queryFn: async () => {
      const data = await companiesApi.getAll();
      return Array.isArray(data) ? data : [];
    },
  });
};

export const useCompany = (id: number) => {
  return useQuery<Company>({
    queryKey: ["company", id],
    queryFn: () => companiesApi.getById(id),
    enabled: !!id,
  });
};

export const useFilterCompanies = (params:CompanyFilterParams) => {
  return useQuery({
    queryKey: ["filteredCompanies", JSON.stringify(params)],
    queryFn: async () => {
      const response = await companiesApi.filter(params);
      return response;
    },
  });
};

export const useUpdateCompany = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Company> }) => {
      return await companiesApi.update(id, data);
    }
  });
};