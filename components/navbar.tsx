'use client'
import React from 'react'
import Link from 'next/link';
import Timer from "./timer";
import { Menu, Search, SquareArrowRightExit, Bell } from 'lucide-react';
import Input from '../components/ui/input';
import { useAuth } from '@/hooks/useAuth';

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { signOut } = useAuth();

  return (
    <div className="flex bg-slate-900 text-white shadow-sm text-base-content sticky top-0 z-30">
      <div className="flex flex-1 items-center gap-2 md:gap-4 p-2 min-w-0">
        <button onClick={toggleSidebar} className="rounded-lg hover:bg-slate-800 p-3 md:p-4 shrink-0">
          <Menu size={24} />
        </button>

        {/* Truncates instead of wrapping/overflowing on narrow screens */}
        <div className="flex-1 p-2 text-base md:text-xl truncate">
          <h1 className="truncate">SUPERVISOR DASHBOARD</h1>
        </div>

        {/* Timer hidden on the smallest screens — not critical info there
            and competes for space with the toggle + title */}
        <div className="hidden sm:flex items-center gap-4 px-2 py-2 md:ml-15 shrink-0">
          <Timer />
        </div>
      </div>

      <div className="flex flex-initial items-center gap-1 md:gap-2 p-2 shrink-0">
        {/* Full search input only at md+; icon-only trigger below that so
            it doesn't crowd the title on phones */}
        <Input
          type="text"
          placeholder="Search"
          className="hidden md:block input input-bordered max-w-xs text-black"
        />
        <button className="rounded-lg hover:bg-slate-800 p-3 md:p-4">
          <Search size={24} />
        </button>

        {/* Notification bell — UI shell only for now, matching the sketch.
            Links to the Notifications tab. The badge count and the actual
            trend-based alert logic (rising/falling vitals, device-connect
            headsup) are a separate, not-yet-built piece — see notifications
            tab. */}
        <Link href="notifications" className="relative rounded-lg hover:bg-slate-800 p-3 md:p-4">
          <Bell size={24} />
        </Link>

        <button onClick={signOut} className="rounded-lg hover:bg-slate-800 p-3 md:p-4">
          <SquareArrowRightExit size={24} />
        </button>
      </div>
    </div>
  )
}

export default Navbar
