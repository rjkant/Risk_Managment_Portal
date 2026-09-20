import { computed, reactive, type Ref } from 'vue'
import type { Risk, Severity, Status } from '@/types/risk'
import { getAllOwners } from '@/data/owners'

export interface ActiveFilter {
  type: 'severity' | 'status' | 'owner'
  value: string
  label: string
}

interface FilterState {
  severity: Set<Severity>
  status: Set<Status>
  owners: Set<string>
}

interface UseFiltersReturn {
  filters: FilterState
  activeFilters: Ref<ActiveFilter[]>
  filteredRisks: Ref<Risk[]>
  toggleSeverity: (value: Severity) => void
  toggleStatus: (value: Status) => void
  toggleOwner: (ownerId: string) => void
  removeFilter: (filter: ActiveFilter) => void
  clearAll: () => void
  hasActiveFilters: Ref<boolean>
}

export function useFilters(risks: Ref<Risk[]>): UseFiltersReturn {
  const filters = reactive<FilterState>({
    severity: new Set<Severity>(),
    status: new Set<Status>(),
    owners: new Set<string>(),
  })

  function toggleSeverity(value: Severity) {
    if (filters.severity.has(value)) {
      filters.severity.delete(value)
    } else {
      filters.severity.add(value)
    }
  }

  function toggleStatus(value: Status) {
    if (filters.status.has(value)) {
      filters.status.delete(value)
    } else {
      filters.status.add(value)
    }
  }

  function toggleOwner(ownerId: string) {
    if (filters.owners.has(ownerId)) {
      filters.owners.delete(ownerId)
    } else {
      filters.owners.add(ownerId)
    }
  }

  function removeFilter(filter: ActiveFilter) {
    switch (filter.type) {
      case 'severity':
        filters.severity.delete(filter.value as Severity)
        break
      case 'status':
        filters.status.delete(filter.value as Status)
        break
      case 'owner':
        filters.owners.delete(filter.value)
        break
    }
  }

  function clearAll() {
    filters.severity.clear()
    filters.status.clear()
    filters.owners.clear()
  }

  const ownerLookup = Object.fromEntries(getAllOwners().map((o) => [o.id, o.name]))

  const activeFilters = computed<ActiveFilter[]>(() => {
    const result: ActiveFilter[] = []
    for (const s of filters.severity) {
      result.push({ type: 'severity', value: s, label: s.charAt(0).toUpperCase() + s.slice(1) })
    }
    for (const s of filters.status) {
      result.push({ type: 'status', value: s, label: s.charAt(0).toUpperCase() + s.slice(1) })
    }
    for (const o of filters.owners) {
      result.push({ type: 'owner', value: o, label: ownerLookup[o] ?? o })
    }
    return result
  })

  const hasActiveFilters = computed(() => activeFilters.value.length > 0)

  const filteredRisks = computed(() => {
    return risks.value.filter((risk) => {
      if (filters.severity.size > 0 && !filters.severity.has(risk.severity)) return false
      if (filters.status.size > 0 && !filters.status.has(risk.status)) return false
      if (filters.owners.size > 0 && !filters.owners.has(risk.ownerId)) return false
      return true
    })
  })

  return {
    filters,
    activeFilters,
    filteredRisks,
    toggleSeverity,
    toggleStatus,
    toggleOwner,
    removeFilter,
    clearAll,
    hasActiveFilters,
  }
}
