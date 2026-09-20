<script setup lang="ts">
import { ref } from 'vue'
import { useRisks } from '@/composables/useRisks'
import { useFilters } from '@/composables/useFilters'
import { useSorting } from '@/composables/useSorting'
import { usePagination } from '@/composables/usePagination'
import { useQuerySync } from '@/composables/useQuerySync'
import { useTheme } from '@/composables/useTheme'
import RiskTable from '@/components/table/RiskTable.vue'
import FilterPanel from '@/components/filters/FilterPanel.vue'
import ActiveFiltersBar from '@/components/common/ActiveFiltersBar.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import PaginationControls from '@/components/common/PaginationControls.vue'

const { risks, updateRiskStatus } = useRisks()
const {
  filters,
  activeFilters,
  filteredRisks,
  hasActiveFilters,
  toggleSeverity,
  toggleStatus,
  toggleOwner,
  removeFilter,
  clearAll,
} = useFilters(risks)
const { sortColumn, sortDirection, sortedRisks, toggleSort } = useSorting(filteredRisks)
const {
  currentPage,
  totalPages,
  paginatedItems,
  totalItems,
  startIndex,
  endIndex,
  isFirstPage,
  isLastPage,
  goToPage,
  nextPage,
  prevPage,
} = usePagination(sortedRisks, { pageSize: 5 })

const { theme, toggleTheme } = useTheme()

useQuerySync({
  filters,
  toggleSeverity,
  toggleStatus,
  toggleOwner,
  sortColumn,
  sortDirection,
  toggleSort,
  currentPage,
  goToPage,
})

const filtersOpen = ref(false)

function openFilters() {
  filtersOpen.value = true
}

function closeFilters() {
  filtersOpen.value = false
}
</script>

<template>
  <div class="app">
    <header class="app__header">
      <div class="app__header-row">
        <div>
          <h1 class="app__title">Risk Register</h1>
          <p class="app__subtitle">Programme PRG-4417</p>
        </div>
        <div class="app__header-actions">
          <button
            class="app__theme-toggle"
            type="button"
            :aria-label="theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
            @click="toggleTheme"
          >
            <svg v-if="theme === 'light'" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M14 9.6A6 6 0 0 1 6.4 2 6 6 0 1 0 14 9.6Z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button
            class="app__filter-toggle"
            type="button"
            :aria-expanded="filtersOpen"
            aria-controls="filter-drawer"
            @click="openFilters"
          >
            <svg class="app__filter-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M1 3h14M4 8h8M6 13h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            Filters
            <span v-if="activeFilters.length > 0" class="app__filter-badge">{{ activeFilters.length }}</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Backdrop for mobile drawer -->
    <Transition name="fade">
      <div
        v-if="filtersOpen"
        class="app__backdrop"
        @click="closeFilters"
      />
    </Transition>

    <div class="app__layout">
      <div
        id="filter-drawer"
        class="app__sidebar"
        :class="{ 'app__sidebar--open': filtersOpen }"
      >
        <div class="app__drawer-header">
          <h2 class="app__drawer-title">Filters</h2>
          <button
            class="app__drawer-close"
            type="button"
            aria-label="Close filters"
            @click="closeFilters"
          >
            &times;
          </button>
        </div>
        <FilterPanel
          :selected-severities="filters.severity"
          :selected-statuses="filters.status"
          :selected-owners="filters.owners"
          @toggle-severity="toggleSeverity"
          @toggle-status="toggleStatus"
          @toggle-owner="toggleOwner"
        />
      </div>
      <main class="app__main">
        <ActiveFiltersBar
          :filters="activeFilters"
          @remove="removeFilter"
          @clear-all="clearAll"
        />
        <RiskTable
          v-if="sortedRisks.length > 0"
          :risks="paginatedItems"
          :sort-column="sortColumn"
          :sort-direction="sortDirection"
          @sort="toggleSort"
          @update-status="updateRiskStatus"
        />
        <EmptyState
          v-else-if="hasActiveFilters"
          @clear-filters="clearAll"
        />
        <PaginationControls
          v-if="totalItems > 0"
          :current-page="currentPage"
          :total-pages="totalPages"
          :start-index="startIndex"
          :end-index="endIndex"
          :total-items="totalItems"
          :is-first-page="isFirstPage"
          :is-last-page="isLastPage"
          @go-to-page="goToPage"
          @next="nextPage"
          @prev="prevPage"
        />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app {
  font-family: var(--font-family);
  color: var(--color-text);
  background-color: var(--color-surface-sunken);
  min-height: 100vh;
  padding: var(--space-6);
}

