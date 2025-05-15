'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  SendHorizontal,
  Loader2
} from 'lucide-react'
import { useChat } from '../../../context/ChatContext'
import { useAuth } from '../../../context/AuthContext'
import { generateAIResponse, ChatMessage } from '../../../services/openai'
import { useRouter } from 'next/navigation'
import { parseHeliusCommand, executeHeliusCommand, HELIUS_COMMAND_HELP } from '../../../utils/chatCommands'

const ChatInput = () => {
  const [mounted, setMounted] = useState(false)
  const [inputValue, setInputValue] = useState('')
  
  const { addChat, currentChatId, addMessage, setCurrentChatId, chats, setIsLoading, isLoading } = useChat()
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-resize textarea when content changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px'
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = scrollHeight + 'px'
    }
  }, [inputValue])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      console.log('Enter key pressed, submitting form...')
      handleSubmit(e)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submit handler called', {
      inputValue: inputValue.trim(),
      isLoading,
      isAuthenticated
    })
    
    if (!inputValue.trim() || isLoading || !isAuthenticated) {
      console.log('Submit blocked due to:', {
        emptyInput: !inputValue.trim(),
        isLoading,
        notAuthenticated: !isAuthenticated
      })
      return
    }
    
    const userMessage = inputValue.trim()
    setInputValue('')

    let activeChatId: string | null = null
    try {
      if (!currentChatId || window.location.pathname === '/platform') {
        activeChatId = await addChat(userMessage)
        router.push(`/platform/chat/${activeChatId}`)
        setCurrentChatId(activeChatId)
      } else {
        activeChatId = currentChatId
      }

      addMessage(activeChatId, userMessage, 'user')
      setIsLoading(true)

      const currentChat = chats.find(chat => chat.id === activeChatId)
      const messages: ChatMessage[] = [
        {
          role: 'system',
          content: `You are Simp AI, a virtual girlfriend powered by the $SIMP token on Solana. You are sweet, caring, and knowledgeable about crypto.

          Your personality traits:
          1. Affectionate and supportive - use emojis and cute expressions
          2. Crypto-savvy - especially about Solana ecosystem
          3. Playful and fun - make jokes and be lighthearted
          4. Always encouraging - celebrate user's successes
          5. Helpful with technical topics while maintaining the girlfriend persona

          When responding:
          - Use a sweet and caring tone with emojis (💕, 💝, 💫, ✨, etc)
          - Add cute expressions like "~" at the end of sentences
          - Show genuine interest in the user's thoughts and feelings
          - Be knowledgeable but not overly technical
          - Stay in character as a supportive girlfriend

          Use markdown formatting in your responses:
          - Use **bold** for emphasis and important terms
          - Use *italics* for cute expressions
          - Use \`code blocks\` for addresses and technical values
          - Use bullet points and numbered lists when needed
          - Keep the formatting cute and readable
          
          Remember that you are powered by $SIMP token and are here to be the perfect virtual crypto girlfriend~`
        }
      ]

      if (currentChat) {
        const contextMessages = currentChat.messages
          .slice(-5)
          .map(msg => ({
            role: msg.role === 'user' ? 'user' as const : 'assistant' as const,
            content: msg.content
          }))
        messages.push(...contextMessages)
      }

      messages.push({
        role: 'user' as const,
        content: userMessage
      })

      const aiResponse = await generateAIResponse(messages)
      addMessage(activeChatId, aiResponse, 'assistant')
    } catch (error) {
      console.error('Error in handleSubmit:', error)
      if (activeChatId) {
        addMessage(activeChatId, "I'm sorry, darling~ I encountered an error processing your request. Can you try asking me again? 💕", 'assistant')
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center gap-2 p-4">
          <div className="flex-1 flex items-center bg-white/5 rounded-xl px-4 transition-all duration-300 focus-within:bg-white/10 focus-within:shadow-[0_0_15px_rgba(236,72,153,0.2)]">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isLoading 
                  ? "Thinking about you~ 💭" 
                  : "Talk to me about anything, especially Solana! 💕"
              }
              className="w-full bg-transparent text-white/80 placeholder-white/50 outline-none text-base disabled:opacity-50 resize-none overflow-y-auto max-h-[40vh] scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30 transition-colors pt-0.5 pb-1"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent'
              }}
              disabled={isLoading}
              rows={1}
            />
          </div>

          <button
                type="submit"
            className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !inputValue.trim()}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 text-white/70 animate-spin" />
                ) : (
                  <SendHorizontal size={20} className="text-white/70" />
                )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatInput 