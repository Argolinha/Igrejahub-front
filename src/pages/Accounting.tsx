import { useState } from 'react'
import { Plus, Landmark, TrendingDown, Package, TrendingUp, ChevronDown, ChevronRight, Download } from 'lucide-react'
import { Layout } from '@/components/layout/Layout'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import { MetricCard } from '@/components/ui/Misc'
import { Tabs } from '@/components/ui/Tabs'
import { Table, Thead, Tr, Th, Td } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { chartOfAccounts } from '@/data/misc'
import { formatCurrency } from '@/lib/format'

export default function Accounting() {
  const [tab, setTab] = useState('Plano de Contas')
  const [collapsedRows, setCollapsedRows] = useState<string[]>([])

  return (
    <Layout
      crumbs={[{ label: 'Igreja Sede' }, { label: 'Contabilidade' }]}
      title="Contabilidade Geral"
      searchPlaceholder="Pesquisar contas..."
      action={{ label: 'Novo Lançamento', icon: <Plus className="h-4 w-4" /> }}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard label="Total Ativo" value="R$ 1.245.890,00" icon={<Landmark className="h-4 w-4" />} />
        <MetricCard label="Total Passivo" value="R$ 353.550,00" icon={<TrendingDown className="h-4 w-4" />} />
        <MetricCard label="Patrimônio Líquido" value="R$ 892.340,00" icon={<Package className="h-4 w-4" />} />
        <MetricCard label="Resultado do Exercício" value="R$ 156.780,00" icon={<TrendingUp className="h-4 w-4" />} trend="+18% este mês" />
      </div>

      <Tabs tabs={['Plano de Contas', 'Lançamentos', 'Balancete', 'DRE']} active={tab} onChange={setTab} className="mb-6" />

      {tab === 'Plano de Contas' && (
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Plano de Contas Estruturado</CardTitle>
            <button className="text-sm font-semibold text-brand-700 hover:underline flex items-center gap-1.5">
              <Download className="h-3.5 w-3.5" /> Exportar Plano (PDF)
            </button>
          </CardHeader>
          <CardBody className="pt-2">
            <Table>
              <Thead><tr><Th>Código</Th><Th>Nome da Conta</Th><Th>Tipo</Th><Th className="text-right">Saldo Atual</Th></tr></Thead>
              <tbody>
                {chartOfAccounts.map((acc) => (
                  <Tr key={acc.code}>
                    <Td className={acc.level === 0 ? 'font-bold' : 'text-brand-500'}>{acc.code}</Td>
                    <Td style={{ paddingLeft: `${16 + acc.level * 20}px` }} className={acc.level === 0 ? 'font-bold flex items-center gap-1.5' : 'text-brand-700'}>
                      {acc.type === 'Sintética' && (
                        <button onClick={() => setCollapsedRows((r) => r.includes(acc.code) ? r.filter((x) => x !== acc.code) : [...r, acc.code])} className="text-brand-300">
                          {collapsedRows.includes(acc.code) ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                        </button>
                      )}
                      {acc.name}
                    </Td>
                    <Td><Badge tone={acc.type === 'Sintética' ? 'blue' : 'gray'}>{acc.type}</Badge></Td>
                    <Td className="text-right font-bold">{formatCurrency(acc.balance)}</Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      )}

      {tab === 'Lançamentos' && (
        <Card><CardBody className="pt-8 pb-10 text-center">
          <p className="text-sm text-brand-300">Os lançamentos contábeis detalhados aparecem sincronizados a partir das transações financeiras.</p>
        </CardBody></Card>
      )}
      {tab === 'Balancete' && (
        <Card><CardBody className="pt-8 pb-10 text-center">
          <p className="text-sm text-brand-300">Balancete mensal consolidado disponível para exportação em PDF.</p>
        </CardBody></Card>
      )}
      {tab === 'DRE' && (
        <Card><CardBody className="pt-8 pb-10 text-center">
          <p className="text-sm text-brand-300">Demonstrativo de Resultado do Exercício referente ao período selecionado.</p>
        </CardBody></Card>
      )}
    </Layout>
  )
}
