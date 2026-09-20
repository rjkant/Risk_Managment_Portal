<script setup lang="ts">
import type { Severity, Status } from '@/types/risk'
import { getAllOwners } from '@/data/owners'
import CheckboxGroup from './CheckboxGroup.vue'

defineProps<{
  selectedSeverities: Set<Severity>
  selectedStatuses: Set<Status>
  selectedOwners: Set<string>
}>()

const emit = defineEmits<{
  toggleSeverity: [value: Severity]
  toggleStatus: [value: Status]
  toggleOwner: [value: string]
}>()

const severityOptions = [
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
]

const statusOptions = [
  { value: 'open', label: 'Open' },
  { value: 'mitigating', label: 'Mitigating' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'closed', label: 'Closed' },
]

const ownerOptions = getAllOwners().map((o) => ({
  value: o.id,
  label: o.name,
}))
</script>

<template>
  <aside class="filter-panel">
    <h2 class="filter-panel__title">Filters</h2>

    <CheckboxGroup
      label="Severity"
      :options="severityOptions"
      :selected="(selectedSeverities as Set<string>)"
      @toggle="emit('toggleSeverity', $event as Severity)"
    />

    <CheckboxGroup
      label="Status"
      :options="statusOptions"
      :selected="(selectedStatuses as Set<string>)"
      @toggle="emit('toggleStatus', $event as Status)"
    />

    <CheckboxGroup
      label="Owner"
      :options="ownerOptions"
      :selected="selectedOwners"
      @toggle="emit('toggleOwner', $event)"
    />
  </aside>
</template>

<style scoped>
.filter-panel {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-5);
  box-shadow: var(--shadow-sm);
}

.filter-panel__title {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  margin: 0 0 var(--space-5);
}
</style>
