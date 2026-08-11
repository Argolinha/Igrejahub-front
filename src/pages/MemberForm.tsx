import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { Save } from 'lucide-react'
import { Layout } from '@/components/layout/Layout'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input, Select, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { members, congregationOptions } from '@/data/members'
import { useToast } from '@/components/ui/Extras'

export default function MemberForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const isEdit = Boolean(id)
  const existing = members.find((m) => m.id === id)
  const [avatar] = useState(existing?.avatar ?? 'https://i.pravatar.cc/150?u=novo-membro')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    toast(isEdit ? 'Membro atualizado com sucesso.' : 'Membro cadastrado com sucesso.')
    navigate('/membros')
  }

  return (
    <Layout
      crumbs={[{ label: 'Igreja Sede' }, { label: 'Membros', to: '/membros' }, { label: isEdit ? 'Editar' : 'Novo Membro' }]}
      title={isEdit ? 'Editar Membro' : 'Cadastro de Membro'}
    >
      <form onSubmit={handleSubmit} className="max-w-4xl">
        <Card className="mb-6">
          <CardHeader><CardTitle>Foto e Identificação</CardTitle></CardHeader>
          <CardBody className="flex items-center gap-5 pt-2">
            <img src={avatar} className="h-20 w-20 rounded-full object-cover" alt="" />
            <div>
              <Button type="button" variant="outline" size="sm">Alterar Foto</Button>
              <p className="text-xs text-brand-300 mt-2">Formatos PNG ou JPG. Máximo de 2MB.</p>
            </div>
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader><CardTitle>Dados Pessoais</CardTitle></CardHeader>
          <CardBody className="grid sm:grid-cols-2 gap-5 pt-2">
            <Input label="Nome Completo" defaultValue={existing?.name} placeholder="Digite o nome completo" required />
            <Input label="E-mail" type="email" defaultValue={existing?.email} placeholder="exemplo@email.com" required />
            <Input label="Telefone" defaultValue={existing?.phone} placeholder="(41) 90000-0000" />
            <Input label="Data de Nascimento" defaultValue={existing?.birthDate} placeholder="DD/MM/AAAA" />
            <Select label="Sexo" defaultValue={existing?.gender ?? ''}>
              <option value="">Selecione</option>
              <option>Masculino</option>
              <option>Feminino</option>
            </Select>
            <Select label="Estado Civil" defaultValue={existing?.maritalStatus ?? ''}>
              <option value="">Selecione</option>
              <option>Solteiro</option>
              <option>Casado</option>
              <option>Divorciado</option>
              <option>Viúvo</option>
            </Select>
            <Input label="Profissão" defaultValue={existing?.profession} placeholder="Ex: Engenheiro Civil" />
            <Input label="Endereço" defaultValue={existing?.address} placeholder="Rua, número, cidade/UF" className="sm:col-span-2" />
          </CardBody>
        </Card>

        <Card className="mb-6">
          <CardHeader><CardTitle>Vínculo Eclesiástico</CardTitle></CardHeader>
          <CardBody className="grid sm:grid-cols-2 gap-5 pt-2">
            <Select label="Congregação" defaultValue={existing?.congregation ?? ''}>
              {congregationOptions.filter((c) => c !== 'Todas').map((c) => <option key={c}>{c}</option>)}
            </Select>
            <Select label="Função / Cargo" defaultValue={existing?.role ?? ''}>
              <option>Membro</option>
              <option>Diácono</option>
              <option>Líder de Jovens</option>
              <option>Secretário</option>
              <option>Tesoureiro</option>
              <option>Pastor de Congregação</option>
              <option>Pastor Principal</option>
              <option>Visitante</option>
            </Select>
            <Input label="Data de Batismo" defaultValue={existing?.baptismDate} placeholder="DD/MM/AAAA" />
            <Select label="Status" defaultValue={existing?.status ?? 'Ativo'}>
              <option>Ativo</option>
              <option>Inativo</option>
              <option>Visitante</option>
            </Select>
            <Textarea label="Observações Gerais" defaultValue={existing?.notes} rows={4} className="sm:col-span-2" placeholder="Anotações pastorais, participação em ministérios, etc." />
          </CardBody>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate('/membros')}>Cancelar</Button>
          <Button type="submit"><Save className="h-4 w-4" /> {isEdit ? 'Salvar Alterações' : 'Cadastrar Membro'}</Button>
        </div>
      </form>
    </Layout>
  )
}
