import { StrictMode } from 'react' // Importa o modo estrito do React
import { createRoot } from 'react-dom/client' // Importa a função para criar a raiz do DOM
import { App } from './app' // Importa o componente principal da aplicação
import './index.css' // Importa o arquivo de estilos CSS
import { QueryClientProvider, QueryClient } from '@tanstack/react-query' // Importa os hooks de consulta do react-query

// Cria um cliente para gerenciar as consultas
const queryClient = new QueryClient()

// Renderiza a aplicação
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    {' '}
    {/* Provedor do cliente de consultas */}
    <StrictMode>
      {' '}
      {/* Habilita o modo estrito para detectar problemas */}
      <App /> {/* Renderiza o componente App */}
    </StrictMode>
  </QueryClientProvider>
)
