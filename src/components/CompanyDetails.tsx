"use client";

import { Loader2, AlertTriangle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { FormField } from "@/components/ui/FormField";
import {
  ACTION_OPTIONS,
  CUSTOMER_TYPE_OPTIONS,
  FOCUS_FIT_OPTIONS,
  GENDER_OPTIONS,
  SOURCE_OPTIONS,
  YES_NO_OPTIONS,
} from "@/constants/options";
import { useCompany, useUpdateCompany } from "@/hooks/useCompanies";

interface CompanyDetailsProps {
  companyId: number;
}

export function CompanyDetails({ companyId }: CompanyDetailsProps) {
  const updateCompany = useUpdateCompany();
  const { data: company, isLoading } = useCompany(companyId);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
      </div>
    );
  }

  const handleClientUpdate = (value: string | number | string[]) => {
    updateCompany.mutate({
      id: companyId,
      data: {
        client: value === 'yes'
      }
    });
  };

  if (!company) return null;

  return (
    <div className="h-full bg-white dark:bg-gray-900 pt-4">
      {/* Header Section */}
      <div className="p-6 bg-gray-100 dark:bg-gray-800 h-[230px]">
        <div className="flex gap-6 h-full items-center">
          {/* Avatar Section */}
          <div className="relative w-[170px] h-[170px] bg-[#99D9A8] rounded-full flex items-center justify-center flex-shrink-0">
            <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
              <img
                src={company.logo || "/avatar.png"}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Company Info */}
          <div className="flex justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-semibold dark:text-gray-100">
                  {company.name}
                </h2>
                {company.client && (
                  <div>
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-mediu bg-white border dark:text-gray-200">
                      client
                    </span>
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                {company.industry_name}
              </p>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {company.abn}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                location
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="event-log">Record History</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="p-4 space-y-6">
          {/* Overview Section */}
          <section>
            <h3 className="text-md font-medium bg-gray-200 dark:bg-gray-800 p-2 rounded-md">
              Overview
            </h3>
            <div className="p-4 grid grid-cols-3 gap-4">
              <FormField label="Company Name" value={company.name} required />
              <FormField label="ABN" value={company.abn || ""} required />

              <FormField
                label="Industry"
                type="select"
                options={GENDER_OPTIONS}
              />
              <FormField label="Founded" value={`${company.founded}`} />

              <FormField
                label="Focus Client"
                type="select"
                options={ACTION_OPTIONS}
              />
              <FormField label="Record Owner" value={company.name || ""} />
            </div>
            <div className="p-4">
              <FormField
                label="Postscript Notes - important additional information about this company"
                type="textarea"
                value={company.description || ""}
                rows={6}
                // onChange={(value) => {
                //   setSelectedSource(String(value));
                // }}
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
                label="Client"
                type="toggleGroup"
                options={YES_NO_OPTIONS}
                value={company.client?.toString()}
                onChange={(value) => {
                  handleClientUpdate(value);
                }}
              />
              {/* <FormField
                label="Work Email"
                type="email"
                value={company.work_email}
              />
              <FormField
                label="Focus Email"
                type="email"
                value={company.focus_email}
              />
              <FormField label="Mobile" type="tel" value={company.mobile} />
              <FormField label="Phone (Other)" type="tel" />
              <FormField label="LinkedIn" type="text" /> */}
            </div>
          </section>
          {/* Residential Address Section */}
          {/* <section className="mt-6">
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
            </section> */}

          {/* Company Address Section */}
          {/* <section className="mt-6">
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
          </section> */}

          {/* Commercials Section */}
          {/* <section className="mt-6">
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
          </section> */}

          {/* Reminders Section */}
          {/* <section>
            <h3 className="text-md font-medium bg-gray-200 dark:bg-gray-800 p-2 rounded-md mb-4">
              Reminders
            </h3>
            <ReminderTable />
          </section> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
