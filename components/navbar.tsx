'use client'
import React from 'react'
import Link from 'next/link';
import Timer from "./timer";
import { Menu, Search, SquareArrowRightExit, DoorOpen } from 'lucide-react';
import Input  from '../components/ui/input';
import { useAuth } from '@/hooks/useAuth';


// function createCounter() {
//   let count = 0; 
//   return function() {
//     count++;
//     return count;
//   };
// }

const navbar = ({toggleSidebar}: { toggleSidebar: () => void }) => {
  // const counter = createCounter();
  const { signOut } = useAuth();

  return (
    <div  className="flex bg-slate-900 text-white shadow-sm text-base-content sticky top-0 z-50">
        <div className="flex flex-1 items-center gap-4 p-2">
            <button onClick={toggleSidebar} className='rounded-lg hover:bg-slate-800 p-4'> 
              <DoorOpen  size={24}/>
            </button>
            <div className="flex flex-1 p-2 text-xl">
              <h1>SUPERVISOR DASHBOARD</h1>
            </div>
            <div className="flex flex-1 items-center gap-4 px-2 py-2 ml-15">
              <Timer/>
            </div>
        </div>

        <div className="flex max-w-xs flex-initial items-center gap-2 p-2"> 
          <Input type="text" placeholder="Search" className="input input-bordered max-w-xs text-black" />   
          <button className="rounded-lg hover:bg-slate-800 p-4">
            <Search size={24}/>
          </button>
          <button onClick={signOut} className="rounded-lg hover:bg-slate-800 p-4">
            <SquareArrowRightExit size={24}/>
          </button>
        </div>
    </div>
  )
}

export default navbar