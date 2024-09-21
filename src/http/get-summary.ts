// Define o tipo de resposta do resumo
type SummaryResponse = {
  completed: number // Número total de tarefas concluídas
  total: number // Número total de tarefas
  goalsPerDay: Record<
    // Registro das metas por dia
    string, // A chave é uma string representando a data
    {
      id: string // Identificador da meta
      title: string // Título da meta
      completedAt: string // Data de conclusão da meta
    }[] // Array de metas para cada data
  >
}

// Função assíncrona para obter o resumo
export async function getSummary(): Promise<SummaryResponse> {
  const response = await fetch('http://localhost:3333/summary') // Faz a requisição para a API
  const data = await response.json() // Converte a resposta para JSON
  return data.summary // Retorna o resumo contido nos dados
}
