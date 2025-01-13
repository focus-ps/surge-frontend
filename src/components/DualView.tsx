"use client";
import { useParams, useRouter } from "next/navigation";
import { ContactDetails } from "./ContactDetails";
import { ContactList } from './Contacts';
import Navbar from "./other/Navbar";
import SearchInput from "./other/SearchInput";

type PanelState = {
  type: 'contact' | 'company' | null;
  id: string | null;
};

export function DualView() {
  const router = useRouter();
  const params = useParams();

  // Parse URL parameters into panel states
  const leftPanel: PanelState = {
    type: params?.leftType as PanelState['type'] || null,
    id: params?.leftId as string || null
  };

  const rightPanel: PanelState = {
    type: params?.rightType as PanelState['type'] || null,
    id: params?.rightId as string || null
  };

  const handlePanelSelect = (id: string | null, type: PanelState['type'], side: 'left' | 'right') => {
    if (side === 'left') {
      router.push(`/dual-view/${type}/${id || null}/${rightPanel.type || 'contact'}/${rightPanel.id || null}`);
    } else {
      router.push(`/dual-view/${leftPanel.type || 'contact'}/${leftPanel.id || null}/${type}/${id || null}`);
    }
  };

  const renderPanel = (panel: PanelState, side: 'left' | 'right') => {
    if (panel.type === 'contact') {
      return (panel.id && panel.id !== 'null') ? (
        <ContactDetails contactId={Number(panel.id)} />
      ) : (
        <ContactList onContactClick={(id) => handlePanelSelect(String(id), 'contact', side)} />
      );
    }
    // Add more conditions for other types (company, etc.)
    return <ContactList onContactClick={(id) => handlePanelSelect(String(id), 'contact', side)} />;
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-3 flex">
        <div className="w-1/2 px-4">
          <SearchInput onSelect={(id) => handlePanelSelect(String(id), 'contact', 'left')} />
          {renderPanel(leftPanel, 'left')}
        </div>
        
        <div className="w-1/2 px-4">
          <SearchInput onSelect={(id) => handlePanelSelect(String(id), 'contact', 'right')} />
          {renderPanel(rightPanel, 'right')}
        </div>
      </main>
    </div>
  );
}

export default DualView;
