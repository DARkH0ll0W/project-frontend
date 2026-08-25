'use client'
import { useState } from 'react';


import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar'

const DashboardLayout = ({children}:{children: React.ReactNode}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  

  return (
    <div className='flex h-screen'>
        <Sidebar isOpen={sidebarOpen}/>
        <div className="flex-1 flex flex-col sticky top-0">
              <Navbar 
                  toggleSidebar = {() => setSidebarOpen(!sidebarOpen)}
                  />
              <main className='flex-1 overflow-y-auto'>
                {children}
              </main>            
            
          </div>
    </div>
  )
}

export default DashboardLayout