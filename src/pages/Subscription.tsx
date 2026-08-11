import { Check } from 'lucide-react'
import { Layout } from '@/components/layout/Layout'
import { Card, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { plans } from '@/data/misc'
import { useToast } from '@/components/ui/Extras'
import { cn } from '@/lib/format'

const usage = [
  { label: 'Membros Ativos', used: 1247, total: 2000 },
  { label: 'Congregações', used: 8, total: 15 },
  { label: 'Usuários Administradores', used: 34, total: 50 },
]

export default function Subscription() {
  const toast = useToast()
  const current = 'Plano Premium Multi'

  return (
    <Layout crumbs={[{ label: 'Configurações', to: '/configuracoes' }, { label: 'Assinatura' }]} title="Assinatura e Plano">
      <Card className="border-2 border-brand-800 mb-8">
        <CardBody className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="text-lg font-extrabold text-brand-900">{current}</h3>
                <span className="text-[11px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-md">Ativo</span>
              </div>
              <p className="text-sm text-brand-300 mt-1">Renovação automática em 15 de Junho, 2026</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-extrabold text-brand-900">R$ 297<span className="text-sm font-medium text-brand-300">/mês</span></span>
              <Button onClick={() => toast('Painel de troca de plano em breve.')}>Alterar Plano</Button>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-brand-100">
            <p className="text-sm font-bold text-brand-900 mb-4">Limite e Uso de Recursos</p>
            <div className="grid sm:grid-cols-3 gap-6">
              {usage.map((u) => (
                <div key={u.label}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-semibold text-brand-900">{u.label}</span>
                    <span className="text-brand-300">{u.used} / {u.total}</span>
                  </div>
                  <div className="h-2 rounded-full bg-brand-100 overflow-hidden">
                    <div className="h-full bg-brand-700 rounded-full" style={{ width: `${(u.used / u.total) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="grid sm:grid-cols-3 gap-6">
        {plans.map((p) => {
          const isCurrent = p.name === current
          return (
            <Card key={p.name} className={cn('p-6 flex flex-col', isCurrent && 'border-2 border-brand-800')}>
              <h3 className={cn('font-bold', isCurrent ? 'text-brand-800' : 'text-brand-900')}>{p.name}</h3>
              <p className="text-sm text-brand-300 mt-1 mb-4 min-h-[40px]">
                {p.name === 'Plano Básico' && 'Perfeito para igrejas locais pequenas que estão iniciando a informatização.'}
                {p.name === 'Plano Profissional' && 'Recomendado para congregações em franco crescimento de ministérios.'}
                {p.name === 'Plano Premium Multi' && 'Para campos ministeriais extensos, sedes e redes consolidadas de igrejas.'}
              </p>
              <div className="mb-5">
                <span className="text-3xl font-extrabold text-brand-900">R$ {p.price}</span>
                <span className="text-sm text-brand-300"> /mês</span>
              </div>
              <p className="text-sm font-semibold text-brand-900 mb-3">O plano inclui:</p>
              <ul className="space-y-2 mb-6 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-brand-500">
                    <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={isCurrent ? 'secondary' : 'outline'}
                disabled={isCurrent}
                className="w-full"
                onClick={() => toast(`${p.name} selecionado.`)}
              >
                {isCurrent ? 'Plano Atual' : 'Selecionar Plano'}
              </Button>
            </Card>
          )
        })}
      </div>
    </Layout>
  )
}
