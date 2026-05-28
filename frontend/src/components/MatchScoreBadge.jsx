import { useMemo } from 'react'

export default function MatchScoreBadge({ score }) {
  const scoreData = useMemo(() => {
    if (typeof score !== 'number' || Number.isNaN(score) || score < 0 || score > 100) return null

    if (score <= 40) {
      return {
        label: 'Low Match',
        bgColor: 'bg-red-500/20',
        textColor: 'text-red-600',
        borderColor: 'border-red-500/30'
      }
    } else if (score <= 70) {
      return {
        label: 'Partial Match',
        bgColor: 'bg-yellow-500/20',
        textColor: 'text-yellow-600',
        borderColor: 'border-yellow-500/30'
      }
    } else {
      return {
        label: 'Strong Match',
        bgColor: 'bg-green-500/20',
        textColor: 'text-green-600',
        borderColor: 'border-green-500/30'
      }
    }
  }, [score])

  if (scoreData === null) return null

  const displayScore = Math.round(score)

  return (
    <div
      className={`group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-medium text-sm ${scoreData.bgColor} ${scoreData.textColor} ${scoreData.borderColor} cursor-help transition-all hover:shadow-md`}
      title="Based on your resume"
    >
      <span className="font-semibold">{displayScore}%</span>
      <span>{scoreData.label}</span>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        Based on your resume
      </div>
    </div>
  )
}
