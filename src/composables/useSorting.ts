import { computed, ref, type Ref } from 'vue'
import type { Risk, SortColumn, SortDirection } from '@/types/risk'
import { compareSeverity } from '@/utils/severity'

const STATUS_ORDER: Record<string, number> = {
  open: 0,
  mitigating: 1,
  accepted: 2,
  closed: 3,
}

interface UseSortingReturn {
  sortColumn: Ref<SortColumn | null>
  sortDirection: Ref<SortDirection>
  sortedRisks: Ref<Risk[]>
  toggleSort: (column: SortColumn) => void
}

export function useSorting(risks: Ref<Risk[]>): UseSortingReturn {
  const sortColumn = ref<SortColumn | null>(null)
  const sortDirection = ref<SortDirection>('none')

  function toggleSort(column: SortColumn) {
    if (sortColumn.value === column) {
      const cycle: Record<SortDirection, SortDirection> = {
        none: 'asc',
        asc: 'desc',
        desc: 'none',
      }
      sortDirection.value = cycle[sortDirection.value]
      if (sortDirection.value === 'none') {
        sortColumn.value = null
      }
    } else {
      sortColumn.value = column
      sortDirection.value = 'asc'
    }
  }

  const sortedRisks = computed(() => {
    if (!sortColumn.value || sortDirection.value === 'none') {
      return risks.value
    }

    const col = sortColumn.value
    const dir = sortDirection.value
    const multiplier = dir === 'asc' ? 1 : -1

    return [...risks.value].sort((a, b) => {
      let result = 0

      switch (col) {
        case 'severity':
          result = compareSeverity(a.severity, b.severity)
          break
        case 'status':
          result = (STATUS_ORDER[a.status] ?? 99) - (STATUS_ORDER[b.status] ?? 99)
          break
        case 'costImpact':
          result = a.costImpactEur - b.costImpactEur
          break
        case 'updatedAt':
          result = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          break
      }

      return result * multiplier
    })
  })

  return { sortColumn, sortDirection, sortedRisks, toggleSort }
}
