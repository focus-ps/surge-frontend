import Link from "next/link";
import { CircleUserRound, MessageCircle } from "lucide-react";
import SearchInput from "./GlobalSearch";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  return (
    <div className=" relative top -0 left-0 right-0 z-50 dark:bg-white bg-gray-950 border-b h-[62px] border-gray-100 dark:border-gray-800">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-8">
          <div className="flex items-center gap-8 flex-1">
            <Link href="/" className="flex items-center">
              <CircleUserRound className="h-8 w-8 dark:text-gray-700 text-gray-200" />
            </Link>
          </div>

          <div className="flex items-center gap-1">
            <button className="flex items-center gap-2 px-3 py-2 text-sm dark:text-gray-700 text-gray-200">
              <MessageCircle className="h-5 w-5" />
              <span className="hidden sm:inline">Chat</span>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>    
  );
}