<script setup lang="ts">
import type { Risk, SortColumn, SortDirection, Status } from '@/types/risk'
import RiskTableHeader from './RiskTableHeader.vue'
import RiskTableRow from './RiskTableRow.vue'

defineProps<{
  risks: Risk[]
  sortColumn: SortColumn | null
  sortDirection: SortDirection
}>()

const emit = defineEmits<{
  sort: [column: SortColumn]
  updateStatus: [riskId: string, newStatus: Status]
}>()
</script>

<template>
  <div class="risk-table-wrapper">
    <table class="risk-table" role="grid">
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
          @update-status="(id, status) => emit('updateStatus', id, status)"
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
  table-layout: auto;
}

/* Scrollbar styling for overflow */
.risk-table-wrapper::-webkit-scrollbar {
  height: 6px;
}

.risk-table-wrapper::-webkit-scrollbar-track {
  background: var(--color-surface-sunken);
  border-radius: 3px;
}

.risk-table-wrapper::-webkit-scrollbar-thumb {
  background: var(--color-border-strong);
  border-radius: 3px;
}
</style>
