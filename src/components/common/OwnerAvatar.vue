<script setup lang="ts">
import { computed } from 'vue'
import { getOwner } from '@/data/owners'

const props = defineProps<{
  ownerId: string
}>()

const owner = computed(() => getOwner(props.ownerId))

/**
 * Generate a consistent background colour from the owner's name.
 * Simple hash to pick from a set of muted colours.
 */
const avatarColor = computed(() => {
  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f97316', '#14b8a6', '#3b82f6']
  let hash = 0
  for (const char of owner.value.name) {
    hash = char.charCodeAt(0) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
})
</script>

<template>
  <span class="owner-cell">
    <span
      class="owner-avatar"
      :style="{ backgroundColor: avatarColor }"
      :title="owner.name"
    >
      {{ owner.initials }}
    </span>
    <span class="owner-name">{{ owner.name }}</span>
  </span>
</template>

<style scoped>
.owner-cell {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.owner-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: var(--color-text-inverse);
  font-size: 10px;
  font-weight: var(--font-weight-semibold);
  flex-shrink: 0;
}

.owner-name {
  font-size: var(--font-size-sm);
  white-space: nowrap;
}
</style>
