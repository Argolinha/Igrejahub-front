import { Users, Wallet, Share2, Package, Landmark, Activity, Download } from 'lucide-react'
import { Layout } from '@/components/layout/Layout'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import { Table, Thead, Tr, Th, Td } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { reportCards, generatedReports } from '@/data/misc'
import { useToast } from '@/components/ui/Extras'

const icons: Record<string, any> = {
  'Relatório de Membros': Users,
  'Relatório Financeiro': Wallet,
  'Relatório de Congregações': Share2,
  'Relatório de Patrimônio': Package,
  'Relatório Contábil': Landmark,
  'Relatório de Atividades': Activity,
}

const typeTone: Record<string, 'blue' | 'green' | 'yellow' | 'purple'> = {
  Financeiro: 'green', Membros: 'blue', Contábil: 'yellow', Patrimônio: 'purple',
}

export default function Reports() {
  const toast = useToast()

  return (
    <Layout crumbs={[{ label: 'Igreja Sede' }, { label: 'Relatórios' }]} title="Painel de Relatórios" searchPlaceholder="Filtrar relatórios...">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        {reportCards.map((r) => {
          const Icon = icons[r.title] ?? Activity
          return (
            <Card key={r.title} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${r.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-bold text-brand-300 uppercase tracking-wide">{r.category}</span>
              </div>
              <h3 className="font-bold text-brand-900 mb-1.5">{r.title}</h3>
              <p className="text-sm text-brand-300 mb-4 leading-relaxed">{r.description}</p>
              <Button className="w-full" onClick={() => toast(`${r.title} está sendo gerado.`)}>Gerar Relatório</Button>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Relatórios Gerados Recentemente</CardTitle>
          <button className="text-sm font-semibold text-brand-700 hover:underline">Ver Histórico Completo</button>
        </CardHeader>
        <CardBody className="pt-2">
          <Table>
            <Thead><tr><Th>Nome do Arquivo</Th><Th>Tipo de Relatório</Th><Th>Gerado em</Th><Th>Gerado por</Th><Th className="text-right">Download</Th></tr></Thead>
            <tbody>
              {generatedReports.map((r, i) => (
                <Tr key={i}>
                  <Td className="font-semibold">{r.file}</Td>
                  <Td><Badge tone={typeTone[r.type] ?? 'gray'}>{r.type}</Badge></Td>
                  <Td className="text-brand-500">{r.date}</Td>
                  <Td className="text-brand-500">{r.by}</Td>
                  <Td className="text-right">
                    <button onClick={() => toast(`Baixando ${r.file}`)} className="text-brand-500 hover:text-brand-800 inline-flex"><Download className="h-4 w-4" /></button>
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
