"use client";

import { useSession } from "next-auth/react";
import { User } from "lucide-react";

export default function Topbar() {
  const { data: session } = useSession();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
      <div />
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{session?.user?.name || "User"}</p>
          <p className="text-xs text-gray-500">{session?.user?.role || "sales"}</p>
        </div>
        <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </header>
  );
}
