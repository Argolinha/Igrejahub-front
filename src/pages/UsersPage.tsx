import { useState } from 'react'
import { UserPlus, ShieldCheck } from 'lucide-react'
import { Layout } from '@/components/layout/Layout'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import { Tabs } from '@/components/ui/Tabs'
import { Table, Thead, Tr, Th, Td } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { appUsers, accessProfiles } from '@/data/misc'
import type { Role } from '@/types'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Input'
import { useToast } from '@/components/ui/Extras'
import { EmptyState } from '@/components/ui/Misc'

const roleTone: Record<Role, 'green' | 'purple' | 'blue' | 'yellow' | 'orange' | 'gray'> = {
  'Pastor Principal': 'green',
  Secretário: 'purple',
  Tesoureiro: 'blue',
  'Pastor de Congregação': 'blue',
  Administrador: 'yellow',
  Usuário: 'gray',
}

const logs = [
  { user: 'Carlos Santos', action: 'Fez login na plataforma', time: 'Hoje, 10:45' },
  { user: 'Lucas Silva', action: 'Editou permissões do perfil Tesoureiro', time: 'Hoje, 09:12' },
  { user: 'Sarah Reis', action: 'Cadastrou um novo membro', time: 'Ontem, 16:22' },
  { user: 'Marcos Vinícius', action: 'Gerou relatório financeiro', time: 'Ontem, 08:30' },
]

export default function UsersPage() {
  const [tab, setTab] = useState('Usuários Ativos')
  const [open, setOpen] = useState(false)
  const toast = useToast()

  return (
    <Layout
      crumbs={[{ label: 'Configurações Gerais' }, { label: 'Usuários' }]}
      title="Usuários e Permissões"
      searchPlaceholder="Buscar no painel..."
      action={{ label: 'Novo Usuário', icon: <UserPlus className="h-4 w-4" />, onClick: () => setOpen(true) }}
    >
      <Tabs tabs={['Usuários Ativos', 'Perfis de Acesso', 'Logs de Atividades']} active={tab} onChange={setTab} className="mb-6" />

      {tab === 'Usuários Ativos' && (
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <Table>
              <Thead><tr><Th>Membro / Usuário</Th><Th>Função / Perfil</Th><Th>Congregação</Th><Th>Último Acesso</Th></tr></Thead>
              <tbody>
                {appUsers.map((u) => (
                  <Tr key={u.id}>
                    <Td>
                      <div className="flex items-center gap-3">
                        <img src={u.avatar} className="h-9 w-9 rounded-full object-cover" alt="" />
                        <div>
                          <p className="font-semibold text-brand-900">{u.name}</p>
                          <p className="text-xs text-brand-300">{u.email}</p>
                        </div>
                      </div>
                    </Td>
                    <Td><Badge tone={roleTone[u.role]}>{u.role}</Badge></Td>
                    <Td className="text-brand-500">{u.congregation}</Td>
                    <Td className="text-brand-500">{u.lastAccess}</Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </Card>

          <div className="space-y-5">
            <Card>
              <CardHeader><CardTitle>Perfis de Acesso Activos</CardTitle></CardHeader>
              <CardBody className="pt-1">
                <p className="text-sm text-brand-300 mb-4">Consolidado de licenças e cargos autorizados na plataforma.</p>
                <div className="space-y-2.5">
                  {accessProfiles.map((p) => (
                    <div key={p.name} className="flex items-center justify-between text-sm">
                      <span className="font-medium text-brand-900">{p.name}</span>
                      <Badge tone="blue">{p.used} / {p.total}</Badge>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
            <div className="bg-brand-800 text-white rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-4 w-4" />
                <h4 className="font-bold text-sm">Segurança das Credenciais</h4>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                Recomendamos ativar autenticação de dois fatores (2FA) para todos os perfis com acesso a dados contábeis e financeiros da igreja.
              </p>
            </div>
          </div>
        </div>
      )}

      {tab === 'Perfis de Acesso' && (
        <Card><CardBody className="pt-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {accessProfiles.map((p) => (
              <div key={p.name} className="border border-brand-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-brand-900 text-sm">{p.name}</p>
                  <Badge tone="blue">{p.used}/{p.total}</Badge>
                </div>
                <div className="h-2 rounded-full bg-brand-100 overflow-hidden">
                  <div className="h-full bg-brand-700 rounded-full" style={{ width: `${(p.used / p.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardBody></Card>
      )}

      {tab === 'Logs de Atividades' && (
        <Card>
          {logs.length === 0 ? <EmptyState /> : (
            <div className="divide-y divide-brand-100">
              {logs.map((l, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-4">
                  <div>
                    <p className="text-sm font-semibold text-brand-900">{l.user}</p>
                    <p className="text-sm text-brand-500">{l.action}</p>
                  </div>
                  <span className="text-xs text-brand-300">{l.time}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Novo Usuário"
        footer={<>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={() => { setOpen(false); toast('Convite enviado com sucesso.') }}>Enviar Convite</Button>
        </>}
      >
        <div className="space-y-4">
          <Input label="Nome Completo" placeholder="Digite o nome" />
          <Input label="E-mail" type="email" placeholder="exemplo@igrejahub.com" />
          <Select label="Perfil de Acesso">
            <option>Administrador</option>
            <option>Pastor Principal</option>
            <option>Pastor de Congregação</option>
            <option>Tesoureiro</option>
            <option>Secretário</option>
            <option>Usuário</option>
          </Select>
        </div>
      </Modal>
    </Layout>
  )
}
