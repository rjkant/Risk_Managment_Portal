<script setup lang="ts">
import { useRisks } from '@/composables/useRisks'
import { useFilters } from '@/composables/useFilters'
import { useSorting } from '@/composables/useSorting'
import RiskTable from '@/components/table/RiskTable.vue'
import FilterPanel from '@/components/filters/FilterPanel.vue'

const { risks } = useRisks()
const {
  filters,
  filteredRisks,
  toggleSeverity,
  toggleStatus,
  toggleOwner,
} = useFilters(risks)
const { sortColumn, sortDirection, sortedRisks, toggleSort } = useSorting(filteredRisks)
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
        <RiskTable
          :risks="sortedRisks"
          :sort-column="sortColumn"
          :sort-direction="sortDirection"
          @sort="toggleSort"
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
