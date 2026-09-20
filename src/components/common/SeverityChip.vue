<script setup lang="ts">
import type { Severity } from '@/types/risk'
import { SEVERITY_LABELS } from '@/utils/severity'

const props = defineProps<{
  severity: Severity
}>()

const label = SEVERITY_LABELS[props.severity]
</script>

<template>
  <span :class="['severity-chip', `severity-chip--${severity}`]">
    {{ label }}
  </span>
</template>

<style scoped>
.severity-chip {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-pill);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  white-space: nowrap;
}

.severity-chip--critical {
  color: var(--color-critical);
  background-color: var(--color-critical-bg);
}

.severity-chip--high {
  color: var(--color-high);
  background-color: var(--color-high-bg);
}

.severity-chip--medium {
  color: var(--color-medium);
  background-color: var(--color-medium-bg);
}

.severity-chip--low {
  color: var(--color-low);
  background-color: var(--color-low-bg);
}

.severity-chip--unknown {
  color: var(--color-text-muted);
  background-color: var(--color-surface-sunken);
}
</style>
