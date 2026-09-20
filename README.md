# Risk Register

Risk register table for engineering programme managers. Vue 3 + TypeScript + Vite.

## Setup

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## What's in here

Table view with sortable columns (severity, status, cost, updated), a filter sidebar (severity / status / owner checkboxes), active filter chips, pagination, and inline status editing.

Data comes from `src/data/risks.json` — imported directly, no backend needed. The `useRisks` composable normalises the inconsistent API data on load (casing issues, unknown severity values, missing fields).

### Structure

```
src/
  composables/    useRisks, useFilters, useSorting, usePagination
  components/
    common/       SeverityChip, OwnerAvatar, StatusEditor, FilterChip, etc.
    filters/      FilterPanel, CheckboxGroup
    table/        RiskTable, RiskTableHeader, RiskTableRow
  types/          TypeScript interfaces
  utils/          severity normalisation, currency/date formatting
  data/           risks.json, mock owners
```

The composables chain together: `useRisks → useFilters → useSorting → usePagination → template`. Each one takes a reactive risk array and returns a new one plus its own state.

## Decisions

See [DECISIONS.md](./DECISIONS.md) for what I built, what I cut, and why.
