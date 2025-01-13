"use client";

import { Search, Plus, Filter, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Contact } from "@/app/api/contact";
import { useFilterContacts } from "@/hooks/useContacts";
import {
  ACTION_OPTIONS,
  CUSTOMER_TYPE_OPTIONS,
  FOCUS_FIT_OPTIONS,
} from "@/constants/options";
import { useState } from "react";
import { memo } from "react";
import ContactTable from "./ContactTable";


export function ContactList({onContactClick}: {onContactClick: (id: number) => void}) {
  // Add state for filters at the top of your component
  const [filters, setFilters] = useState<{
    action_types: string[];
    capabilities: string[];
    customer_types: string[];
    focus_fit: string[];
  }>({
    action_types: [],
    capabilities: [],
    customer_types: [],
    focus_fit: [],
  });

  const [selectedCustomerType, setSelectedCustomerType] = useState("");
  const [selectedCapability, setSelectedCapability] = useState("");
  const [selectedFit, setSelectedFit] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
 
  const [search, setSearch] = useState("");


  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Contacts</h1>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => {
              setSelectedCustomerType("");
              setSelectedCapability("");
              setSelectedFit("");
              setSelectedAction("");
              setFilters({
                action_types: [],
                capabilities: [],
                customer_types: [],
                focus_fit: [],
              });
            }}
          >
            <Filter className="h-4 w-4" />
            Clear All Filters
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Contact
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Select
          value={selectedCustomerType}
          onValueChange={(value) => {
            setSelectedCustomerType(value);
            setFilters((prev) => ({ ...prev, customer_types: [value] }));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Customer Type" />
          </SelectTrigger>
          <SelectContent>
            {CUSTOMER_TYPE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedCapability}
          onValueChange={(value) => {
            setSelectedCapability(value);
            setFilters((prev) => ({ ...prev, capabilities: [value] }));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Capability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Business Analysis</SelectItem>
            <SelectItem value="2">Delivery Leadership</SelectItem>
            <SelectItem value="3">Project Management</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={selectedFit}
          onValueChange={(value) => {
            setSelectedFit(value);
            setFilters((prev) => ({ ...prev, focus_fit: [value] }));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Fit" />
          </SelectTrigger>

          <SelectContent>
            {FOCUS_FIT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedAction}
          onValueChange={(value) => {
            setSelectedAction(value);
            setFilters((prev) => ({ ...prev, action_types: [value] }));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Action" />
          </SelectTrigger>
          <SelectContent>
            {ACTION_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow">
        <div className="p-4 border-b dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search"
                className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Show Open to Work
              </span>
              <Switch />
            </div>
          </div>
        </div>

        <ContactTable filters={filters} search={search} onContactClick={onContactClick}/>
 
      </div>
    </div>
  );
}
