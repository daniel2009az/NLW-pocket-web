import { Plus } from 'lucide-react' // Importa o ícone Plus da biblioteca 'lucide-react'
import { OutlineButton } from './ui/outline-button' // Importa o componente OutlineButton
import { useQuery, useQueryClient } from '@tanstack/react-query' // Importa hooks para gerenciar consultas e cache
import { getPendingGoals } from '../http/get-pending-goals' // Função para buscar metas pendentes
import { createGoalCompletion } from '../http/create-goal-completion' // Função para criar a conclusão de uma meta

export function PendingGoals() {
  const queryClient = useQueryClient() // Instancia o cliente de consulta

  const { data } = useQuery({
    queryKey: ['pending-goals'], // Chave da consulta para identificação
    queryFn: getPendingGoals, // Função que busca os dados
    staleTime: 1000 * 60, // Tempo para considerar a consulta "fresca" (1 minuto)
  })

  if (!data) {
    // Se não houver dados, retorna null
    return null
  }

  async function handleCompleteGoal(goalId: string) {
    // Função para concluir uma meta
    await createGoalCompletion(goalId) // Chama a função para completar a meta
    queryClient.invalidateQueries({ queryKey: ['summary'] }) // Invalida a consulta de resumo
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] }) // Invalida a consulta de metas pendentes
  }

  return (
    <div className=" flex flex-wrap gap-3">
      {' '}
      {/* Container flexível para as metas */}
      {data.map(goal => {
        // Itera sobre as metas pendentes
        return (
          <OutlineButton
            key={goal.id} // Chave única para cada botão
            disabled={goal.completionCount >= goal.desiredWeeklyFrequency} // Desabilita se atingir a frequência desejada
            onClick={() => handleCompleteGoal(goal.id)} // Chama a função ao clicar no botão
          >
            <Plus className="size-4 text-zinc-600" /> {/* Ícone de mais */}
            {goal.title} {/* Título da meta */}
          </OutlineButton>
        )
      })}
    </div>
  )
}
