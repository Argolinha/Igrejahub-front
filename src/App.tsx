import { Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider } from '@/lib/AppContext'
import { ToastProvider } from '@/components/ui/Extras'

import Login from '@/pages/Login'
import ChurchSelection from '@/pages/ChurchSelection'
import Dashboard from '@/pages/Dashboard'
import Members from '@/pages/Members'
import MemberForm from '@/pages/MemberForm'
import MemberProfile from '@/pages/MemberProfile'
import Congregations from '@/pages/Congregations'
import CongregationDetail from '@/pages/CongregationDetail'
import Finance from '@/pages/Finance'
import Assets from '@/pages/Assets'
import AssetForm from '@/pages/AssetForm'
import Accounting from '@/pages/Accounting'
import Reports from '@/pages/Reports'
import UsersPage from '@/pages/UsersPage'
import Settings from '@/pages/Settings'
import Subscription from '@/pages/Subscription'

export default function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/selecionar-igreja" element={<ChurchSelection />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/membros" element={<Members />} />
          <Route path="/membros/novo" element={<MemberForm />} />
          <Route path="/membros/:id" element={<MemberProfile />} />
          <Route path="/membros/:id/editar" element={<MemberForm />} />
          <Route path="/congregacoes" element={<Congregations />} />
          <Route path="/congregacoes/:id" element={<CongregationDetail />} />
          <Route path="/financeiro" element={<Finance />} />
          <Route path="/patrimonio" element={<Assets />} />
          <Route path="/patrimonio/novo" element={<AssetForm />} />
          <Route path="/contabilidade" element={<Accounting />} />
          <Route path="/relatorios" element={<Reports />} />
          <Route path="/usuarios" element={<UsersPage />} />
          <Route path="/configuracoes" element={<Settings />} />
          <Route path="/configuracoes/assinatura" element={<Subscription />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </ToastProvider>
    </AppProvider>
  )
}
