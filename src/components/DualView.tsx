"use client";

import { useParams, useRouter } from "next/navigation";
import { ContactDetails } from "./ContactDetails";
import { Contacts } from './Contacts';
import Navbar from "./other/Navbar";
import SearchInput from "./other/GlobalSearch";
import { Whiteboard } from "./Whiteboard";
import { Companies } from "./Companies";
import { CompanyDetails } from "./CompanyDetails";

type PanelType = 'contacts' | 'companies' | 'whiteboard' | null;

type PanelState = {
  type: PanelType;
  id: string | null;
};

export function DualView() {
  const router = useRouter();
  const params = useParams();

  // Parse URL parameters into panel states
  const leftPanel: PanelState = {
    type: params?.leftType as PanelType || null,
    id: params?.leftId as string
  };

  const rightPanel: PanelState = {
    type: params?.rightType as PanelType || null,
    id: params?.rightId as string
  };

  const handlePanelSelect = (id: string, type: PanelType, side: 'left' | 'right') => {
    if (side === 'left') {
      router.push(`/dual-view/${type}/${id || 'null'}/${rightPanel.type || 'contacts'}/${rightPanel.id || 'null'}`);
    } else {
      router.push(`/dual-view/${leftPanel.type || 'contacts'}/${leftPanel.id || 'null'}/${type}/${id || 'null'}`);
    }
  };

  const renderPanel = (panel: PanelState, side: 'left' | 'right') => {
    switch (panel.type) {
      case 'contacts':
        return panel.id && panel.id !== 'null' ? (
          <ContactDetails contactId={Number(panel.id)} />
        ) : (
          <Contacts onContactClick={(id) => handlePanelSelect(String(id), 'contacts', side)} />
        );
      case 'companies':
        return panel.id && panel.id !== 'null' ? (  
          <CompanyDetails companyId={Number(panel.id)} />
        ) : (
          <Companies onCompanyClick={(id) => handlePanelSelect(String(id), 'companies', side)} />
        );
      case 'whiteboard':
        return <Whiteboard contactId={Number(panel.id)} />;
      default:
        return <Contacts onContactClick={(id) => handlePanelSelect(String(id), 'contacts', side)} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-3 flex">
        <div className="w-1/2 px-4">
          <SearchInput onSelect={(id, type) => handlePanelSelect(String(id), type, 'left')} />
          {renderPanel(leftPanel, 'left')}
        </div>
        <div className="w-1/2 px-4">
          <SearchInput onSelect={(id, type) => handlePanelSelect(String(id), type, 'right')} />
          {renderPanel(rightPanel, 'right')}
        </div>
      </main>
    </div>
  );
}

export default DualView;
