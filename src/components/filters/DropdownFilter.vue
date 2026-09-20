<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  label: string
  options: { value: string; label: string }[]
  selected: Set<string>
}>()

const emit = defineEmits<{
  toggle: [value: string]
}>()

const open = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

function toggleOpen() {
  open.value = !open.value
}

function handleClickOutside(e: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <fieldset class="dropdown-filter" ref="dropdownRef">
    <legend class="dropdown-filter__label">{{ label }}</legend>
    <button
      class="dropdown-filter__trigger"
      type="button"
      :aria-expanded="open"
      @click="toggleOpen"
    >
      <span class="dropdown-filter__trigger-text">
        {{ selected.size === 0 ? 'All' : `${selected.size} selected` }}
      </span>
      <svg
        class="dropdown-filter__chevron"
        :class="{ 'dropdown-filter__chevron--open': open }"
        width="12" height="12" viewBox="0 0 12 12"
        fill="none" aria-hidden="true"
      >
        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div v-if="open" class="dropdown-filter__menu">
      <label
        v-for="option in options"
        :key="option.value"
        class="dropdown-filter__option"
      >
        <input
          type="checkbox"
          class="dropdown-filter__input"
          :checked="selected.has(option.value)"
          @change="emit('toggle', option.value)"
        />
        <span class="dropdown-filter__text">{{ option.label }}</span>
      </label>
    </div>
  </fieldset>
</template>

<style scoped>
.dropdown-filter {
  border: none;
  padding: 0;
  margin: 0 0 var(--space-5);
  position: relative;
}

.dropdown-filter__label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-2);
  display: block;
}

.dropdown-filter__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: var(--font-size-sm);
  font-family: var(--font-family);
  cursor: pointer;
  gap: var(--space-2);
}

.dropdown-filter__trigger:hover {
  border-color: var(--color-accent);
}

.dropdown-filter__trigger:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.dropdown-filter__trigger-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dropdown-filter__chevron {
  flex-shrink: 0;
  transition: transform 0.15s ease;
  color: var(--color-text-muted);
}

.dropdown-filter__chevron--open {
  transform: rotate(180deg);
}

.dropdown-filter__menu {
  position: absolute;
  top: calc(100% + var(--space-1));
  left: 0;
  right: 0;
  z-index: 10;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.1));
  padding: var(--space-1) 0;
  max-height: 200px;
  overflow-y: auto;
}

.dropdown-filter__option {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  cursor: pointer;
  font-size: var(--font-size-sm);
}

.dropdown-filter__option:hover {
  background-color: var(--color-surface-sunken);
}

.dropdown-filter__input {
  width: 16px;
  height: 16px;
  accent-color: var(--color-accent);
  cursor: pointer;
  flex-shrink: 0;
}

.dropdown-filter__text {
  line-height: var(--line-height-normal);
}
</style>
