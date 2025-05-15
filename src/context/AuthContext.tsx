'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: {
    address: string | null
    balance: number | null
  } | null
  login: () => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  login: async () => {},
  logout: () => {}
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<{ address: string | null; balance: number | null }>({
    address: '7YCnhkGpNBjV8pXAWxcXH8cuh4qNQDRhRFHBZYzRUMuy',
    balance: null
  })
  const router = useRouter()

  useEffect(() => {
    // Check if user was previously authenticated
    const checkAuth = async () => {
      try {
        const savedAddress = localStorage.getItem('userAddress')
        if (savedAddress) {
          setUser({
            address: savedAddress,
            balance: null // You can fetch the balance here if needed
          })
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async () => {
    try {
      setIsLoading(true)
      // Here you would typically connect to a wallet
      // For now, we'll just simulate it
      const mockAddress = '7YCnhkGpNBjV8pXAWxcXH8cuh4qNQDRhRFHBZYzRUMuy'
      
      setUser({
        address: mockAddress,
        balance: null
      })
      setIsAuthenticated(true)
      localStorage.setItem('userAddress', mockAddress)
      
      // Redirect to platform after login
      router.push('/platform')
    } catch (error) {
      console.error('Error logging in:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser({
      address: null,
      balance: null
    })
    setIsAuthenticated(false)
    localStorage.removeItem('userAddress')
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isLoading,
      user,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext 