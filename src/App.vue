<script setup lang="ts">
import { useRisks } from '@/composables/useRisks'
import { useSorting } from '@/composables/useSorting'
import RiskTable from '@/components/table/RiskTable.vue'

const { risks } = useRisks()
const { sortColumn, sortDirection, sortedRisks, toggleSort } = useSorting(risks)
</script>

<template>
  <div class="app">
    <header class="app__header">
      <h1 class="app__title">Risk Register</h1>
      <p class="app__subtitle">Programme PRG-4417</p>
    </header>
    <main class="app__content">
      <RiskTable
        :risks="sortedRisks"
        :sort-column="sortColumn"
        :sort-direction="sortDirection"
        @sort="toggleSort"
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
