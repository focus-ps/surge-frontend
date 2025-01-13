"use client";

import { SetStateAction, useEffect, useState } from "react";
import { Grid2X2, Search, User } from "lucide-react";
import { Contact } from "@/app/api/contact";
import { useContactSearch } from "@/hooks/useContacts";

interface SearchInputProps {
  onSelect: (contactId: number | string | null) => void;
}

export default function SearchInput({ onSelect }: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showHorizontalBar, setShowHorizontalBar] = useState(false);
  const [activeButton, setActiveButton] = useState("");

  const { data: contacts, isLoading } = useContactSearch(query);

  return (
    <div className="relative flex flex-col">
      <div className="flex items-center justify-between">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search anything or type / for more options"
          className="w-full h-10 px-4 py-2 pl-10 pr-12 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
        />
        <div className="absolute top-3 left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-500" />
        </div>
        <button
          className="absolute top-2.5 right-2 flex items-center"
          onClick={() => setShowHorizontalBar(!showHorizontalBar)}
        >
          <Grid2X2
            className={`h-5 w-5 hover:text-gray-700 ${
              showHorizontalBar ? "text-gray-800" : "text-gray-400"
            }`}
          />
        </button>

        {/* Dropdown */}
        {isOpen && query && (
          <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-2 border-b border-gray-300 dark:border-gray-800">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Contacts
              </h3>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {contacts?.map((contact: Contact) => (
                <button
                  key={contact.id}
                  onClick={() => {
                    onSelect(contact.id);
                    setIsOpen(false);
                    setQuery("");
                  }}
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
      {/* Horizontal Bar */}
      {showHorizontalBar && (
        <div className="horizontal-bar bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-lg p-1 mt-2">
          {[
            "Contacts",
            "Opportunities",
            "Tasks",
            "Engagements",
            "Companies",
            "Whiteboard",
          ].map((buttonName) => (
            <button
              key={buttonName}
              className={`mr-2 px-2 py-1 rounded ${
                activeButton === buttonName
                  ? "bg-white shadow-md dark:bg-gray-800"
                  : ""
              }`}
              onClick={() => {
                ()=>setActiveButton(buttonName);
                {
                  buttonName === "Contacts" && onSelect(null);
                }
                setIsOpen(false);
              }}
            >
              {buttonName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
