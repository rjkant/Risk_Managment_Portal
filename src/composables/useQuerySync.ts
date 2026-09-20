import { watch, type Ref } from 'vue'
import type { Severity, Status, SortColumn, SortDirection } from '@/types/risk'

interface FilterState {
  severity: Set<Severity>
  status: Set<Status>
  owners: Set<string>
}

interface QuerySyncOptions {
  filters: FilterState
  toggleSeverity: (v: Severity) => void
  toggleStatus: (v: Status) => void
  toggleOwner: (v: string) => void
  sortColumn: Ref<SortColumn | null>
  sortDirection: Ref<SortDirection>
  toggleSort: (col: SortColumn) => void
  currentPage: Ref<number>
  goToPage: (p: number) => void
}

const VALID_SEVERITIES: Severity[] = ['critical', 'high', 'medium', 'low', 'unknown']
const VALID_STATUSES: Status[] = ['open', 'mitigating', 'accepted', 'closed']
const VALID_SORT_COLS: SortColumn[] = ['severity', 'status', 'costImpact', 'updatedAt']

/**
 * Two-way sync between reactive app state and URL query params.
 * Uses replaceState to avoid flooding browser history.
 */
export function useQuerySync(opts: QuerySyncOptions) {
  const {
    filters, toggleSeverity, toggleStatus, toggleOwner,
    sortColumn, sortDirection, toggleSort,
    currentPage, goToPage,
  } = opts

  /* ── Read URL → state on mount ── */
  const params = new URLSearchParams(window.location.search)

  const sevParam = params.get('severity')
  if (sevParam) {
    sevParam.split(',').forEach((v) => {
      if (VALID_SEVERITIES.includes(v as Severity)) toggleSeverity(v as Severity)
    })
  }

  const statusParam = params.get('status')
  if (statusParam) {
    statusParam.split(',').forEach((v) => {
      if (VALID_STATUSES.includes(v as Status)) toggleStatus(v as Status)
    })
  }

  const ownerParam = params.get('owner')
  if (ownerParam) {
    ownerParam.split(',').forEach((v) => {
      if (v) toggleOwner(v)
    })
  }

  const sortParam = params.get('sort')
  const dirParam = params.get('dir')
  if (sortParam && VALID_SORT_COLS.includes(sortParam as SortColumn)) {
    // toggleSort sets to asc on first call
    toggleSort(sortParam as SortColumn)
    // if URL says desc, toggle once more
    if (dirParam === 'desc') {
      toggleSort(sortParam as SortColumn)
    }
  }

  const pageParam = params.get('page')
  if (pageParam) {
    const p = parseInt(pageParam, 10)
    if (p > 1) goToPage(p)
  }

  /* ── Write state → URL on change ── */
  function syncToUrl() {
    const next = new URLSearchParams()

    if (filters.severity.size > 0) next.set('severity', [...filters.severity].join(','))
    if (filters.status.size > 0) next.set('status', [...filters.status].join(','))
    if (filters.owners.size > 0) next.set('owner', [...filters.owners].join(','))

    if (sortColumn.value && sortDirection.value !== 'none') {
      next.set('sort', sortColumn.value)
      next.set('dir', sortDirection.value)
    }

    if (currentPage.value > 1) next.set('page', String(currentPage.value))

    const qs = next.toString()
    const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname
    window.history.replaceState(null, '', url)
  }

  // Watch all reactive sources
  watch(
    [
      () => [...filters.severity],
      () => [...filters.status],
      () => [...filters.owners],
      sortColumn,
      sortDirection,
      currentPage,
    ],
    syncToUrl,
    { deep: true },
  )
}
