import { Dialog } from './components/ui/dialog' // Importa o componente Dialog
import { CreateGoal } from './components/create-goal' // Importa o componente para criar metas
import { Summary } from './components/summary' // Importa o componente que exibe o resumo
import { EmptyGoals } from './components/empty-goals' // Importa o componente para exibir quando não há metas
import { useQuery } from '@tanstack/react-query' // Importa o hook para realizar consultas
import { getSummary } from './http/get-summary' // Importa a função que busca o resumo

export function App() {
  const { data } = useQuery({
    queryKey: ['summary'], // Chave única para a consulta
    queryFn: getSummary, // Função que realiza a consulta
    staleTime: 1000 * 60, //60 segundos (dados considerados frescos)
  })

  return (
    <Dialog>
      {' '}
      {/* Componente que cria um diálogo */}
      {data?.total && data.total > 0 ? <Summary /> : <EmptyGoals />}{' '}
      {/* Condicional para exibir resumo ou mensagem de metas vazias */}
      <CreateGoal /> {/* Componente que permite a criação de uma nova meta */}
    </Dialog>
  )
}
