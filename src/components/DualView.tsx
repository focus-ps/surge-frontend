"use client";

import { useParams, useRouter } from "next/navigation";
import { ContactDetails } from "./ContactDetails";
import { Contacts } from './Contacts';
import Navbar from "./other/Navbar";
import SearchInput from "./other/SearchInput";
import { Whiteboard } from "./Whiteboard";

type PanelType = 'contact' | 'company' | 'whiteboard' | null;

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
      router.push(`/dual-view/${type}/${id || 'null'}/${rightPanel.type || 'contact'}/${rightPanel.id || 'null'}`);
    } else {
      router.push(`/dual-view/${leftPanel.type || 'contact'}/${leftPanel.id || 'null'}/${type}/${id || 'null'}`);
    }
  };

  const renderPanel = (panel: PanelState, side: 'left' | 'right') => {
    switch (panel.type) {
      case 'contact':
        return panel.id && panel.id !== 'null' ? (
          <ContactDetails contactId={Number(panel.id)} />
        ) : (
          <Contacts onContactClick={(id) => handlePanelSelect(String(id), 'contact', side)} />
        );
      case 'company':
        return <div>Company View (Coming Soon)</div>;
      case 'whiteboard':
        return <Whiteboard contactId={Number(panel.id)} />;
      default:
        return <Contacts onContactClick={(id) => handlePanelSelect(String(id), 'contact', side)} />;
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
