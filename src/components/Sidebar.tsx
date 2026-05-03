"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  UserCircle,
  LogOut,
  Bell,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const Sidebar = () => {
  const pathname = usePathname();
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Loans", icon: Wallet, href: "/loans" },
    { name: "Investments", icon: TrendingUp, href: "/investments" },
    { name: "Account", icon: UserCircle, href: "/account" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col p-6">
      <div className="mb-10 pl-2">
        <Logo variant="orange" className="transform scale-90 origin-left" />
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium group ${
                isActive
                  ? "bg-emerald-50 text-[#00A67E]"
                  : "text-gray-500 hover:text-[#00A67E] hover:bg-emerald-50/50"
              }`}>
              <item.icon
                size={20}
                className={
                  isActive
                    ? "text-[#00A67E]"
                    : "group-hover:text-[#00A67E] transition-colors"
                }
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-gray-50">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium group">
          <LogOut
            size={20}
            className="group-hover:text-red-500 transition-colors"
          />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
