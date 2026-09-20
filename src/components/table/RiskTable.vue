<script setup lang="ts">
import type { Risk, SortColumn, SortDirection } from '@/types/risk'
import RiskTableHeader from './RiskTableHeader.vue'
import RiskTableRow from './RiskTableRow.vue'

defineProps<{
  risks: Risk[]
  sortColumn: SortColumn | null
  sortDirection: SortDirection
}>()

const emit = defineEmits<{
  sort: [column: SortColumn]
}>()
</script>

<template>
  <div class="risk-table-wrapper">
    <table class="risk-table">
      <RiskTableHeader
        :active-column="sortColumn"
        :direction="sortDirection"
        @sort="emit('sort', $event)"
      />
      <tbody>
        <RiskTableRow
          v-for="risk in risks"
          :key="risk.id"
          :risk="risk"
        />
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.risk-table-wrapper {
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.risk-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-family);
}
</style>
