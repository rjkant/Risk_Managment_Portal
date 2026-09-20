<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
  startIndex: number
  endIndex: number
  totalItems: number
  isFirstPage: boolean
  isLastPage: boolean
}>()

const emit = defineEmits<{
  goToPage: [page: number]
  next: []
  prev: []
}>()

/**
 * Generates a page-number array with ellipses (null) for large ranges.
 * Always shows first, last, and up to 2 neighbours of current page.
 */
function visiblePages(): (number | null)[] {
  const total = props.totalPages
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const pages: (number | null)[] = [1]
  const current = props.currentPage
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  if (start > 2) pages.push(null)
  for (let i = start; i <= end; i++) pages.push(i)
  if (end < total - 1) pages.push(null)
  pages.push(total)
  return pages
}
</script>

<template>
  <nav class="pagination" aria-label="Pagination">
    <p class="pagination__summary">
      Showing {{ startIndex + 1 }}–{{ endIndex }} of {{ totalItems }} risks
    </p>
    <div class="pagination__controls">
      <button
        class="pagination__btn"
        type="button"
        :disabled="isFirstPage"
        aria-label="Previous page"
        @click="emit('prev')"
      >
        ‹
      </button>
      <template v-for="(page, idx) in visiblePages()" :key="idx">
        <span v-if="page === null" class="pagination__ellipsis">…</span>
        <button
          v-else
          class="pagination__btn"
          :class="{ 'pagination__btn--active': page === currentPage }"
          type="button"
          :aria-label="`Page ${page}`"
          :aria-current="page === currentPage ? 'page' : undefined"
          @click="emit('goToPage', page)"
        >
          {{ page }}
        </button>
      </template>
      <button
        class="pagination__btn"
        type="button"
        :disabled="isLastPage"
        aria-label="Next page"
        @click="emit('next')"
      >
        ›
      </button>
    </div>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) 0;
  margin-top: var(--space-3);
}

.pagination__summary {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin: 0;
}

.pagination__controls {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.pagination__btn {
  min-width: 32px;
  height: 32px;
  padding: 0 var(--space-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: var(--font-size-sm);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.pagination__btn:hover:not(:disabled) {
  background-color: var(--color-surface-sunken);
}

.pagination__btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination__btn--active {
  background-color: var(--color-accent);
  color: var(--color-text-inverse);
  border-color: var(--color-accent);
}

.pagination__btn--active:hover {
  background-color: var(--color-accent-hover);
}

.pagination__btn:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.pagination__ellipsis {
  min-width: 24px;
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

/* ---- Mobile: <= 860px ---- */
@media (max-width: 860px) {
  .pagination {
    flex-direction: column;
    gap: var(--space-3);
    align-items: stretch;
    text-align: center;
  }

  .pagination__controls {
    justify-content: center;
  }
}

/* ---- Compact: <= 480px ---- */
@media (max-width: 480px) {
  .pagination__btn {
    min-width: 28px;
    height: 28px;
    font-size: var(--font-size-xs);
  }
}
</style>
