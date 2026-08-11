import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Mail, Phone, MapPin, Save } from 'lucide-react'
import { Layout } from '@/components/layout/Layout'
import { Card, CardBody } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Tabs } from '@/components/ui/Tabs'
import { members } from '@/data/members'
import { useToast } from '@/components/ui/Extras'
import { EmptyState } from '@/components/ui/Misc'

const history = [
  { title: 'Transferência de Congregação', date: '15 Jan 2026', desc: 'Transferido da Sede Norte para a Congregação Central.', dot: 'bg-brand-300' },
  { title: 'Batismo nas Águas realizado', date: '10 Out 2024', desc: 'Batizado oficialmente na fé pelo Pr. Carlos Eduardo.', dot: 'bg-green-500' },
  { title: 'Cadastro Inicial de Membro', date: '22 Set 2024', desc: 'Perfil de membro criado no IgrejaHub.', dot: 'bg-brand-300' },
]

const contributions = [
  { date: '15/Mai/2026', type: 'Dízimo', amount: 'R$ 450,00' },
  { date: '01/Mai/2026', type: 'Oferta', amount: 'R$ 100,00' },
  { date: '15/Abr/2026', type: 'Dízimo', amount: 'R$ 420,00' },
]

export default function MemberProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const [tab, setTab] = useState('Informações Pessoais')
  const member = members.find((m) => m.id === id)

  if (!member) {
    return (
      <Layout crumbs={[{ label: 'Igreja Sede' }, { label: 'Membros', to: '/membros' }]} title="Membro não encontrado">
        <EmptyState title="Membro não encontrado" description="O perfil solicitado não existe ou foi removido." />
      </Layout>
    )
  }

  return (
    <Layout
      crumbs={[{ label: 'Igreja Sede' }, { label: 'Membros', to: '/membros' }, { label: member.name }]}
      title="Perfil do Membro"
      action={{ label: 'Salvar Alterações', icon: <Save className="h-4 w-4" />, onClick: () => toast('Alterações salvas com sucesso.') }}
    >
      <div className="h-2 rounded-t-2xl bg-brand-800 -mb-2" />
      <Card className="rounded-t-none">
        <CardBody className="pt-6 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
          <img src={member.avatar} className="h-20 w-20 rounded-full object-cover shrink-0" alt="" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-xl font-extrabold text-brand-900">{member.name}</h2>
              <Badge tone={member.status === 'Ativo' ? 'green' : member.status === 'Visitante' ? 'blue' : 'gray'}>{member.status}</Badge>
            </div>
            <p className="text-sm text-brand-300 flex items-center gap-1.5 mt-1">
              {member.role} <span className="text-brand-100">•</span> {member.congregation}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-1.5 mt-3 text-sm text-brand-500">
              <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {member.email}</span>
              <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {member.phone}</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {member.address}</span>
            </div>
          </div>
          <div className="flex gap-2.5 shrink-0">
            <Button variant="outline" onClick={() => navigate(`/membros/${member.id}/editar`)}>Editar Perfil</Button>
            <Button variant="danger" onClick={() => toast(`${member.name} foi desativado.`)}>Desativar Membro</Button>
          </div>
        </CardBody>
      </Card>

      <div className="mt-6">
        <Tabs tabs={['Informações Pessoais', 'Histórico', 'Contribuições', 'Documentos']} active={tab} onChange={setTab} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          {tab === 'Informações Pessoais' && (
            <Card>
              <CardBody className="pt-6">
                <h3 className="font-bold text-brand-900 mb-5">Dados Cadastrais</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <ReadField label="Data de Nascimento" value={member.birthDate} />
                  <ReadField label="Sexo" value={member.gender} />
                  <ReadField label="Estado Civil" value={member.maritalStatus} />
                  <ReadField label="Profissão" value={member.profession} />
                  <ReadField label="Data de Batismo" value={member.baptismDate} />
                  <ReadField label="Data de Entrada de Membro" value={member.memberSince} />
                </div>
                <div className="mt-5">
                  <p className="text-sm font-semibold text-brand-900 mb-1.5">Observações Gerais</p>
                  <p className="text-sm text-brand-500 bg-brand-50 rounded-lg px-4 py-3 border border-brand-100">{member.notes}</p>
                </div>
              </CardBody>
            </Card>
          )}

          {tab === 'Histórico' && (
            <Card><CardBody className="pt-6">
              <h3 className="font-bold text-brand-900 mb-5">Linha do Tempo</h3>
              <div className="space-y-5">
                {history.map((h, i) => (
                  <div key={i} className="flex gap-3">
                    <span className={`h-2.5 w-2.5 rounded-full mt-1.5 shrink-0 ${h.dot}`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-brand-900">{h.title}</p>
                        <span className="text-xs text-brand-300">{h.date}</span>
                      </div>
                      <p className="text-sm text-brand-300">{h.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody></Card>
          )}

          {tab === 'Contribuições' && (
            <Card><CardBody className="pt-6">
              <h3 className="font-bold text-brand-900 mb-4">Histórico de Contribuições</h3>
              <div className="divide-y divide-brand-100">
                {contributions.map((c, i) => (
                  <div key={i} className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-semibold text-brand-900">{c.type}</p>
                      <p className="text-xs text-brand-300">{c.date}</p>
                    </div>
                    <p className="text-sm font-bold text-green-600">{c.amount}</p>
                  </div>
                ))}
              </div>
            </CardBody></Card>
          )}

          {tab === 'Documentos' && (
            <Card><CardBody className="pt-6">
              <EmptyState title="Nenhum documento anexado" description="Documentos como certidões e comprovantes aparecerão aqui." />
            </CardBody></Card>
          )}
        </div>

        <Card className="h-fit">
          <CardBody className="pt-6">
            <h3 className="font-bold text-brand-900 mb-4">Histórico Recente</h3>
            <div className="space-y-4">
              {history.map((h, i) => (
                <div key={i} className="flex gap-3">
                  <span className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${h.dot}`} />
                  <div>
                    <p className="text-sm font-semibold text-brand-900 leading-tight">{h.title}</p>
                    <p className="text-xs text-brand-300 mt-0.5">{h.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </Layout>
  )
}

function ReadField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-semibold text-brand-900 mb-1.5">{label}</p>
      <div className="rounded-lg border border-brand-100 bg-brand-50/40 px-3.5 py-2.5 text-sm text-brand-700">{value}</div>
    </div>
  )
}
