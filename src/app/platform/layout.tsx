'use client'

import { ChatProvider } from '../../context/ChatContext'
import { SidebarProvider } from '../../context/SidebarContext'

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <ChatProvider>
        {children}
      </ChatProvider>
    </SidebarProvider>
  )
} 