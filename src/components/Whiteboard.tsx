"use client";

import { useState } from "react";
import { FileText, AtSign, Share2, Mic, MicOff, X } from "lucide-react";
import dynamic from "next/dynamic";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { useVoiceTranscription } from '@/hooks/useVoiceTranscription';
import { toast } from "sonner";

// Import TipTap Editor dynamically to avoid SSR issues
const TiptapEditor = dynamic(() => import("./other/TiptapEditor"), {
  ssr: false,
});

interface WhiteboardProps {
  contactId: number;
}

interface Tab {
  id: string;
  name: string;
  content: string;
}

export function Whiteboard({ contactId }: WhiteboardProps) {
  const [activeTab, setActiveTab] = useState("tab1");
  const [tabs, setTabs] = useState<Tab[]>([
    { id: "tab1", name: "Notes 1", content: "" },
  ]);
  const [activeView, setActiveView] = useState<"notes" | "chat" | "share">("notes");

  const addNewTab = () => {
    const newTab = {
      id: `tab${tabs.length + 1}`,
      name: `Notes ${tabs.length + 1}`,
      content: "",
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  const handleContentChange = (content: string) => {
    setTabs(tabs.map(tab => 
      tab.id === activeTab ? { ...tab, content } : tab
    ));
  };

  const handleTranscriptionResult = (text: string) => {
    setTabs(tabs.map(tab => 
      tab.id === activeTab 
        ? { ...tab, content: tab.content + ' ' + text } 
        : tab
    ));
  };

  const handleReset = () => {
    setTabs(tabs.map(tab => 
        tab.id === activeTab ? { ...tab, content:'' } : tab
      ));
    };

  const { isListening, startListening, stopListening } = useVoiceTranscription({
    onTranscriptionResult: handleTranscriptionResult,
  });

  const toggleVoiceRecording = () => {
    if (!isListening) {
      startListening();
    } else {
      stopListening();
    }
  };

  const handleDeleteTab = (tabId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (tabs.length <= 1) {
      toast.error("Cannot delete the last tab");
      return;
    }
    
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    
    if (activeTab === tabId) {
      const index = tabs.findIndex(tab => tab.id === tabId);
      const newActiveTab = index === 0 ? newTabs[0].id : newTabs[index - 1].id;
      setActiveTab(newActiveTab);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content || '';
      const plainText = new DOMParser()
        .parseFromString(activeTabContent, 'text/html')
        .body.textContent || '';
      
      await navigator.clipboard.writeText(plainText);
      toast.success('Content copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Top Bar */}
      <div className="border-b dark:border-gray-800 p-4">
        <div className="flex flex-col justify-between">
          <h2 className="text-lg font-semibold">Interactive Whiteboard</h2>
          <span className="text-sm text-gray-500">
            Quickly jot down ideas and information with ease.
          </span>
        </div>
        
        {/* Tool Icons */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setActiveView("notes")}
            className={`p-2 rounded-lg ${
              activeView === "notes" ? "bg-gray-100 dark:bg-gray-800" : ""
            }`}
          >
            <FileText className="h-5 w-5" />
          </button>
          <button
            onClick={() => setActiveView("share")}
            className={`p-2 rounded-lg ${
              activeView === "share" ? "bg-gray-100 dark:bg-gray-800" : ""
            }`}
          >
            <Share2 className="h-5 w-5" />
          </button>
          <button
            onClick={() => setActiveView("chat")}
            className={`p-2 rounded-lg ${
              activeView === "chat" ? "bg-gray-100 dark:bg-gray-800" : ""
            }`}
          >
            <AtSign className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="overflow-auto">
        {activeView === "notes" && (
          <div className="p-4">
            <TiptapEditor 
              key={activeTab}
              content={tabs.find(tab => tab.id === activeTab)?.content || ""}
              onUpdate={handleContentChange}
            />
          </div>
        )}
        {activeView === "chat" && (
          <div className="p-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              AI Chat Coming Soon
            </div>
          </div>
        )}
        {activeView === "share" && (
          <div className="p-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              Share Options Coming Soon
            </div>
          </div>
        )}
      </div>

      {/* Bottom Tabs */}
      <div className="border-t dark:border-gray-800">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center">
            <TabsList>
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="group flex items-center gap-2 relative">
                  <span>{tab.name}</span>
                  <span
                    onClick={(e) => handleDeleteTab(tab.id, e)}
                    className="ml-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-1 cursor-pointer inline-flex items-center"
                  >
                    <X className="h-3 w-3" />
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
            <button
              onClick={addNewTab}
              className="ml-2 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              +
            </button>
          </div>
        </Tabs>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t dark:border-gray-800 flex justify-between items-center">
        <button 
          onClick={toggleVoiceRecording}
          className={`p-2 rounded-full transition-colors ${
            isListening 
              ? 'bg-red-500 text-white' 
              : 'bg-gray-100 dark:bg-gray-800'
          }`}
        >
          {isListening ? (
            <MicOff className="h-5 w-5" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </button>
        <div className="flex gap-2">
          <button 
            onClick={handleCopyToClipboard}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            Copy
          </button>
          <button className="px-4 py-2 bg-gray-800 text-white rounded-md">
            Send via Email
          </button>
          <button 
            className="px-4 py-2 bg-gray-800 text-white rounded-md"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}