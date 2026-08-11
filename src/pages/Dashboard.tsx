import { Users, Share2, TrendingUp, TrendingDown, Landmark, UsersRound, UserPlus, Download } from 'lucide-react'
import { Layout } from '@/components/layout/Layout'
import { MetricCard } from '@/components/ui/Misc'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import { Table, Thead, Tr, Th, Td } from '@/components/ui/Table'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip,
  BarChart, Bar,
} from 'recharts'
import { formatCurrency } from '@/lib/format'
import { semesterFlow } from '@/data/finance'
import { congregations } from '@/data/congregations'
import { useNavigate } from 'react-router-dom'

const memberGrowth = [
  { month: 'Jan', novos: 18 },
  { month: 'Fev', novos: 22 },
  { month: 'Mar', novos: 35 },
  { month: 'Abr', novos: 20 },
  { month: 'Mai', novos: 31 },
  { month: 'Jun', novos: 40 },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <Layout
      crumbs={[{ label: 'Igreja Sede' }, { label: 'Dashboard' }]}
      title="Painel Geral"
      searchPlaceholder="Buscar congregação..."
      action={{ label: 'Novo Membro', icon: <UserPlus className="h-4 w-4" />, onClick: () => navigate('/membros/novo') }}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <MetricCard label="Total de Membros" value="1.247" icon={<Users className="h-4 w-4" />} trend="+12% este mês" />
        <MetricCard label="Congregações" value="8" icon={<Share2 className="h-4 w-4" />} trend="+2 este mês" />
        <MetricCard label="Receitas do Mês" value="R$ 45.890" icon={<TrendingUp className="h-4 w-4" />} trend="+8.4% este mês" />
        <MetricCard label="Despesas do Mês" value="R$ 23.456" icon={<TrendingDown className="h-4 w-4" />} trend="+1.2% este mês" trendUp={false} />
        <MetricCard label="Patrimônio Total" value="R$ 892.340" icon={<Landmark className="h-4 w-4" />} trend="+0.4% este mês" />
        <MetricCard label="Usuários Ativos" value="34" icon={<UsersRound className="h-4 w-4" />} trend="+5% este mês" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Receitas vs Despesas</CardTitle>
            <div className="flex items-center gap-4 text-xs text-brand-300">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-brand-800" /> Receitas</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-brand-300" /> Despesas</span>
            </div>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={semesterFlow} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#DCE7F1" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#667789' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#667789' }} axisLine={false} tickLine={false} />
                <RTooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ borderRadius: 10, border: '1px solid #DCE7F1', fontSize: 13 }} />
                <Line type="monotone" dataKey="receitas" stroke="#203B59" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="despesas" stroke="#4B739B" strokeWidth={2} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Crescimento de Membros</CardTitle>
            <span className="text-xs text-brand-300">Novos membros / mês</span>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={memberGrowth} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#DCE7F1" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#667789' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#667789' }} axisLine={false} tickLine={false} />
                <RTooltip contentStyle={{ borderRadius: 10, border: '1px solid #DCE7F1', fontSize: 13 }} />
                <Bar dataKey="novos" radius={[6, 6, 0, 0]} fill="#4B739B" />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Dados por Congregação</CardTitle>
          <button className="text-sm font-semibold text-brand-700 hover:underline flex items-center gap-1.5">
            <Download className="h-3.5 w-3.5" /> Exportar CSV
          </button>
        </CardHeader>
        <CardBody className="pt-3">
          <Table>
            <Thead>
              <tr>
                <Th>Congregação</Th>
                <Th>Membros</Th>
                <Th>Receitas</Th>
                <Th>Despesas</Th>
                <Th className="text-right">Saldo</Th>
              </tr>
            </Thead>
            <tbody>
              {congregations.map((c) => (
                <Tr key={c.id}>
                  <Td className="font-semibold">{c.name}</Td>
                  <Td>{c.members}</Td>
                  <Td className="text-green-600 font-medium">{formatCurrency(c.income)}</Td>
                  <Td className="text-red-500 font-medium">{formatCurrency(c.expense)}</Td>
                  <Td className={`text-right font-bold ${c.income - c.expense < 0 ? 'text-red-500' : 'text-brand-900'}`}>
                    {formatCurrency(c.income - c.expense)}
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Layout>
  )
}
