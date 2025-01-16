"use client";

import { Search, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import MultiSelect  from "./other/MultiSelect";
import CompaniesTable from "./CompaniesTable";
import { MSA_EXPIRY_OPTIONS } from "@/constants/options";


export function Companies({onCompanyClick}: {onCompanyClick: (id: number) => void}) {
  // Add state for filters at the top of your component
  const [filters, setFilters] = useState<{
    client: string;
    msa_expiry: string[];
    search_term: string;
  }>({
    client: 'all',
    msa_expiry: [],
    search_term: "",
  });

  const [selectedClientOption, setSelectedClientOption] = useState<string>('all');
  const [selectedMsaExpiry, setSelectedMsaExpiry] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClearFilters = () => {
    setSelectedClientOption('');
    setSelectedMsaExpiry([]);
    setSearchTerm("");
    setFilters({
      client: 'all',
      msa_expiry: [],
      search_term: "",
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Companies</h1>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleClearFilters}
          >
            <Filter className="h-4 w-4" />
            Clear All Filters
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Company
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Select
          value={selectedClientOption}
          onValueChange={(value) => {
            setSelectedClientOption(value);
            setFilters((prev) => ({
              ...prev,
              client: value
            }));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Clients</SelectItem>
            <SelectItem value="false">Non-Clients</SelectItem>
          </SelectContent>
        </Select>
        <MultiSelect
                options={MSA_EXPIRY_OPTIONS}
                selectedValues={selectedMsaExpiry}
                placeholder="Select Msa Expiry"
                onChange={(selected) => {
                  setSelectedMsaExpiry(
                    selected.map((option) => String(option))
                  );
                  setFilters((prev) => ({
                    ...prev,
                    msa_expiry: selected.map((option) => String(option))
                  }));
                }}
              />
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow">
        <div className="p-4 border-b dark:border-gray-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search"
                className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                value={filters.search_term}
                onChange={(e) => setFilters((prev) => ({ ...prev, search_term: e.target.value }))}
              />
            </div>
        </div>

        <CompaniesTable filters={filters} onCompanyClick={onCompanyClick}/>
 
      </div>
    </div>
  );
}
