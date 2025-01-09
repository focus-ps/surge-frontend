'use client'

import * as React from 'react'
import { ThemeProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function Providers({ children, ...props }: ThemeProviderProps) {
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider {...props}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}