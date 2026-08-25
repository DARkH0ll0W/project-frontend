import Image from "next/image";
import {
  Home,
  Users,
  Bell ,
  ChartSpline,
  MapPin ,
  Settings
} from "lucide-react";

import Logo from "../public/Logo.svg";
import Brand from "../public/Brand.svg";
import Link from 'next/link';
import { link } from "fs";


type SidebarProps = {
  isOpen: boolean;
};

export default function Sidebar({ isOpen }: SidebarProps) {
    const menuItems = [
        { icon: Home, label: "Dashboard", link:'dashboard' },
        { icon: MapPin , label: "Location", link:'locations' },
        { icon: ChartSpline, label: "Charts", link:'charts' },
        { icon: Bell  , label: "Notifications", link:'notifications' },
        
    ];

    return (
        <aside
            className={`bg-slate-900 flex flex-col h-screen text-white transition-all duration-300 ${
            isOpen ? "w-64" : "w-20"
        }`}
        >
        <Link href="/" className='flex items-center gap-4 rounded-lg hover:bg-slate-800 p-2 m-4 space-y-2'>
            {isOpen ? <Image className="pr-4" src={Brand} alt="Logo"/> : <Image src={Logo} alt="Logo" />}
        </Link>
        <div className="flex-1 p-2 space-y-2 ">
            {menuItems.map((item, index) => {
                const Icon = item.icon;
                const link = item.link ? item.link : '#'; // Use '#' as a fallback if no link is provided
                const Label = item.label ? item.label : ''; // Use an empty string as a fallback if no label is provided

            return (
                <div
                key={index}
                className="flex items-center rounded-lg hover:bg-slate-800">
                <Link href={link} className="flex flex-row gap-6 p-6">
                    <Icon size={20} />

                    {isOpen && (
                        <span>{Label}</span>
                    )}
                </Link>
                </div>
            );
            })}
            </div>
            {/* Bottom item */}
            <div className="p-4 border-t border-slate-700 ">
                <div className="flex items-center rounded-lg hover:bg-slate-800">
                    <Link href="users" className="flex flex-row items-center gap-4 p-3 ">
                        <Users size={20} />
                        {isOpen && <span>Users</span>}
                    </Link>
                </div>
                <div className="flex items-center rounded-lg  hover:bg-slate-800">
                    <Link href="settings" className="flex flex-row items-center gap-4 p-3 ">
                    <Settings size={20} />
                    {isOpen && <span>Settings</span>}
                    </Link>
                </div>
                
            </div>  
        </aside>
    );
    }