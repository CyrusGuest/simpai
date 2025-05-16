'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, Menu, PenSquare, Trash2, MessageSquare, ChevronLeft, Settings, MessageSquarePlus, X } from 'lucide-react'
import { useSidebar } from '../../../context/SidebarContext'
import { useChat } from '../../../context/ChatContext'
import { motion, AnimatePresence } from 'framer-motion'
import DeleteConfirmationDialog from '../../../components/ui/DeleteConfirmationDialog'
import { useRouter, usePathname } from 'next/navigation'
import SearchResults from './SearchResults'

interface ChatEntry {
  id: string
  title: string
  timestamp: Date
  category: 'Today' | 'Yesterday' | 'Previous 7 Days' | 'Previous 30 Days'
}

const ChatHistory = () => {
  const { isExpanded, setIsExpanded } = useSidebar()
  const { chats, deleteChat, currentChatId, setCurrentChatId } = useChat()
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [chatToDelete, setChatToDelete] = useState<string | null>(null)
  const [isSearchMode, setIsSearchMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Array<{
    chatId: string
    messageContent: string
    timestamp: Date
    role: 'user' | 'assistant'
  }>>([])
  const router = useRouter()
  const pathname = usePathname()

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      const results = chats.flatMap(chat => 
        chat.messages.map(message => ({
          chatId: chat.id,
          messageContent: message.content,
          timestamp: chat.timestamp,
          role: message.role
        }))
      ).filter(message => 
        message.messageContent.toLowerCase().includes(query.toLowerCase())
      ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  const handleSearchResultClick = (chatId: string) => {
    setIsSearchMode(false)
    setSearchQuery('')
    setSearchResults([])
    router.push(`/platform/chat/${chatId}`)
    setCurrentChatId(chatId)
  }

  const categorizeChats = () => {
    const now = new Date()
    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)
    const sevenDaysAgo = new Date(now)
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    return chats.reduce((acc, chat) => {
      const date = new Date(chat.timestamp)
      let category = 'Previous 30 Days'
      
      if (date.toDateString() === now.toDateString()) {
        category = 'Today'
      } else if (date.toDateString() === yesterday.toDateString()) {
        category = 'Yesterday'
      } else if (date >= sevenDaysAgo) {
        category = 'Previous 7 Days'
      }

      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(chat)
      return acc
    }, {} as Record<string, typeof chats>)
  }

  const handleNewChat = () => {
    setCurrentChatId(null)
    router.push('/platform')
  }

  const handleDeleteClick = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation()
    setChatToDelete(chatId)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (chatToDelete) {
      deleteChat(chatToDelete)
      setDeleteDialogOpen(false)
      setChatToDelete(null)
      if (chatToDelete === currentChatId) {
        router.push('/platform')
      }
    }
  }

  const categorizedChats = categorizeChats()

  return (
    <>
      <div 
        className={`fixed top-0 left-0 h-screen bg-[#1a0d26]/80 backdrop-blur-xl border-r border-pink-400/20 transition-all duration-300 ease-in-out z-50 ${
          isExpanded ? 'w-64' : 'w-0 md:w-[60px]'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-[60px] flex items-center justify-between px-2">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-pink-400/10 rounded-lg transition-all duration-300 cursor-pointer"
            title="Toggle Sidebar"
          >
              <Menu className={`w-5 h-5 text-pink-300 transition-transform duration-300 ${isExpanded ? '' : 'rotate-180'}`} />
          </button>
          
          {isExpanded && (
            <div className="flex items-center gap-2">
              <button 
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    isSearchMode 
                      ? 'bg-pink-400/20 text-pink-400 hover:bg-pink-400/30' 
                      : 'hover:bg-pink-400/10 text-pink-300'
                  }`}
                title="Search Chats"
                  onClick={() => {
                    setIsSearchMode(!isSearchMode)
                    setSearchQuery('')
                    setSearchResults([])
                  }}
              >
                  {isSearchMode ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>
              <button 
                  className="p-2 hover:bg-pink-400/10 rounded-lg transition-colors cursor-pointer" 
                title="New Chat"
                onClick={handleNewChat}
              >
                  <PenSquare className="w-5 h-5 text-pink-300" />
              </button>
            </div>
          )}
        </div>

          {/* Search input when in search mode */}
          {isExpanded && isSearchMode && (
            <div className="p-2 border-b border-pink-400/20">
              <div className="bg-white/5 rounded-xl px-4 py-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search through all chats..."
                  className="w-full bg-transparent text-white/80 placeholder-white/50 outline-none text-sm"
                  autoFocus
                />
              </div>
              <SearchResults 
                results={searchResults}
                isVisible={true}
                onResultClick={handleSearchResultClick}
              />
            </div>
          )}

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-pink-400/20 scrollbar-track-transparent hover:scrollbar-thumb-pink-400/30">
            {isExpanded ? (
              Object.entries(categorizedChats).map(([category, categoryChats]) => (
                categoryChats.length > 0 && (
                  <div key={category} className="mb-4">
                    <h3 className="text-xs text-pink-300/50 px-4 mb-2">{category}</h3>
                    <div className="space-y-1">
                      {categoryChats.map((chat) => (
                      <div
                        key={chat.id}
                          className="relative group px-2"
                        onMouseEnter={() => setHoveredChatId(chat.id)}
                        onMouseLeave={() => setHoveredChatId(null)}
                      >
                        <button
                            onClick={() => {
                              setCurrentChatId(chat.id)
                              router.push(`/platform/chat/${chat.id}`)
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-all truncate cursor-pointer group-hover:pr-10
                              ${currentChatId === chat.id 
                                ? 'bg-pink-400/20 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]' 
                                : 'text-pink-300/70 hover:bg-pink-400/10'
                              }
                            `}
                        >
                            <div className="truncate">
                              {chat.title || 'New Chat'}
                            </div>
                        </button>
                          {hoveredChatId === chat.id && (
                            <button
                              onClick={(e) => handleDeleteClick(e, chat.id)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-pink-300/50 hover:text-pink-400 transition-colors cursor-pointer"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                      </div>
                    ))}
                    </div>
                  </div>
                )
              ))
          ) : (
              <div className="px-2 space-y-1">
                {chats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => {
                      setCurrentChatId(chat.id)
                      router.push(`/platform/chat/${chat.id}`)
                    }}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all cursor-pointer
                      ${currentChatId === chat.id 
                        ? 'bg-pink-400/20 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]' 
                        : 'text-pink-300/70 hover:bg-pink-400/10'
                      }
                    `}
                  >
                    <MessageSquare size={20} />
                  </button>
                ))}
              </div>
          )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {deleteDialogOpen && (
          <DeleteConfirmationDialog
            isOpen={deleteDialogOpen}
            onClose={() => {
              setDeleteDialogOpen(false)
              setChatToDelete(null)
            }}
            onConfirm={handleConfirmDelete}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatHistory 