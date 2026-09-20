<script setup lang="ts">
import type { ActiveFilter } from '@/composables/useFilters'
import FilterChip from './FilterChip.vue'

defineProps<{
  filters: ActiveFilter[]
}>()

const emit = defineEmits<{
  remove: [filter: ActiveFilter]
  clearAll: []
}>()
</script>

<template>
  <div v-if="filters.length > 0" class="active-filters">
    <FilterChip
      v-for="(filter, index) in filters"
      :key="`${filter.type}-${filter.value}-${index}`"
      :label="filter.label"
      @remove="emit('remove', filter)"
    />
    <button
      v-if="filters.length > 1"
      class="active-filters__clear"
      type="button"
      @click="emit('clearAll')"
    >
      Clear all
    </button>
  </div>
</template>

<style scoped>
.active-filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.active-filters__clear {
  padding: var(--space-1) var(--space-2);
  background: none;
  border: none;
  color: var(--color-accent);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
}

.active-filters__clear:hover {
  color: var(--color-accent-hover);
  text-decoration: underline;
}

.active-filters__clear:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
</style>
