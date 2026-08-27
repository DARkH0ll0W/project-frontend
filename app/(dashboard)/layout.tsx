'use client'
import { useEffect, useState } from 'react';

import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Start collapsed/hidden on phones so the drawer doesn't cover the whole
  // screen on first load; desktop keeps the previous default of expanded.
  // Tailwind's md breakpoint is 768px, matched here for consistency.
  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches) {
      setSidebarOpen(false)
    }
  }, [])

  const closeOnMobile = () => {
    if (window.matchMedia('(max-width: 767px)').matches) {
      setSidebarOpen(false)
    }
  }

  return (
    <div className='flex h-screen'>
      <Sidebar isOpen={sidebarOpen} onNavigate={closeOnMobile} />

      {/* Backdrop: only rendered (and only intercepts clicks) on mobile
          while the drawer is open, so it doesn't affect desktop at all */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className='flex-1 overflow-y-auto'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
