<script setup lang="ts">
import type { SortColumn, SortDirection } from '@/types/risk'

const props = defineProps<{
  activeColumn: SortColumn | null
  direction: SortDirection
}>()

const emit = defineEmits<{
  sort: [column: SortColumn]
}>()

interface ColumnDef {
  key: string
  label: string
  sortable: boolean
  sortKey?: SortColumn
  align?: 'left' | 'right'
}

const columns: ColumnDef[] = [
  { key: 'id', label: 'ID', sortable: false },
  { key: 'title', label: 'Title', sortable: false },
  { key: 'severity', label: 'Severity', sortable: true, sortKey: 'severity' },
  { key: 'status', label: 'Status', sortable: true, sortKey: 'status' },
  { key: 'owner', label: 'Owner', sortable: false },
  { key: 'mitigations', label: 'Mitigations', sortable: false, align: 'right' },
  { key: 'costImpact', label: 'Cost Impact', sortable: true, sortKey: 'costImpact', align: 'right' },
  { key: 'updatedAt', label: 'Updated', sortable: true, sortKey: 'updatedAt' },
]

function getAriaSort(col: ColumnDef): 'ascending' | 'descending' | 'none' | undefined {
  if (!col.sortable || col.sortKey !== props.activeColumn) return undefined
  if (props.direction === 'asc') return 'ascending'
  if (props.direction === 'desc') return 'descending'
  return 'none'
}
</script>

<template>
  <thead>
    <tr>
      <th
        v-for="col in columns"
        :key="col.key"
        :class="[
          'table-header__cell',
          { 'table-header__cell--sortable': col.sortable },
          { 'table-header__cell--active': col.sortKey === activeColumn && direction !== 'none' },
          { 'table-header__cell--right': col.align === 'right' },
        ]"
        :aria-sort="getAriaSort(col)"
        scope="col"
      >
        <button
          v-if="col.sortable && col.sortKey"
          class="table-header__sort-btn"
          type="button"
          @click="emit('sort', col.sortKey)"
        >
          {{ col.label }}
          <span class="table-header__sort-icon" aria-hidden="true">
            <template v-if="col.sortKey === activeColumn && direction === 'asc'">&#9650;</template>
            <template v-else-if="col.sortKey === activeColumn && direction === 'desc'">&#9660;</template>
            <template v-else>&#9650;&#9660;</template>
          </span>
        </button>
        <span v-else>{{ col.label }}</span>
      </th>
    </tr>
  </thead>
</template>

<style scoped>
.table-header__cell {
  padding: var(--space-3) var(--space-4);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid var(--color-border);
  white-space: nowrap;
  user-select: none;
}

.table-header__cell--right {
  text-align: right;
}

.table-header__cell--active {
  color: var(--color-text);
  border-bottom-color: var(--color-accent);
}

.table-header__sort-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.table-header__sort-btn:hover {
  color: var(--color-text);
}

.table-header__sort-btn:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

.table-header__sort-icon {
  font-size: 8px;
  line-height: 1;
  opacity: 0.5;
}

.table-header__cell--active .table-header__sort-icon {
  opacity: 1;
}
</style>