.app__header {
  margin-bottom: var(--space-5);
}

.app__header-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
}

.app__title {
  font-size: 20px;
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  margin: 0;
}

.app__subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin: var(--space-1) 0 0;
}

/* Filter toggle — hidden on desktop, shown on mobile */
.app__filter-toggle {
  display: none;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: var(--font-size-sm);
  font-family: var(--font-family);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
}

.app__filter-toggle:hover {
  border-color: var(--color-accent);
  background-color: var(--color-surface-sunken);
}

.app__filter-toggle:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.app__filter-icon {
  flex-shrink: 0;
}

.app__filter-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: var(--radius-pill);
  background-color: var(--color-accent);
  color: var(--color-text-inverse);
  font-size: 11px;
  font-weight: var(--font-weight-semibold);
  line-height: 1;
}

/* Backdrop — mobile only */
.app__backdrop {
  display: none;
}

/* Drawer header — mobile only */
.app__drawer-header {
  display: none;
}

.app__header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-shrink: 0;
}

.app__theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text-muted);
  cursor: pointer;
}

.app__theme-toggle:hover {
  border-color: var(--color-accent);
  color: var(--color-text);
}

.app__theme-toggle:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.app__layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--space-5);
  align-items: start;
}

.app__main {
  min-width: 0;
}

/* ---- Tablet: <= 1024px ---- */
@media (max-width: 1024px) {
  .app__layout {
    grid-template-columns: 240px 1fr;
    gap: var(--space-4);
  }
}

/* ---- Mobile / small tablet: <= 860px ---- */
@media (max-width: 860px) {
  .app {
    padding: var(--space-4);
  }

  .app__filter-toggle {
    display: inline-flex;
  }

  .app__layout {
    grid-template-columns: 1fr;
  }

  /* Slide-in drawer */
  .app__sidebar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    width: 280px;
    max-width: 80vw;
    height: 100vh;
    height: 100dvh;
    background-color: var(--color-surface);
    box-shadow: var(--shadow-lg, 0 10px 25px rgba(0, 0, 0, 0.15));
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    overflow-y: auto;
    padding: var(--space-4) var(--space-5);
  }

  .app__sidebar--open {
    transform: translateX(0);
  }

  /* Strip FilterPanel card styling inside drawer */
  .app__sidebar > :deep(.filter-panel) {
    border: none;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    background: transparent;
  }

  /* Drawer header */
  .app__drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-4);
    padding-bottom: var(--space-3);
    border-bottom: 1px solid var(--color-border);
  }

  .app__drawer-title {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-semibold);
    margin: 0;
  }

  .app__drawer-close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: var(--radius-sm);
    background: none;
    color: var(--color-text-muted);
    font-size: 20px;
    cursor: pointer;
  }

  .app__drawer-close:hover {
    background-color: var(--color-surface-sunken);
    color: var(--color-text);
  }

  .app__drawer-close:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  /* Backdrop overlay */
  .app__backdrop {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.3);
  }

  /* Backdrop transition */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}

/* ---- Compact mobile: <= 480px ---- */
@media (max-width: 480px) {
  .app {
    padding: var(--space-3);
  }

  .app__title {
    font-size: 18px;
  }
}
</style>
