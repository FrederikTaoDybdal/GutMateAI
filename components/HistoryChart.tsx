'use client'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import type { ChartData, TooltipProps } from '@/types/journal'

const CustomTooltip = ({ payload, label, active }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  const dateLabel = new Date(label as string).toLocaleString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  const analysis = payload[0].payload

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
      <div className="space-y-2">
        <p className="text-sm text-gray-500">{dateLabel}</p>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-brand-light text-brand-primary">
            {analysis.mood}
          </span>
          <span className="text-sm text-gray-900">
            Score: {analysis.sentimentScore.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}

interface HistoryChartProps {
  data: ChartData[]
}

const HistoryChart = ({ data }: HistoryChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis
          dataKey="createdAt"
          tickFormatter={(date) => {
            return new Date(date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })
          }}
          stroke="#6B7280"
          tick={{ fontSize: 12 }}
        />
        <YAxis
          stroke="#6B7280"
          tick={{ fontSize: 12 }}
          domain={[-1, 1]}
          tickFormatter={(value) => value.toFixed(1)}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="sentimentScore"
          stroke="#10B981"
          strokeWidth={2}
          dot={{ fill: '#10B981', strokeWidth: 2 }}
          activeDot={{ r: 6, fill: '#059669' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default HistoryChart
