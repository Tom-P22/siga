import type { AppData, ProcessStatus, VehicleType } from './types'

export const createId = (prefix: string) =>
  `${prefix}-${Date.now().toString(36).toUpperCase()}`

export const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat('es-CL', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value))

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat('es-CL', { dateStyle: 'medium' }).format(
    new Date(`${value}T12:00:00`),
  )

export const calculateVehicleLimit = (date: string, type: VehicleType) => {
  const days = type === 'diplomatico' ? 90 : 180
  const limit = new Date(`${date}T12:00:00`)
  limit.setDate(limit.getDate() + days)
  return { days, limit: limit.toISOString().slice(0, 10) }
}

export const statusStyles: Record<ProcessStatus, string> = {
  aprobado: 'bg-emerald-100 text-emerald-800',
  observado: 'bg-amber-100 text-amber-800',
  rechazado: 'bg-red-100 text-red-800',
}

export const downloadCsv = (filename: string, rows: Array<Record<string, string | number | boolean>>) => {
  if (rows.length === 0) return
  const headers = Object.keys(rows[0])
  const escape = (value: string | number | boolean) =>
    `"${String(value).replaceAll('"', '""')}"`
  const csv = [
    headers.map(escape).join(','),
    ...rows.map((row) => headers.map((header) => escape(row[header])).join(',')),
  ].join('\n')
  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

export const loadData = (): AppData | null => {
  try {
    const stored = localStorage.getItem('siga-data')
    return stored ? (JSON.parse(stored) as AppData) : null
  } catch {
    return null
  }
}
