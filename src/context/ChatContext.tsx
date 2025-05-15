'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { generateChatTitle } from '../services/openai'

interface Chat {
  id: string
  title: string
  timestamp: Date
  messages: Array<{
    role: 'user' | 'assistant'
    content: string
  }>
}

interface ChatContextType {
  chats: Chat[]
  currentChatId: string | null
  addChat: (message: string) => Promise<string>
  addMessage: (chatId: string, message: string, role: 'user' | 'assistant') => void
  setCurrentChatId: (id: string | null) => void
  updateChatTitle: (chatId: string, message: string) => void
  deleteChat: (chatId: string) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

// Helper function to load chats from localStorage
const loadChatsFromStorage = (): Chat[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const savedChats = localStorage.getItem('chats')
    if (!savedChats) return []

    return JSON.parse(savedChats).map((chat: any) => ({
      ...chat,
      timestamp: new Date(chat.timestamp)
    }))
  } catch (error) {
    console.error('Error loading chats from localStorage:', error)
    return []
  }
}

// Helper function to save chats to localStorage
const saveChatsToStorage = (chats: Chat[]) => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem('chats', JSON.stringify(chats))
  } catch (error) {
    console.error('Error saving chats to localStorage:', error)
  }
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  // Initialize state with data from localStorage
  const [chats, setChats] = useState<Chat[]>(() => loadChatsFromStorage())
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Save chats to localStorage whenever they change
  useEffect(() => {
    saveChatsToStorage(chats)
  }, [chats])

  // Load chats from localStorage when the component mounts
  useEffect(() => {
    const savedChats = loadChatsFromStorage()
    if (savedChats.length > 0) {
      setChats(savedChats)
    }
  }, [])

  const addChat = async (message: string) => {
    // Generate title first
    const title = await generateChatTitle(message)
    const newChat: Chat = {
      id: Date.now().toString(),
      title,
      timestamp: new Date(),
      messages: []  // Start with empty messages
    }
    setChats(prev => {
      const updatedChats = [newChat, ...prev]
      saveChatsToStorage(updatedChats)
      return updatedChats
    })
    setCurrentChatId(newChat.id)
    return newChat.id
  }

  const addMessage = (chatId: string, message: string, role: 'user' | 'assistant') => {
    setChats(prev => {
      const existingChat = prev.find(c => c.id === chatId)
      if (!existingChat) {
        console.error('Attempted to add message to non-existent chat:', chatId)
        return prev
      }

      const updatedChats = prev.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [...chat.messages, { role, content: message }]
          }
        }
        return chat
      })
      saveChatsToStorage(updatedChats)
      return updatedChats
    })
  }

  const updateChatTitle = async (chatId: string, message: string) => {
    try {
      const newTitle = await generateChatTitle(message)
      setChats(prev => {
        const updatedChats = prev.map(chat => 
          chat.id === chatId ? { ...chat, title: newTitle } : chat
        )
        saveChatsToStorage(updatedChats)
        return updatedChats
      })
    } catch (error) {
      console.error('Error updating chat title:', error)
    }
  }

  const deleteChat = (chatId: string) => {
    setChats(prev => {
      const updatedChats = prev.filter(chat => chat.id !== chatId)
      saveChatsToStorage(updatedChats)
      if (currentChatId === chatId) {
        setCurrentChatId(null)
      }
      return updatedChats
    })
  }

  return (
    <ChatContext.Provider value={{
      chats,
      currentChatId,
      addChat,
      addMessage,
      setCurrentChatId,
      updateChatTitle,
      deleteChat,
      isLoading,
      setIsLoading
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
} 