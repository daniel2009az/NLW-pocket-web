type PendinGoalsResponse = {
  // Define o tipo para a resposta de metas pendentes
  id: string // ID da meta
  title: string // Título da meta
  desiredWeeklyFrequency: number // Frequência desejada semanal
  completionCount: number // Contagem de conclusão
}[]

export async function getPendingGoals(): Promise<PendinGoalsResponse> {
  // Função assíncrona para obter metas pendentes
  const response = await fetch('http://localhost:3333/pending-goals') // Faz a requisição à API
  const data = await response.json() // Converte a resposta para JSON

  return data.pedingGoals // Retorna as metas pendentes
}
