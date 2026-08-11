import { useNavigate } from 'react-router-dom'
import { ChevronRight, Cloud, MapPin } from 'lucide-react'
import { congregations } from '@/data/congregations'
import { Badge } from '@/components/ui/Badge'
import { useApp } from '@/lib/AppContext'

export default function ChurchSelection() {
  const navigate = useNavigate()
  const { setChurch } = useApp()

  function select(name: string, city: string, id: string) {
    setChurch({ id, name, city })
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between px-6 sm:px-10 h-[68px] border-b border-brand-100">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-brand-800 flex items-center justify-center">
            <Cloud className="h-4.5 w-4.5 text-white" fill="currentColor" />
          </div>
          <span className="font-extrabold text-lg text-brand-900">IgrejaHub</span>
        </div>
        <div className="flex items-center gap-2.5">
          <img src="https://i.pravatar.cc/150?u=carlos-eduardo" className="h-9 w-9 rounded-full object-cover" alt="" />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-brand-900 leading-tight">Pr. Carlos Santos</p>
            <p className="text-xs text-brand-300">Igreja Sede</p>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl font-extrabold text-brand-900">Selecione sua Igreja</h1>
        <p className="text-brand-300 mt-2 mb-10">Selecione qual de suas congregações deseja administrar hoje.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {congregations.slice(0, 3).map((c) => (
            <button
              key={c.id}
              onClick={() => select(c.name, c.city, c.id)}
              className="group bg-white rounded-2xl border border-brand-100 shadow-card overflow-hidden hover:shadow-soft hover:-translate-y-0.5 transition-all text-left"
            >
              <div className="h-36 w-full overflow-hidden">
                <img src={c.image} alt={c.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-brand-900">{c.name}</h3>
                <p className="text-sm text-brand-300 flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3.5 w-3.5" /> {c.city}, {c.state}
                </p>
                <div className="flex gap-2 mt-3">
                  <Badge tone="blue">{c.members.toLocaleString('pt-BR')} membros</Badge>
                  {c.subCongregations ? <Badge tone="blue">{c.subCongregations} congregações</Badge> : <Badge tone="blue">Sede Integrada</Badge>}
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-brand-100">
                  <Badge tone="navy">{c.tag}</Badge>
                  <span className="h-8 w-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-700 group-hover:bg-brand-800 group-hover:text-white transition-colors">
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <button onClick={() => select('Todas as Igrejas', 'Multi', 'ALL')} className="text-brand-700 font-semibold text-sm mt-10 hover:underline">
          Gerenciar todas as igrejas (Acesso Administrador)
        </button>
      </div>
    </div>
  )
}
