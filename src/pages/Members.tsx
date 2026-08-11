import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, UserPlus, Pencil, ChevronDown } from 'lucide-react'
import { Layout } from '@/components/layout/Layout'
import { Card } from '@/components/ui/Card'
import { Table, Thead, Tr, Th, Td } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { Checkbox } from '@/components/ui/Input'
import { Pagination, EmptyState } from '@/components/ui/Misc'
import { members, congregationOptions, roleOptions } from '@/data/members'
import type { MemberStatus } from '@/types'

const statusTone: Record<MemberStatus, 'green' | 'gray' | 'blue'> = {
  Ativo: 'green',
  Inativo: 'gray',
  Visitante: 'blue',
}

const PAGE_SIZE = 8

export default function Members() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [congregation, setCongregation] = useState('Todas')
  const [status, setStatus] = useState('Todas')
  const [role, setRole] = useState('Todas')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<string[]>([])

  const filtered = useMemo(() => {
    return members.filter((m) => {
      const q = query.toLowerCase()
      const matchesQuery = !q || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.role.toLowerCase().includes(q)
      const matchesCong = congregation === 'Todas' || m.congregation === congregation
      const matchesStatus = status === 'Todas' || m.status === status
      const matchesRole = role === 'Todas' || m.role === role
      return matchesQuery && matchesCong && matchesStatus && matchesRole
    })
  }, [query, congregation, status, role])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function toggleAll() {
    setSelected(selected.length === pageItems.length ? [] : pageItems.map((m) => m.id))
  }

  return (
    <Layout
      crumbs={[{ label: 'Igreja Sede' }, { label: 'Membros' }]}
      title="Membros"
      searchPlaceholder="Buscar membros..."
      action={{ label: 'Novo Membro', icon: <UserPlus className="h-4 w-4" />, onClick: () => navigate('/membros/novo') }}
    >
      <Card className="p-4 mb-5">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-300" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1) }}
              placeholder="Pesquisar por nome, e-mail ou cargo..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-brand-100 bg-brand-50/50 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 placeholder:text-brand-300"
            />
          </div>
          <FilterSelect value={congregation} onChange={(v) => { setCongregation(v); setPage(1) }} options={congregationOptions} label="Congregação" />
          <FilterSelect value={status} onChange={(v) => { setStatus(v); setPage(1) }} options={['Todas', 'Ativo', 'Inativo', 'Visitante']} label="Status" />
          <FilterSelect value={role} onChange={(v) => { setRole(v); setPage(1) }} options={roleOptions} label="Função" />
        </div>
      </Card>

      <Card>
        {pageItems.length === 0 ? (
          <EmptyState title="Nenhum membro encontrado" description="Ajuste os filtros de busca para encontrar o que procura." />
        ) : (
          <Table>
            <Thead>
              <tr>
                <Th className="w-10"><Checkbox checked={selected.length === pageItems.length} onChange={toggleAll} /></Th>
                <Th>Foto</Th>
                <Th>Nome</Th>
                <Th>E-mail</Th>
                <Th>Telefone</Th>
                <Th>Congregação</Th>
                <Th>Função</Th>
                <Th>Status</Th>
              </tr>
            </Thead>
            <tbody>
              {pageItems.map((m) => (
                <Tr key={m.id} className="cursor-pointer" onClick={() => navigate(`/membros/${m.id}`)}>
                  <Td onClick={(e) => e.stopPropagation()}>
                    <Checkbox checked={selected.includes(m.id)} onChange={() => setSelected((s) => s.includes(m.id) ? s.filter((x) => x !== m.id) : [...s, m.id])} />
                  </Td>
                  <Td><img src={m.avatar} className="h-9 w-9 rounded-full object-cover" alt="" /></Td>
                  <Td className="font-semibold">{m.name}</Td>
                  <Td className="text-brand-500">{m.email}</Td>
                  <Td className="text-brand-500">{m.phone}</Td>
                  <Td>{m.congregation}</Td>
                  <Td>{m.role}</Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <Badge tone={statusTone[m.status]}>{m.status}</Badge>
                      <button
                        onClick={(e) => { e.stopPropagation(); navigate(`/membros/${m.id}/editar`) }}
                        className="text-brand-300 hover:text-brand-700"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-brand-100">
          <p className="text-sm text-brand-300">
            Mostrando {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, filtered.length)} de {filtered.length} membros
          </p>
          <Pagination page={page} total={totalPages} onChange={setPage} />
        </div>
      </Card>
    </Layout>
  )
}

function FilterSelect({ value, onChange, options, label }: { value: string; onChange: (v: string) => void; options: string[]; label: string }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none pl-3.5 pr-9 py-2.5 rounded-lg border border-brand-100 bg-white text-sm text-brand-700 outline-none focus:border-brand-500 cursor-pointer min-w-[150px]"
      >
        {options.map((o) => <option key={o} value={o}>{o === 'Todas' ? label : o}</option>)}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-300 pointer-events-none" />
    </div>
  )
}
