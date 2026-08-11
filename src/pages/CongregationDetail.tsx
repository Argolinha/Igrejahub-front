import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { MapPin, Users, Wallet, Landmark } from 'lucide-react'
import { Layout } from '@/components/layout/Layout'
import { Card, CardBody } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Tabs } from '@/components/ui/Tabs'
import { MetricCard } from '@/components/ui/Misc'
import { congregations, congregationDetail } from '@/data/congregations'
import { formatCurrency } from '@/lib/format'
import { EmptyState } from '@/components/ui/Misc'

export default function CongregationDetail() {
  const { id } = useParams()
  const [tab, setTab] = useState('Visão Geral')
  const c = congregations.find((x) => x.id === id)

  if (!c) {
    return (
      <Layout crumbs={[{ label: 'Congregações', to: '/congregacoes' }]} title="Não encontrado">
        <EmptyState title="Congregação não encontrada" />
      </Layout>
    )
  }

  return (
    <Layout crumbs={[{ label: 'Igreja Sede' }, { label: 'Congregações', to: '/congregacoes' }, { label: c.name }]} title={c.name}>
      <div className="rounded-2xl overflow-hidden h-48 mb-6 relative">
        <img src={c.image} alt={c.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/70 via-brand-900/10 to-transparent" />
        <div className="absolute bottom-4 left-5 text-white">
          <h2 className="text-xl font-extrabold">{c.name}</h2>
          <p className="text-sm text-white/80 flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {c.city}, {c.state}</p>
        </div>
        <Badge tone="navy" className="absolute top-4 right-4">{c.tag}</Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <MetricCard label="Membros" value={c.members.toLocaleString('pt-BR')} icon={<Users className="h-4 w-4" />} />
        <MetricCard label="Congregações" value={String(c.subCongregations ?? 0)} icon={<Landmark className="h-4 w-4" />} />
        <MetricCard label="Receitas do Mês" value={formatCurrency(c.income)} icon={<Wallet className="h-4 w-4" />} trend="+6% este mês" />
        <MetricCard label="Despesas do Mês" value={formatCurrency(c.expense)} icon={<Wallet className="h-4 w-4" />} trend="-2% este mês" trendUp={false} />
      </div>

      <Tabs tabs={['Visão Geral', 'Cultos & Horários', 'Liderança']} active={tab} onChange={setTab} className="mb-6" />

      {tab === 'Visão Geral' && (
        <Card><CardBody className="pt-6">
          <h3 className="font-bold text-brand-900 mb-2">Sobre a Congregação</h3>
          <p className="text-sm text-brand-500 leading-relaxed">{congregationDetail.history}</p>
        </CardBody></Card>
      )}

      {tab === 'Cultos & Horários' && (
        <Card><CardBody className="pt-6">
          <h3 className="font-bold text-brand-900 mb-4">Programação Semanal</h3>
          <div className="divide-y divide-brand-100">
            {congregationDetail.services.map((s, i) => (
              <div key={i} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-semibold text-brand-900">{s.name}</p>
                  <p className="text-xs text-brand-300">{s.day}</p>
                </div>
                <Badge tone="blue">{s.time}</Badge>
              </div>
            ))}
          </div>
        </CardBody></Card>
      )}

      {tab === 'Liderança' && (
        <div className="grid sm:grid-cols-3 gap-5">
          {congregationDetail.leaders.map((l, i) => (
            <Card key={i}><CardBody className="pt-6 flex flex-col items-center text-center">
              <img src={l.avatar} className="h-16 w-16 rounded-full object-cover mb-3" alt="" />
              <p className="font-bold text-brand-900 text-sm">{l.name}</p>
              <p className="text-xs text-brand-300">{l.role}</p>
            </CardBody></Card>
          ))}
        </div>
      )}
    </Layout>
  )
}
