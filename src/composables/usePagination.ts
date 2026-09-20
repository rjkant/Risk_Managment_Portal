import { computed, ref, watch, type Ref } from 'vue'

interface UsePaginationOptions {
  pageSize?: number
}

interface UsePaginationReturn {
  currentPage: Ref<number>
  pageSize: Ref<number>
  totalPages: Ref<number>
  paginatedItems: Ref<Risk[]>
  totalItems: Ref<number>
  startIndex: Ref<number>
  endIndex: Ref<number>
  goToPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
  isFirstPage: Ref<boolean>
  isLastPage: Ref<boolean>
}

import type { Risk } from '@/types/risk'

export function usePagination(
  items: Ref<Risk[]>,
  options: UsePaginationOptions = {},
): UsePaginationReturn {
  const pageSize = ref(options.pageSize ?? 5)
  const currentPage = ref(1)

  const totalItems = computed(() => items.value.length)
  const totalPages = computed(() => Math.max(1, Math.ceil(totalItems.value / pageSize.value)))

  /* Reset to page 1 when the source list changes (filter / sort) */
  watch(
    () => items.value.length,
    () => {
      currentPage.value = 1
    },
  )

  const startIndex = computed(() => (currentPage.value - 1) * pageSize.value)
  const endIndex = computed(() => Math.min(startIndex.value + pageSize.value, totalItems.value))

  const paginatedItems = computed(() =>
    items.value.slice(startIndex.value, endIndex.value),
  )

  function goToPage(page: number) {
    const clamped = Math.max(1, Math.min(page, totalPages.value))
    currentPage.value = clamped
  }

  function nextPage() {
    goToPage(currentPage.value + 1)
  }

  function prevPage() {
    goToPage(currentPage.value - 1)
  }

  const isFirstPage = computed(() => currentPage.value === 1)
  const isLastPage = computed(() => currentPage.value >= totalPages.value)

  return {
    currentPage,
    pageSize,
    totalPages,
    paginatedItems,
    totalItems,
    startIndex,
    endIndex,
    goToPage,
    nextPage,
    prevPage,
    isFirstPage,
    isLastPage,
  }
}
