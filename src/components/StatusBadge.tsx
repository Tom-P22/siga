import type { ProcessStatus } from '../types'
import { statusStyles } from '../utils'

export const StatusBadge: React.FC<{ status: ProcessStatus }> = ({ status }) => (
  <span
    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold capitalize ${statusStyles[status]}`}
  >
    {status}
  </span>
)
