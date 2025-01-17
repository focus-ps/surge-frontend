"use client";

import { Loader2, AlertTriangle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { FormField } from "@/components/ui/FormField";
import {
  YES_NO_OPTIONS,
} from "@/constants/options";
import { useCompany, useUpdateCompany, useIndustries, useAccountDirectors } from "@/hooks/useCompanies";
import Image from 'next/image';
import { Company } from "@/app/api/company";

interface CompanyDetailsProps {
  companyId: number;
}

export function CompanyDetails({ companyId }: CompanyDetailsProps) {
  const { data: company, isLoading } = useCompany(companyId);
  const { data: industries = [] } = useIndustries();
  const { data: accountDirectors = [] } = useAccountDirectors();
  const updateCompany = useUpdateCompany();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
      </div>
    );
  }

  const handleUpdate = (field: keyof Company, value: any) => {
    let processedValue = value;
    // Special processing for certain fields
    switch (field) {
      case 'founded':
        processedValue = value ? Number(value) : null;
        break;

      case 'client':
        processedValue = value === 'true';
        break;

      case 'company_industry_id':
      case 'owner_id':
        processedValue = value ? Number(value) : null;
        break;
    }
      updateCompany.mutate({
        id: companyId,
        data: { [field]: processedValue }
      });
  
  };

  const industryOptions = industries.map(industry => ({
    label: industry.name,
    value: industry.id.toString()
  }));

  const accountDirectorOptions = accountDirectors.map(accountDirector => ({
    label: accountDirector.name,
    value: accountDirector.id.toString()
  }));

  if (!company) return null;

  const currentIndustryName = industries.find(
    industry => industry.id === company.company_industry_id
  )?.name || 'Not specified';

  return (
    <div className="h-full bg-white dark:bg-gray-900 pt-4">
      {/* Header Section */}
      <div className="p-6 bg-gray-100 dark:bg-gray-800 h-[230px]">
        <div className="flex gap-6 h-full items-center">
          {/* Avatar Section */}
          <div className="relative w-[170px] h-[170px] bg-[#99D9A8] rounded-full flex items-center justify-center flex-shrink-0">
            <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
              <Image
                src={company.logo || "/business-avatar.png"}
                alt="Company Logo"
                className="w-full h-full object-cover"
                width={150}
                height={150}
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
                {currentIndustryName}
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
            <div className="p-4 grid grid-cols-2 gap-4">
              <FormField 
                label="Company Name" 
                value={company.name} 
                onChange={(value) => handleUpdate('name', value)}
                required 
              />
                <FormField 
                  label="ABN" 
                  value={company.abn || ""} 
                  onChange={(value) => handleUpdate('abn', value)}
                  required 
                />
              <FormField
                label="Industry"
                type="select"
                options={industryOptions}
                value={company.company_industry_id?.toString()}
                onChange={(value) => handleUpdate('company_industry_id', value)}
              />
              <FormField 
                label="Founded" 
                value={company.founded?.toString()}
                onChange={(value) => handleUpdate('founded', value)}
              />
              <FormField
                label="Focus Client"
                type="toggleGroup"
                options={YES_NO_OPTIONS}
                value={company.client?.toString()}
                onChange={(value) => handleUpdate('client', value)}
              />
              <FormField 
              label="Record Owner" 
              type="select"
              options={accountDirectorOptions}
              value={company.owner_id?.toString()} 
              onChange={(value) => handleUpdate('owner_id', value)}
              />
            </div>
            <div className="p-4">
              <FormField
                label="Postscript Notes - important additional information about this company"
                type="textarea"
                value={company.postscript_notes || ""}
                rows={6}
                onChange={(value) => handleUpdate('postscript_notes', value)}
              />
            </div>
            <div className="p-4 grid grid-cols-3 gap-4">

            </div>
          </section>

          {/* Email, Phone, Address Section */}
          <section>
            <h3 className="text-md font-medium bg-gray-200 dark:bg-gray-800 p-2 rounded-md">
              Email, Phone, Address
            </h3>

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
