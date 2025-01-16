import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  contactsApi,
  Contact,
} from "../app/api/contact";
import { apiClient } from "@/app/api/client";

export const useContacts = () => {
  return useQuery<Contact[]>({
    queryKey: ["contacts"],
    queryFn: async () => {
      const data = await contactsApi.getAll();
      return Array.isArray(data) ? data : []; // Ensure data is always an array
    },
  });
};

export const useContact = (id: number) => {
  return useQuery({
    queryKey: ["contact", id],
    queryFn: () => contactsApi.getById(id),
    enabled: !!id, // Only fetch when id is provided
  });
};


export const useFilterContacts = (params: {
  filters?: Record<string, any>;
  page?: number;
  per_page?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["filteredContacts", JSON.stringify(params)],
    queryFn: async () => {
      const response = await contactsApi.filter({
        filters: params.filters || {},
        page: params.page || 1,
        per_page: params.per_page || 25,
        search: params.search || "",
      });
      return response;
    },
  });
};

export const useContactSearch = (query: string) => useQuery({
  queryKey: ['contacts', query],
  queryFn: async () => {
    const { data } = await apiClient.get('/contact/search', {
      params: {
        q: query
      }
    });
    return data;
  },
  enabled: !!query && query.length >= 2, // Only search when query is at least 2 chars
  staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
});


// export const useCompanyContacts = (companyId: number | null) => {
//   return useQuery({
//     queryKey: ["contacts", "company", companyId],
//     queryFn: () => contactsApi.getByCompany(companyId!),
//     enabled: !!companyId, // Only fetch when companyId is provided
//   });
// };

// export const useCreateContact = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (contact: Omit<Contact, "id">) => contactsApi.create(contact),
//     onSuccess: (_, variables) => {
//       // Invalidate both all contacts and company-specific contacts
//       queryClient.invalidateQueries({ queryKey: ["contacts"] });
//       queryClient.invalidateQueries({
//         queryKey: ["contacts", "company", variables.company_id],
//       });
//     },
//   });
// };

// export const useUpdateContact = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ id, data }: { id: number; data: Partial<Contact> }) =>
//       contactsApi.update(id, data),
//     onSuccess: (_, variables) => {
//       queryClient.invalidateQueries({ queryKey: ["contacts"] });
//       if (variables.data.company_id) {
//         queryClient.invalidateQueries({
//           queryKey: ["contacts", "company", variables.data.company_id],
//         });
//       }
//     },
//   });
// };

// export const useDeleteContact = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: contactsApi.delete,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["contacts"] });
//     },
//   });
// };


// export const useCustomerTypes = (contactId: number | null) => {
//   return useQuery<CustomerType[]>({
//     queryKey: ["customerTypes", contactId],
//     queryFn: () => {
//       if (!contactId) return Promise.resolve([]); // Return empty array if contactId is null
//       return contactsApi.getCustomerTypes(contactId);
//     },
//     enabled: !!contactId, // Only fetch when contactId is provided
//   });
// };

// export const useActionTypes = (contactId: number | null) => {
//   return useQuery<ActionType[]>({
//     queryKey: ['actionTypes', contactId],
//     queryFn: () => {
//       if (!contactId) return Promise.resolve([]); // Return empty array if contactId is null
//       return contactsApi.getActionTypes(contactId);
//     },
//     enabled: !!contactId, // Only fetch when contactId is provided
//   });
// };
