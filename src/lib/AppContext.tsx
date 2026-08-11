import { createContext, ReactNode, useContext, useState } from 'react'
import type { Role } from '@/types'

interface Church {
  id: string
  name: string
  city: string
}

interface AppState {
  church: Church | null
  setChurch: (c: Church) => void
  role: Role
  setRole: (r: Role) => void
}

const AppCtx = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [church, setChurch] = useState<Church | null>(null)
  const [role, setRole] = useState<Role>('Pastor Principal')
  return <AppCtx.Provider value={{ church, setChurch, role, setRole }}>{children}</AppCtx.Provider>
}

export function useApp() {
  const ctx = useContext(AppCtx)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
