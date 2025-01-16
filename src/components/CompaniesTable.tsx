import { Contact } from "@/app/api/contact";
import { Checkbox } from "./ui/checkbox";
import { MoreVertical } from "lucide-react";
import { Button } from "./ui/button";
import { useFilterContacts } from "@/hooks/useContacts";
import { useState } from "react";
import { useFilterCompanies } from "@/hooks/useCompanies";
import { Company } from "@/app/api/company";

interface CompaniesTableProps {
  filters: any;
  onCompanyClick: (id: number) => void;
}

export default function CompaniesTable({ filters, onCompanyClick }: CompaniesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const { data: companiesData } = useFilterCompanies({
    client: filters.client,
    msa_expiry: filters.msa_expiry,
    search_term: filters.search_term,
    page: currentPage,
    per_page: itemsPerPage,
  });
  
  const totalPages = Math.ceil(companiesData?.total_count/itemsPerPage);
  const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPages || 1);

  if (!companiesData) return <h1>No companies found</h1>;

  return (
    <div >
      <div className="flex flex-col">
        <table className="table-auto">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
              <th className="p-4">
                <Checkbox className="dark:border-gray-600" />
              </th>
              <th>Company Name</th>
              <th>ABN</th>
              <th>Industry</th>
              <th className="w-8 p-4">Client</th>
            </tr>
          </thead>
          <tbody>
            {companiesData?.companies.map((company: Company) => (
              <tr
                key={company.id}
                className="border-t dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
                onClick={() => onCompanyClick(company.id)}>
                <td className="p-4">
                  <Checkbox className="dark:border-gray-600" />
                </td>
                <td className="dark:text-gray-200">{company.name}</td>
                <td className="dark:text-gray-200">{company.abn}</td>
                <td className="dark:text-gray-200">{company.industry_name}</td>
                {company.client && <td>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mediu bg-slate-200 dark:text-gray-200">
                    client
                  </span>
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="border-t flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
          ).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "ghost"}
              onClick={() => setCurrentPage(page)}
              size="sm"
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === (totalPages || 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
