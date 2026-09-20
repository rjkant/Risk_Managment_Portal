<script setup lang="ts">
import type { Risk } from '@/types/risk'
import { capitalise, formatCurrency, formatRelativeTime } from '@/utils/format'
import SeverityChip from '@/components/common/SeverityChip.vue'
import OwnerAvatar from '@/components/common/OwnerAvatar.vue'

defineProps<{
  risk: Risk
}>()
</script>

<template>
  <tr class="risk-row">
    <td class="risk-row__cell risk-row__cell--id">{{ risk.id }}</td>
    <td class="risk-row__cell risk-row__cell--title" :title="risk.title">
      {{ risk.title }}
    </td>
    <td class="risk-row__cell">
      <SeverityChip :severity="risk.severity" />
    </td>
    <td class="risk-row__cell">
      {{ capitalise(risk.status) }}
    </td>
    <td class="risk-row__cell">
      <OwnerAvatar :owner-id="risk.ownerId" />
    </td>
    <td class="risk-row__cell risk-row__cell--number">
      {{ risk.mitigationCount }}
    </td>
    <td class="risk-row__cell risk-row__cell--number">
      {{ formatCurrency(risk.costImpactEur) }}
    </td>
    <td class="risk-row__cell risk-row__cell--updated">
      {{ formatRelativeTime(risk.updatedAt) }}
    </td>
  </tr>
</template>

<style scoped>
.risk-row {
  border-bottom: 1px solid var(--color-border);
}

.risk-row__cell {
  padding: var(--space-3) var(--space-4);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
  vertical-align: middle;
}

.risk-row__cell--id {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  white-space: nowrap;
}

.risk-row__cell--title {
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.risk-row__cell--number {
  text-align: right;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.risk-row__cell--updated {
  color: var(--color-text-muted);
  white-space: nowrap;
}
</style>
