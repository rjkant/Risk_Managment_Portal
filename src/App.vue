<script setup lang="ts">
import { useRisks } from '@/composables/useRisks'
import { useFilters } from '@/composables/useFilters'
import { useSorting } from '@/composables/useSorting'
import { usePagination } from '@/composables/usePagination'
import RiskTable from '@/components/table/RiskTable.vue'
import FilterPanel from '@/components/filters/FilterPanel.vue'
import ActiveFiltersBar from '@/components/common/ActiveFiltersBar.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import PaginationControls from '@/components/common/PaginationControls.vue'

const { risks } = useRisks()
const {
  filters,
  activeFilters,
  filteredRisks,
  hasActiveFilters,
  toggleSeverity,
  toggleStatus,
  toggleOwner,
  removeFilter,
  clearAll,
} = useFilters(risks)
const { sortColumn, sortDirection, sortedRisks, toggleSort } = useSorting(filteredRisks)
const {
  currentPage,
  totalPages,
  paginatedItems,
  totalItems,
  startIndex,
  endIndex,
  isFirstPage,
  isLastPage,
  goToPage,
  nextPage,
  prevPage,
} = usePagination(sortedRisks, { pageSize: 5 })
</script>

<template>
  <div class="app">
    <header class="app__header">
      <h1 class="app__title">Risk Register</h1>
      <p class="app__subtitle">Programme PRG-4417</p>
    </header>
    <div class="app__layout">
      <FilterPanel
        :selected-severities="filters.severity"
        :selected-statuses="filters.status"
        :selected-owners="filters.owners"
        @toggle-severity="toggleSeverity"
        @toggle-status="toggleStatus"
        @toggle-owner="toggleOwner"
      />
      <main class="app__main">
        <ActiveFiltersBar
          :filters="activeFilters"
          @remove="removeFilter"
          @clear-all="clearAll"
        />
        <RiskTable
          v-if="sortedRisks.length > 0"
          :risks="paginatedItems"
          :sort-column="sortColumn"
          :sort-direction="sortDirection"
          @sort="toggleSort"
        />
        <EmptyState
          v-else-if="hasActiveFilters"
          @clear-filters="clearAll"
        />
        <PaginationControls
          v-if="totalItems > 0"
          :current-page="currentPage"
          :total-pages="totalPages"
          :start-index="startIndex"
          :end-index="endIndex"
          :total-items="totalItems"
          :is-first-page="isFirstPage"
          :is-last-page="isLastPage"
          @go-to-page="goToPage"
          @next="nextPage"
          @prev="prevPage"
        />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app {
  font-family: var(--font-family);
  color: var(--color-text);
  background-color: var(--color-surface-sunken);
  min-height: 100vh;
  padding: var(--space-6);
}

.app__header {
  margin-bottom: var(--space-5);
}

.app__title {
  font-size: 20px;
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  margin: 0;
}

.app__subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin: var(--space-1) 0 0;
}

.app__layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--space-5);
  align-items: start;
}

.app__main {
  min-width: 0;
}
</style>
