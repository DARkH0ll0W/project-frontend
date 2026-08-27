import Image from "next/image";
import { Home, Users, Bell, ChartSpline } from "lucide-react";

import Logo from "../public/Logo.svg";
import Brand from "../public/Brand.svg";
import Link from "next/link";

type SidebarProps = {
  isOpen: boolean;
  onNavigate?: () => void;
};

// Mobile (below md): fixed overlay drawer. Fully off-screen when isOpen is
// false (-translate-x-full), slides in over the content when true. Because
// it's off-screen either way when closed, isOpen doubles as "is the label
// visible" with no extra responsive classes needed.
// Desktop (md+): always visible inline (md:translate-x-0 forces this),
// isOpen only toggles width between w-64 (expanded, labels shown) and w-20
// (icons only) — same collapse behavior as before.
export default function Sidebar({ isOpen, onNavigate }: SidebarProps) {
  const menuItems = [
    { icon: Home, label: "Dashboard", link: "dashboard" },
    { icon: ChartSpline, label: "Charts", link: "charts" },
    { icon: Bell, label: "Notifications", link: "notifications" },
  ];

  return (
    <aside
      className={`bg-slate-900 flex flex-col h-screen text-white transition-transform duration-300 z-40
        fixed inset-y-0 left-0 w-64
        md:sticky md:top-0 md:translate-x-0
        ${isOpen ? "translate-x-0 md:w-64" : "-translate-x-full md:w-20"}
      `}
    >
      <Link
        href="/"
        onClick={onNavigate}
        className="flex items-center gap-4 rounded-lg hover:bg-slate-800 p-2 m-4 space-y-2"
      >
        {isOpen ? <Image className="pr-4" src={Brand} alt="Logo" /> : <Image src={Logo} alt="Logo" />}
      </Link>

      <div className="flex-1 p-2 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-center rounded-lg hover:bg-slate-800">
              <Link href={item.link} onClick={onNavigate} className="flex flex-row gap-6 p-6 w-full">
                <Icon size={20} />
                {isOpen && <span>{item.label}</span>}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Settings removed here — it was an unstyled placeholder page with
          no real content, completing the earlier decision to drop it
          alongside Location. Users stays. */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center rounded-lg hover:bg-slate-800">
          <Link href="users" onClick={onNavigate} className="flex flex-row items-center gap-4 p-3 w-full">
            <Users size={20} />
            {isOpen && <span>Users</span>}
          </Link>
        </div>
      </div>
    </aside>
  );
}
