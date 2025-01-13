import { Contact } from "@/app/api/contact";
import { Checkbox } from "./ui/checkbox";
import { MoreVertical } from "lucide-react";
import { Button } from "./ui/button";
import { useFilterContacts } from "@/hooks/useContacts";
import { useState } from "react";
import router from "next/router";

export default function ContactTable({
  filters,
  search,
  onContactClick
}: {
  filters: {};
  search: string;
  onContactClick?: (id:number) => void;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const { data: contactsData } = useFilterContacts({
    filters,
    page: currentPage,
    per_page: itemsPerPage,
    search: search,
  });

  const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
  const endPage = Math.min(startPage + 4, contactsData?.total_pages || 1);

  if (!contactsData) return <h1>No contacts found</h1>;

  return (
    <div >
      <div className="flex flex-col">
        <table className="table-auto">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
              <th className="p-4">
                <Checkbox className="dark:border-gray-600" />
              </th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Mobile</th>
              <th>Type</th>
              <th>Capability</th>
              <th>Fit</th>
              <th className="w-8 p-4"></th>
            </tr>
          </thead>
          <tbody>
            {contactsData?.contacts.map((contact: Contact) => (
              <tr
                key={contact.id}
                className="border-t dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
                onClick={() => onContactClick?.(contact.id)}>
                <td className="p-4">
                  <Checkbox className="dark:border-gray-600" />
                </td>
                <td className="dark:text-gray-200">{contact.first_name}</td>
                <td className="dark:text-gray-200">{contact.last_name}</td>
                <td className="dark:text-gray-200">{contact.mobile}</td>
                <td className="dark:text-gray-200">{"N/A"}</td>
                <td className="dark:text-gray-200">{"N/A"}</td>
                <td>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium dark:text-gray-200">
                    {contact.focus_fit}
                  </span>
                </td>
                <td>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="dark:text-gray-400"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
          disabled={currentPage === (contactsData?.total_pages || 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
