"use client";

import { useContact } from "@/hooks/useContacts";
import { Loader2, AlertTriangle, Link, Bell, Clock } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { FormField } from "@/components/other/FormField";
import {
  ACTION_OPTIONS,
  CUSTOMER_TYPE_OPTIONS,
  FOCUS_FIT_OPTIONS,
  GENDER_OPTIONS,
  SOURCE_OPTIONS,
} from "@/constants/options";
import MultiSelect from "@/components/other/MultiSelect";
import { useState } from "react";
import ReminderTable from "./other/ReminderTable";

interface ContactDetailsProps {
  contactId: number;
}

export function ContactDetails({ contactId }: ContactDetailsProps) {
  const { data: contact, isLoading } = useContact(contactId);
  const [selectedCustomerTypes, setSelectedCustomerTypes] = useState<string[]>(
    []
  );
  const [selectedSource, setSelectedSource] = useState<string>("");

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!contact) return null;

  return (
    <div className="h-full bg-white dark:bg-gray-900 pt-4">
      {/* Header Section */}
      <div className="p-6 bg-gray-100 dark:bg-gray-800 h-[230px]">
        <div className="flex gap-6 h-full items-center">
          {/* Avatar Section */}
          <div className="relative w-[170px] h-[170px] bg-[#4E5BA6] rounded-full flex items-center justify-center flex-shrink-0">
            <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
              <img
                src={contact.avatar || "/avatar.png"}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute w-[130px] h-[25px] -bottom-0 left-1/2 -translate-x-1/2 bg-[#4F46E5] text-white text-xs font-semibold flex items-center justify-center rounded-full">
              OPEN TO WORK
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex-1 flex flex-col justify-around h-[170px]">
            <div className="flex justify-between">
              <div className="space-y-1">
                <h2 className="text-3xl font-semibold dark:text-gray-100">
                  {contact.first_name} {contact.last_name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {contact.position}
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {contact.personal_email}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {contact.mobile}
                </div>
              </div>
              {/* Right Side Icons */}
              <div className="w-11 h-9 bg-yellow-100 flex items-center justify-center rounded-lg">
                <AlertTriangle className="text-yellow-500" />
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-gray-600">End Date</div>
                <div>
                  {contact.end_date} ({contact.days_remaining} days)
                </div>
              </div>
              <div>
                <div className="text-gray-600">Buy Rate</div>
                <div>${contact.buy_rate}/day</div>
              </div>
              <div>
                <div className="text-gray-600">Sell Rate</div>
                <div>${contact.sell_rate}/day</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="focus-profile">Focus Profile</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="intel">Intel</TabsTrigger>
          <TabsTrigger value="event-log">Event Log</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="p-4 space-y-6">
          {/* Overview Section */}
          <section>
            <h3 className="text-md font-medium bg-gray-200 dark:bg-gray-800 p-2 rounded-md">
              Overview
            </h3>
            <div className="p-4 grid grid-cols-3 gap-4">
              <FormField
                label="First Name"
                value={contact.first_name}
                required
              />
              <FormField label="Last Name" value={contact.last_name} required />
              <FormField
                label="Legal Name"
                value={`${contact.first_name} ${contact.last_name}`}
              />
              <FormField
                label="Gender"
                type="select"
                options={GENDER_OPTIONS}
              />
              <MultiSelect
                options={CUSTOMER_TYPE_OPTIONS}
                selectedValues={selectedCustomerTypes}
                label="Customer Types"
                placeholder="Select customer types"
                onChange={(selected) => {
                  setSelectedCustomerTypes(
                    selected.map((option) => String(option))
                  );
                }}
              />
              <FormField
                label="Focus Fit"
                type="select"
                options={FOCUS_FIT_OPTIONS}
              />
              <FormField
                label="Action"
                type="select"
                options={ACTION_OPTIONS}
              />
              <FormField label="Last Action Date" type="date" />
              <FormField
                label="Source"
                type="select"
                options={SOURCE_OPTIONS}
                value={selectedSource}
                onChange={(value) => {
                  setSelectedSource(String(value));
                }}
              />
              <FormField label="Location" value={contact.location} />
              <FormField
                label="Frequency of Catchup"
                type="number"
                value={contact.frequency_of_catchup}
              />
              {selectedSource &&
                selectedSource.toLocaleLowerCase().includes("referral") && (
                  <FormField
                    label="Referral Source"
                    value={contact.referral_source}
                    required
                  />
                )}

              <FormField
                label="Open to Work"
                type="select"
                options={[{ label: "Select open to work status", value: "" }]}
              />
            </div>
          </section>

          {/* Email, Phone, Address Section */}
          <section>
            <h3 className="text-md font-medium bg-gray-200 dark:bg-gray-800 p-2 rounded-md">
              Email, Phone, Address
            </h3>
            <div className="p-4 grid grid-cols-3 gap-4">
              <FormField
                label="Personal Email"
                type="email"
                value={contact.personal_email}
              />
              <FormField
                label="Work Email"
                type="email"
                value={contact.work_email}
              />
              <FormField
                label="Focus Email"
                type="email"
                value={contact.focus_email}
              />
              <FormField label="Mobile" type="tel" value={contact.mobile} />
              <FormField label="Phone (Other)" type="tel" />
              <FormField label="LinkedIn" type="text" />
            </div>
            {/* Residential Address Section */}
            <section className="mt-6">
              <div className="flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <h3 className="mx-4 text-lg font-semibold text-center">
                  Residential Address
                </h3>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <FormField
                label="Lookup Residential Address"
                placeholder="Lookup Residential Address"
              />
              <div className="p-4 rounded-b-lg grid grid-cols-3 gap-4">
                <FormField label="Apt / Unit No" placeholder="Apt / Unit No" />
                <FormField
                  label="Street Address"
                  placeholder="Street Address"
                />
                <FormField label="City" placeholder="City" />
                <FormField label="State" placeholder="State" />
                <FormField label="Postcode" placeholder="Postcode" />
                <FormField label="Country" placeholder="Country" />
              </div>
            </section>

            {/* Company Address Section */}
            <section className="mt-6">
              <div className="flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <h3 className="mx-4 text-lg font-semibold text-center">
                  Residential Address
                </h3>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <FormField
                label="Lookup Company Address"
                placeholder="Lookup Company Address"
              />
              <div className="p-4 rounded-b-lg grid grid-cols-3 gap-4">
                <FormField label="Apt / Unit No" placeholder="Apt / Unit No" />
                <FormField
                  label="Street Address"
                  placeholder="Street Address"
                />
                <FormField label="City" placeholder="City" />
                <FormField label="State" placeholder="State" />
                <FormField label="Postcode" placeholder="Postcode" />
                <FormField label="Country" placeholder="Country" />
              </div>
            </section>
          </section>

          {/* Commercials Section */}
          <section className="mt-6">
            <h3 className="text-md font-medium bg-gray-200 dark:bg-gray-800 p-2 rounded-md">
              Commercials
            </h3>
            <div className="p-4 rounded-b-lg grid grid-cols-3 gap-4">
              <FormField label="Focus Status" placeholder="Focus Status" />
              <FormField
                label="Employment Target"
                placeholder="Employment Target"
              />
              <FormField label="Service" placeholder="Service" />
              <FormField label="Payroll Type" placeholder="Payroll Type" />
              <FormField label="ABN" placeholder="ABN" />
              <FormField label="Company Name" placeholder="Company Name" />
              <FormField
                label="Target Daily Rate"
                placeholder="Target Daily Rate"
              />
              <FormField label="Target Salary" placeholder="Target Salary" />
              <FormField
                label="Authorised Representative"
                placeholder="Authorised Representative"
              />
              <FormField
                label="Email (Authorised Representative)"
                placeholder="Email (Authorised Representative)"
              />
              <FormField label="Nationality" placeholder="Nationality" />
              <FormField label="Visa Subclass" placeholder="Visa Subclass" />
            </div>
          </section>

          {/* Reminders Section */}
          <section>
            <h3 className="text-md font-medium bg-gray-200 dark:bg-gray-800 p-2 rounded-md mb-4">
              Reminders
            </h3>
            <ReminderTable />
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
