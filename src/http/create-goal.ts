// Define a interface CreateGoalRequest que especifica a estrutura esperada para a requisição de criação de uma meta
interface CreateGoalRequest {
  title: string // Título da meta, deve ser uma string
  desiredWeeklyFrequency: number // Frequência desejada por semana, deve ser um número
}

// Função assíncrona que cria uma nova meta. A função aceita um objeto que deve obedecer à estrutura de CreateGoalRequest.
export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  // Realiza uma requisição HTTP do tipo POST para o endpoint '/goals' no servidor local
  await fetch('http://localhost:3333/goals', {
    method: 'POST', // Especifica que o método da requisição é POST

    headers: {
      'Content-Type': 'application/json', // Define o cabeçalho Content-Type como JSON, indicando que o corpo da requisição é um objeto JSON
    },

    // Serializa o objeto que inclui o título e a frequência desejada em formato JSON para o corpo da requisição
    body: JSON.stringify({
      title, // Inclui o título da meta
      desiredWeeklyFrequency, // Inclui a frequência desejada por semana
    }),
  })
}
