// Função assíncrona para criar a conclusão de uma meta, usando o ID da meta passada como parâmetro
export async function createGoalCompletion(goalId: string) {
  // Realiza uma requisição para o endpoint '/completions' no servidor local
  await fetch('http://localhost:3333/completions', {
    method: 'POST', // Especifica que estamos fazendo uma requisição do tipo POST

    headers: {
      'Content-Type': 'application/json', // Define o tipo de conteúdo da requisição como JSON
    },
    // Converte o corpo da requisição em uma string JSON, incluindo o ID da meta
    body: JSON.stringify({
      goalId, // Inclui o ID da meta no corpo da requisição
    }),
  })
}
