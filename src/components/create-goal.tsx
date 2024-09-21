import { X } from 'lucide-react'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './ui/dialog' // Importa componentes de dialogo
import { Label } from './ui/label' // Importa componente de Label
import { Input } from './ui/input' // Importa componente de Input
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from './ui/radio-group' // Importa componentes de RadioGroup
import { Button } from './ui/button' // Importa componente de Botão
import { Controller, useForm } from 'react-hook-form' // Importa hooks do react-hook-form
import { z } from 'zod' // Importa biblioteca zod para validação
import { zodResolver } from '@hookform/resolvers/zod' // Importa resolver para zod
import { createGoal } from '../http/create-goal' // Importa função para criar meta
import { useQueryClient } from '@tanstack/react-query' // Importa hook para controle de cache

// Define esquema de validação usando Zod
const createGoalForm = z.object({
  title: z.string().min(1, 'Informe a atividade que deseja realizar'), // Título deve ser uma string não vazia
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7), // Frequência deve ser um número entre 1 e 7
})
type CreateGoalForm = z.infer<typeof createGoalForm> // Define tipo conforme o esquema

export function CreateGoal() {
  // Componente para criar meta
  const queryClient = useQueryClient() // Instancia queryClient

  const { register, control, handleSubmit, formState, reset } =
    useForm<CreateGoalForm>({
      // Hook useForm para gerenciamento de formulários
      resolver: zodResolver(createGoalForm), // Aplica resolução do zod
    })

  // Função para criar meta ao submeter o formulário
  async function handleCreateGoal(data: CreateGoalForm) {
    await createGoal({
      // Chama função para criar meta
      title: data.title,
      desiredWeeklyFrequency: data.desiredWeeklyFrequency,
    })
    console.log(data) // Loga dados da meta

    // Invalida queries para atualizar o estado do aplicativo
    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
    reset() // Reseta o formulário
  }

  return (
    <DialogContent>
      <div className="flex flex-col gap-6 h-full">
        <div className="fex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar Meta</DialogTitle> {/* Título do diálogo */}
            <DialogClose>
              <X className="size-5 text-zinc-600" /> {/* Ícone de fechar */}
            </DialogClose>
          </div>
          <DialogDescription>
            Adicione atividades que te fazem bem e que você quer continuar
            praticando toda semana. {/* Descrição do formulário */}
          </DialogDescription>
        </div>

        <form
          onSubmit={handleSubmit(handleCreateGoal)} // Lida com o envio do formulário
          className="flex flex-col justify-between flex-1"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade</Label>{' '}
              {/* Rótulo do input */}
              <Input
                id="title"
                placeholder="Praticar exercicios, meditar, etc" // Placeholder do input
                autoFocus
                {...register('title')} // Registro para validação do título
              />
              {formState.errors.title && ( // Exibe erro se houver
                <p className=" text-red-400 text-sm">
                  {formState.errors.title.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Quantas vezes na semana?</Label>{' '}
              {/* Rótulo para a frequência */}
              <Controller
                control={control} // Controla o componente
                name="desiredWeeklyFrequency" // Nome do campo
                defaultValue={3} // Valor padrão
                render={({ field }) => {
                  return (
                    <RadioGroup
                      onValueChange={field.onChange} // Atualiza valor ao mudar
                      value={String(field.value)} // Converte valor para string
                    >
                      {/* Cada RadioGroupItem representa uma opção de frequência */}
                      <RadioGroupItem value="1">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          1x Na semana
                        </span>
                        <span className="text-lg leading-none">🥱</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="2">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          2x Na semana
                        </span>
                        <span className="text-lg leading-none">🙂</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="3">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          3x Na semana
                        </span>
                        <span className="text-lg leading-none">😎</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="4">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          4x Na semana
                        </span>
                        <span className="text-lg leading-none">😜</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="5">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          5x Na semana
                        </span>
                        <span className="text-lg leading-none">🤨</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="6">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          6x Na semana
                        </span>
                        <span className="text-lg leading-none">🤯</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="7">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          Todos os dias da semana
                        </span>
                        <span className="text-lg leading-none">🔥</span>
                      </RadioGroupItem>
                    </RadioGroup>
                  )
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button type="button" className="flex-1" variant="secondary">
                Fechar {/* Botão para fechar o diálogo */}
              </Button>
            </DialogClose>
            <Button className="flex-1">Salvar</Button>{' '}
            {/* Botão para salvar a meta */}
          </div>
        </form>
      </div>
    </DialogContent>
  )
}
