<script setup lang="ts">
import type { Risk, Status } from '@/types/risk'
import { formatCurrency, formatRelativeTime } from '@/utils/format'
import SeverityChip from '@/components/common/SeverityChip.vue'
import OwnerAvatar from '@/components/common/OwnerAvatar.vue'
import StatusEditor from '@/components/common/StatusEditor.vue'

defineProps<{
  risk: Risk
}>()

const emit = defineEmits<{
  updateStatus: [riskId: string, newStatus: Status]
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
      <StatusEditor
        :status="risk.status"
        :risk-id="risk.id"
        @update="(id, status) => emit('updateStatus', id, status)"
      />
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
  transition: background-color 0.15s ease;
}

.risk-row:hover {
  background-color: var(--color-surface-sunken);
}

.risk-row:nth-child(even) {
  background-color: rgba(246, 247, 249, 0.5);
}

.risk-row:nth-child(even):hover {
  background-color: var(--color-surface-sunken);
}

.risk-row:last-child {
  border-bottom: none;
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
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace;
  white-space: nowrap;
}

.risk-row__cell--title {
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: var(--font-weight-medium);
}

.risk-row__cell--number {
  text-align: right;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.risk-row__cell--updated {
  color: var(--color-text-muted);
  white-space: nowrap;
  font-size: var(--font-size-xs);
}
</style>
