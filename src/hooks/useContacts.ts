import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactsApi, Contact } from '../app/api/contact';

export const useContacts = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: contactsApi.getAll,
  });
};

export const useContact = (id: number) => {
  return useQuery({
    queryKey: ['contact', id],
    queryFn: () => contactsApi.getById(id),
    enabled: !!id, // Only fetch when id is provided
  });
};

export const useCompanyContacts = (companyId: number | null) => {
  return useQuery({
    queryKey: ['contacts', 'company', companyId],
    queryFn: () => contactsApi.getByCompany(companyId!),
    enabled: !!companyId, // Only fetch when companyId is provided
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (contact: Omit<Contact, 'id'>) => contactsApi.create(contact),
    onSuccess: (_, variables) => {
      // Invalidate both all contacts and company-specific contacts
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ 
        queryKey: ['contacts', 'company', variables.company_id] 
      });
    },
  });
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Contact> }) => 
      contactsApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      if (variables.data.company_id) {
        queryClient.invalidateQueries({ 
          queryKey: ['contacts', 'company', variables.data.company_id] 
        });
      }
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: contactsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
};

export const useFilterContacts = () => {
  return useMutation({
    mutationFn: (filters: any) => contactsApi.filter(filters),
  });
};