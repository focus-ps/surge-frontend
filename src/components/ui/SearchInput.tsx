'use client';


import { useEffect, useState } from 'react';
import { Grid2X2, Search, User } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/app/api/client';
import { z } from 'zod';

// Define the Contact schema
const ContactSchema = z.object({
    id: z.number(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().nullable(),
    phone: z.string().nullable(),
    position: z.string().nullable(),
    company_id: z.number(),
  });
  
  type Contact = z.infer<typeof ContactSchema>;
  

export default function SearchInput() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);


  // Use React Query for search
  const { data: contacts, isLoading } = useQuery({
    queryKey: ['contacts', 'search', query],
    queryFn: async () => {
      const { data } = await apiClient.get('/contacts/search', {
        params: { q: query }
      });
      console.log(data);
      return data;
    },
    enabled: !!query && query.length >= 2, // Only search when query is at least 2 chars
    staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
  });


  return (
    <div className="relative flex-1">
      <input
        type="text"
        value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
        placeholder="Search anything or type / for more options"
        className="w-full h-10 px-4 py-2 pl-10 pr-12 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
      />
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-500" />
      </div>
      <button className="absolute inset-y-0 right-2 flex items-center">
        <Grid2X2 className="h-5 w-5 text-gray-500 hover:text-gray-700" />
      </button>

      {/* Dropdown */}
      {isOpen && query && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-2 border-b border-gray-300 dark:border-gray-800">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Contacts
            </h3>
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {contacts?.map((contact: Contact) => (
              <button
              key={contact.id}
              className="w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
            >
              <User className="h-4 w-4 text-gray-500" />
              <div>
                <div className="text-sm font-medium">
                  {contact.first_name} {contact.last_name}
                </div>
                {contact.position && (
                  <div className="text-xs text-gray-500">
                    {contact.position}
                  </div>
                )}
              </div>
            </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
