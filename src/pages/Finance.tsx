import { useMemo, useState } from 'react'
import { Plus, TrendingUp, TrendingDown, Wallet, PiggyBank } from 'lucide-react'
import { Layout } from '@/components/layout/Layout'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import { MetricCard } from '@/components/ui/Misc'
import { Tabs } from '@/components/ui/Tabs'
import { Table, Thead, Tr, Th, Td } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Input'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip,
  PieChart, Pie, Cell,
} from 'recharts'
import { transactions, revenueDistribution, semesterFlow } from '@/data/finance'
import { formatCurrency } from '@/lib/format'
import { useToast } from '@/components/ui/Extras'

export default function Finance() {
  const [tab, setTab] = useState('Visão Geral')
  const [open, setOpen] = useState(false)
  const toast = useToast()

  const filteredTx = useMemo(() => {
    if (tab === 'Receitas') return transactions.filter((t) => t.type === 'receita')
    if (tab === 'Despesas') return transactions.filter((t) => t.type === 'despesa')
    return transactions
  }, [tab])

  return (
    <Layout
      crumbs={[{ label: 'Igreja Sede' }, { label: 'Financeiro' }]}
      title="Painel Financeiro"
      searchPlaceholder="Buscar transações..."
      action={{ label: 'Nova Transação', icon: <Plus className="h-4 w-4" />, onClick: () => setOpen(true) }}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard label="Receitas do Mês" value="R$ 45.890,00" icon={<TrendingUp className="h-4 w-4" />} trend="+12% este mês" />
        <MetricCard label="Despesas do Mês" value="R$ 23.456,00" icon={<TrendingDown className="h-4 w-4" />} trend="-5% este mês" trendUp={false} />
        <MetricCard label="Saldo do Mês" value="R$ 22.434,00" icon={<Wallet className="h-4 w-4" />} trend="+8% este mês" />
        <MetricCard label="Receitas Acumuladas" value="R$ 312.670,00" icon={<PiggyBank className="h-4 w-4" />} trend="+15% este mês" />
      </div>

      <Tabs tabs={['Visão Geral', 'Receitas', 'Despesas', 'Transferências']} active={tab} onChange={setTab} className="mb-6" />

      {tab !== 'Transferências' && (
        <>
          {tab === 'Visão Geral' && (
            <div className="grid lg:grid-cols-3 gap-6 mb-6">
              <Card className="lg:col-span-2">
                <CardHeader><CardTitle>Evolução Semestral</CardTitle></CardHeader>
                <CardBody>
                  <ResponsiveContainer width="100%" height={240}>
                    <LineChart data={semesterFlow} margin={{ left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#DCE7F1" />
                      <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#667789' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 12, fill: '#667789' }} axisLine={false} tickLine={false} />
                      <RTooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ borderRadius: 10, border: '1px solid #DCE7F1', fontSize: 13 }} />
                      <Line type="monotone" dataKey="receitas" stroke="#203B59" strokeWidth={2.5} dot={false} />
                      <Line type="monotone" dataKey="despesas" stroke="#4B739B" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardBody>
              </Card>
              <Card>
                <CardHeader><CardTitle>Distribuição de Receitas</CardTitle></CardHeader>
                <CardBody className="flex flex-col items-center">
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie data={revenueDistribution} dataKey="value" innerRadius={50} outerRadius={75} paddingAngle={2}>
                        {revenueDistribution.map((d, i) => <Cell key={i} fill={d.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="w-full space-y-1.5 mt-2">
                    {revenueDistribution.map((d) => (
                      <div key={d.name} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-brand-500"><span className="h-2 w-2 rounded-full" style={{ background: d.color }} />{d.name}</span>
                        <span className="font-semibold text-brand-900">{d.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          )}

          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>{tab === 'Visão Geral' ? 'Últimas Transações' : tab}</CardTitle>
              {tab === 'Visão Geral' && <button className="text-sm font-semibold text-brand-700 hover:underline">Ver todas as transações</button>}
            </CardHeader>
            <CardBody className="pt-2">
              <Table>
                <Thead>
                  <tr>
                    <Th>Data</Th><Th>Descrição</Th><Th>Categoria</Th><Th>Congregação</Th><Th>Valor</Th><Th>Status</Th>
                  </tr>
                </Thead>
                <tbody>
                  {filteredTx.map((t) => (
                    <Tr key={t.id}>
                      <Td className="text-brand-500">{t.date}</Td>
                      <Td className="font-semibold">{t.description}</Td>
                      <Td><Badge tone={t.type === 'receita' ? 'green' : 'red'}>{t.category}</Badge></Td>
                      <Td className="text-brand-500">{t.congregation}</Td>
                      <Td className={`font-semibold ${t.amount < 0 ? 'text-red-500' : 'text-green-600'}`}>{formatCurrency(t.amount)}</Td>
                      <Td><Badge tone={t.status === 'Confirmado' ? 'green' : 'yellow'}>{t.status}</Badge></Td>
                    </Tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </>
      )}

      {tab === 'Transferências' && (
        <Card><CardBody className="pt-8 pb-10 text-center">
          <p className="text-sm text-brand-300">Nenhuma transferência registrada entre congregações neste período.</p>
        </CardBody></Card>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Nova Transação"
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={() => { setOpen(false); toast('Transação registrada com sucesso.') }}>Salvar Transação</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Select label="Tipo">
            <option>Receita</option>
            <option>Despesa</option>
          </Select>
          <Input label="Descrição" placeholder="Ex: Dízimo Culto de Domingo" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Valor (R$)" type="number" placeholder="0,00" />
            <Input label="Data" type="date" />
          </div>
          <Select label="Categoria">
            <option>Dízimo</option>
            <option>Oferta</option>
            <option>Campanha</option>
            <option>Manutenção</option>
            <option>Utilidades</option>
            <option>Equipamentos</option>
          </Select>
        </div>
      </Modal>
    </Layout>
  )
}
