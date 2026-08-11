import { useState } from 'react'
import { Camera, CreditCard } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { Card, CardBody } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Switch } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/format'
import { useToast } from '@/components/ui/Extras'

const sections = ['Dados da Igreja', 'Aparência', 'Notificações', 'Integrações', 'Backup e Segurança', 'Assinatura']

export default function Settings() {
  const [active, setActive] = useState('Dados da Igreja')
  const [notifEmail, setNotifEmail] = useState(true)
  const [notifPush, setNotifPush] = useState(true)
  const [notifSms, setNotifSms] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

  function handleClick(section: string) {
    if (section === 'Assinatura') { navigate('/configuracoes/assinatura'); return }
    setActive(section)
  }

  return (
    <Layout crumbs={[{ label: 'Painel' }, { label: 'Configurações' }]} title="Configurações do Sistema" searchPlaceholder="Buscar no painel...">
      <div className="grid lg:grid-cols-[240px_1fr] gap-6">
        <Card className="p-3 h-fit">
          <nav className="space-y-1">
            {sections.map((s) => (
              <button
                key={s}
                onClick={() => handleClick(s)}
                className={cn(
                  'w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between',
                  active === s ? 'bg-brand-800 text-white' : 'text-brand-700 hover:bg-brand-50',
                )}
              >
                {s}
                {s === 'Assinatura' && <CreditCard className="h-3.5 w-3.5 opacity-70" />}
              </button>
            ))}
          </nav>
        </Card>

        <Card>
          <CardBody className="pt-6">
            {active === 'Dados da Igreja' && (
              <>
                <h3 className="font-bold text-brand-900 text-lg">Informações Gerais da Igreja</h3>
                <p className="text-sm text-brand-300 mt-1 mb-6">Atualize os dados institucionais oficiais da igreja sede de sua congregação.</p>
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-brand-100">
                  <div className="h-16 w-16 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center">
                    <Camera className="h-5 w-5 text-brand-300" />
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Alterar Logotipo</Button>
                    <p className="text-xs text-brand-300 mt-1.5">Formatos suportados: PNG, JPG. Máximo de 2MB.</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input label="Nome da Igreja Sede" defaultValue="Igreja Sede Central de Curitiba" />
                  <Input label="CNPJ da Instituição" defaultValue="12.345.678/0001-90" />
                  <Input label="Endereço (Rua e Número)" defaultValue="Avenida Sete de Setembro, 4520" />
                  <Input label="CEP" defaultValue="80250-210" />
                  <Input label="Telefone de Contato" defaultValue="(41) 3224-8899" />
                  <Input label="E-mail Secretaria" defaultValue="contato@sedecentral.com.br" />
                </div>
                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-brand-100">
                  <Button variant="outline">Cancelar</Button>
                  <Button onClick={() => toast('Configurações salvas com sucesso.')}>Salvar Alterações</Button>
                </div>
              </>
            )}

            {active === 'Aparência' && (
              <>
                <h3 className="font-bold text-brand-900 text-lg">Aparência</h3>
                <p className="text-sm text-brand-300 mt-1 mb-6">Personalize a identidade visual exibida para os membros e equipe.</p>
                <div className="grid grid-cols-4 gap-3 max-w-md">
                  {['#203B59', '#315C86', '#4B739B', '#172536'].map((c) => (
                    <button key={c} className="h-14 rounded-xl border-2 border-brand-100 hover:border-brand-800" style={{ background: c }} />
                  ))}
                </div>
              </>
            )}

            {active === 'Notificações' && (
              <>
                <h3 className="font-bold text-brand-900 text-lg">Notificações</h3>
                <p className="text-sm text-brand-300 mt-1 mb-6">Escolha como deseja ser notificado sobre a atividade da plataforma.</p>
                <div className="space-y-4 max-w-md">
                  <div className="flex items-center justify-between"><span className="text-sm text-brand-900">Notificações por e-mail</span><Switch checked={notifEmail} onChange={setNotifEmail} /></div>
                  <div className="flex items-center justify-between"><span className="text-sm text-brand-900">Notificações push</span><Switch checked={notifPush} onChange={setNotifPush} /></div>
                  <div className="flex items-center justify-between"><span className="text-sm text-brand-900">Notificações por SMS</span><Switch checked={notifSms} onChange={setNotifSms} /></div>
                </div>
              </>
            )}

            {active === 'Integrações' && (
              <>
                <h3 className="font-bold text-brand-900 text-lg">Integrações</h3>
                <p className="text-sm text-brand-300 mt-1 mb-6">Conecte o IgrejaHub a outras ferramentas (disponível em breve).</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {['Google Workspace', 'PIX Automático', 'WhatsApp Business', 'Mailchimp'].map((i) => (
                    <div key={i} className="border border-brand-100 rounded-xl p-4 flex items-center justify-between">
                      <span className="text-sm font-semibold text-brand-900">{i}</span>
                      <Button size="sm" variant="outline" disabled>Em breve</Button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {active === 'Backup e Segurança' && (
              <>
                <h3 className="font-bold text-brand-900 text-lg">Backup e Segurança</h3>
                <p className="text-sm text-brand-300 mt-1 mb-6">Gerencie a segurança da conta e backups automáticos dos dados.</p>
                <div className="space-y-4 max-w-md">
                  <div className="flex items-center justify-between"><span className="text-sm text-brand-900">Autenticação de dois fatores (2FA)</span><Switch checked={false} onChange={() => toast('2FA será configurado em breve.')} /></div>
                  <div className="flex items-center justify-between"><span className="text-sm text-brand-900">Backup automático diário</span><Switch checked={true} onChange={() => {}} /></div>
                </div>
              </>
            )}
          </CardBody>
        </Card>
      </div>
    </Layout>
  )
}
