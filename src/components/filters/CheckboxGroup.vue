<script setup lang="ts">
defineProps<{
  label: string
  options: { value: string; label: string }[]
  selected: Set<string>
}>()

const emit = defineEmits<{
  toggle: [value: string]
}>()
</script>

<template>
  <fieldset class="checkbox-group">
    <legend class="checkbox-group__label">{{ label }}</legend>
    <label
      v-for="option in options"
      :key="option.value"
      class="checkbox-group__option"
    >
      <input
        type="checkbox"
        class="checkbox-group__input"
        :checked="selected.has(option.value)"
        @change="emit('toggle', option.value)"
      />
      <span class="checkbox-group__text">{{ option.label }}</span>
    </label>
  </fieldset>
</template>

<style scoped>
.checkbox-group {
  border: none;
  padding: 0;
  margin: 0 0 var(--space-5);
}

.checkbox-group__label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-2);
  display: block;
}

.checkbox-group__option {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) 0;
  cursor: pointer;
  font-size: var(--font-size-sm);
}

.checkbox-group__input {
  width: 16px;
  height: 16px;
  accent-color: var(--color-accent);
  cursor: pointer;
  flex-shrink: 0;
}

.checkbox-group__text {
  line-height: var(--line-height-normal);
}
</style>
