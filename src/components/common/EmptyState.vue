<script setup lang="ts">
defineProps<{
  message?: string
}>()

const emit = defineEmits<{
  clearFilters: []
}>()
</script>

<template>
  <div class="empty-state">
    <p class="empty-state__message">{{ message ?? 'No risks match these filters' }}</p>
    <button
      class="empty-state__action"
      type="button"
      @click="emit('clearFilters')"
    >
      Clear filters
    </button>
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
  text-align: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
}

.empty-state__message {
  font-size: var(--font-size-md);
  color: var(--color-text-muted);
  margin: 0 0 var(--space-4);
}

.empty-state__action {
  padding: var(--space-2) var(--space-4);
  background: none;
  border: 1px solid var(--color-accent);
  border-radius: var(--radius-sm);
  color: var(--color-accent);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
}

.empty-state__action:hover {
  background-color: var(--color-accent);
  color: var(--color-text-inverse);
}

.empty-state__action:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
</style>
