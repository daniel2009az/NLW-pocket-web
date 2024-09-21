import { CheckCircle2, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import { InOrbitIcon } from './in-orbit-icon'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from '../http/get-summary'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-BR'
import { PendingGoals } from './pending-goals'

// Define o idioma como português do Brasil
dayjs.locale(ptBR)

export function Summary() {
  // Faz uma consulta para obter o resumo das metas
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 60 segundos
  })

  // Se não houver dados, não renderiza nada
  if (!data) {
    return null
  }

  // Obtém o primeiro dia da semana
  const { firstDayWeek, firstDayAndMonth } = (() => {
    const firstDayWeek = dayjs().startOf('week').format('D')
    const firstDayAndMonth = dayjs().startOf('week').format('D MMMM')
    return { firstDayWeek, firstDayAndMonth }
  })()

  // Obtém o último dia da semana
  const { lastDayWeek, lastdayAndMonth } = (() => {
    const lastDayWeek = dayjs().endOf('week').format('D')
    const lastdayAndMonth = dayjs().endOf('week').format('D MMMM')
    return { lastDayWeek, lastdayAndMonth }
  })()

  // Calcula a porcentagem de metas completadas
  const completedPorcentage = Math.round((data?.completed * 100) / data?.total)

  return (
    <div className="py-10  max-w-[480px] px-5 mx-auto  flex flex-col gap-6">
      {/* Cabeçalho da seção de resumo */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold flex capitalize">
            {/* Exibe o intervalo de dias */}
            {Number(lastDayWeek) < Number(firstDayWeek)
              ? `${firstDayAndMonth} - ${lastdayAndMonth}`
              : `${Number(firstDayWeek)} - ${lastdayAndMonth}`}
          </span>
        </div>

        {/* Botão para cadastrar nova meta */}
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        {/* Barra de progresso mostrando metas completadas */}
        <Progress value={data.completed} max={150}>
          <ProgressIndicator style={{ width: `${completedPorcentage}%` }} />
        </Progress>

        {/* Texto informando sobre as metas completas */}
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">{data.completed}</span> de{' '}
            <span className="text-zinc-100">{data.total}</span> metas nessa
            semana.
          </span>
          <span>{completedPorcentage}%</span>
        </div>
      </div>

      <Separator />
      <PendingGoals />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>
        {/* Mapeia os objetivos por dia */}
        {Object.entries(data.goalsPerDay).map(([date, goals]) => {
          const weekDay = dayjs(date).format('dddd')
          const meses = ['jan', 'dez', 'fev', 'set', 'nov']

          // Formata a data inicialmente
          let formatedDate = dayjs(date).add(3, 'M').format('D [de] MMMM')

          // Converte o mês para maiúsculo apenas se a substring do mês for encontrada
          // biome-ignore lint/complexity/noForEach: <explanation>
          meses.forEach(mes => {
            if (formatedDate.includes(mes)) {
              // Substitui a substring do mês com a primeira letra maiúscula
              formatedDate = formatedDate.replace(
                mes,
                mes.charAt(0).toUpperCase() + mes.slice(1)
              )
            }
          })

          return (
            <div key={date} className="flex flex-col gap-4">
              <h3 className="font-medium">
                {/* Exibe o dia da semana e a data formatada */}
                <span className="capitalize">{weekDay} </span>
                <span className="text-zinc-400 text-xs">{formatedDate} </span>
              </h3>

              <ul className="flex flex-col gap-3">
                {/* Lista as metas completadas */}
                {goals.map(({ id, title, completedAt }) => {
                  const dateTime = dayjs(completedAt).format('HH[:]mm')
                  return (
                    <li key={id} className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-pink-500" />
                      <span className="text-sm text-zinc-400">
                        {/* Exibe a meta completada e o horário */} Você
                        completou "
                        <span className="text-zinc-100">{title} "</span> às{' '}
                        <span className="text-zinc-100">{dateTime}</span>
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
