<script setup lang="ts">
import { useRisks } from '@/composables/useRisks'
import type { SortColumn, SortDirection } from '@/types/risk'
import { ref } from 'vue'
import RiskTable from '@/components/table/RiskTable.vue'

const { risks } = useRisks()

const sortColumn = ref<SortColumn | null>(null)
const sortDirection = ref<SortDirection>('none')

function handleSort(column: SortColumn) {
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
</script>

<template>
  <div class="app">
    <header class="app__header">
      <h1 class="app__title">Risk Register</h1>
      <p class="app__subtitle">Programme PRG-4417</p>
    </header>
    <main class="app__content">
      <RiskTable
        :risks="risks"
        :sort-column="sortColumn"
        :sort-direction="sortDirection"
        @sort="handleSort"
      />
    </main>
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

.app__content {
  max-width: 1400px;
}
</style>
