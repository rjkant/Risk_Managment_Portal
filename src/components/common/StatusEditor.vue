<script setup lang="ts">
import { ref } from 'vue'
import type { Status } from '@/types/risk'
import { capitalise } from '@/utils/format'

const props = defineProps<{
  status: Status
  riskId: string
}>()

const emit = defineEmits<{
  update: [riskId: string, newStatus: Status]
}>()

const isEditing = ref(false)

const statuses: Status[] = ['open', 'mitigating', 'accepted', 'closed']

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  const newStatus = target.value as Status
  emit('update', props.riskId, newStatus)
  isEditing.value = false
}

function openEditor() {
  isEditing.value = true
}

function handleBlur() {
  isEditing.value = false
}
</script>

<template>
  <div class="status-editor">
    <select
      v-if="isEditing"
      class="status-editor__select"
      :value="status"
      @change="handleChange"
      @blur="handleBlur"
    >
      <option
        v-for="s in statuses"
        :key="s"
        :value="s"
      >
        {{ capitalise(s) }}
      </option>
    </select>
    <button
      v-else
      class="status-editor__display"
      type="button"
      :title="'Click to change status'"
      @click="openEditor"
    >
      {{ capitalise(status) }}
      <span class="status-editor__icon" aria-hidden="true">&#9662;</span>
    </button>
  </div>
</template>

<style scoped>
.status-editor {
  display: inline-flex;
}

.status-editor__display {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 2px var(--space-2);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  font-family: var(--font-family);
  color: var(--color-text-muted);
  background-color: var(--color-surface-sunken);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: border-color 0.15s ease, background-color 0.15s ease;
}

.status-editor__display:hover {
  border-color: var(--color-accent);
  background-color: var(--color-surface);
}

.status-editor__display:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.status-editor__icon {
  font-size: 8px;
  opacity: 0.5;
}

.status-editor__display:hover .status-editor__icon {
  opacity: 1;
}

.status-editor__select {
  padding: 2px var(--space-2);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  font-family: var(--font-family);
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-accent);
  cursor: pointer;
}

.status-editor__select:focus {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
</style>
