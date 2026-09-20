<script setup lang="ts">
defineProps<{
  label: string
}>()

const emit = defineEmits<{
  remove: []
}>()
</script>

<template>
  <span class="filter-chip">
    <span class="filter-chip__label">{{ label }}</span>
    <button
      class="filter-chip__remove"
      type="button"
      :aria-label="`Remove filter: ${label}`"
      @click="emit('remove')"
    >
      &times;
    </button>
  </span>
</template>

<style scoped>
.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-tight);
}

.filter-chip__label {
  color: var(--color-text);
}

.filter-chip__remove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  background: none;
  color: var(--color-text-muted);
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  border-radius: 50%;
}

.filter-chip__remove:hover {
  color: var(--color-text);
  background-color: var(--color-surface-sunken);
}

.filter-chip__remove:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 1px;
}
</style>
