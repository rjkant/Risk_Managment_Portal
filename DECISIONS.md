# Decisions

## What I built

- Table with all 8 columns from the spec, including severity chips and owner avatars
- Sorting on severity, status, cost impact, and updated (tri-state cycling)
- Filter panel with checkboxes for severity, status, and owner
- Active filter chips above the table with clear-all
- Pagination (5 per page) with page numbers and "Showing X–Y of Z"
- Inline status editing — click the status to get a dropdown
- Empty state when filters match nothing
- Basic responsive layout (sidebar stacks below 860px)

## What I cut and why

**Grouping by owner** — it's a nice-to-have but the filter-by-owner already lets you focus on one person's risks. Building collapsible group headers with counts would have taken another hour and I wanted the core flow solid first.

**10k row virtualisation** — with 12 sample rows there's nothing to demonstrate. In production I'd reach for `vue-virtual-scroller` — it drops into the existing table structure without changing the composables. Flagged this in the "what I'd add" section below.

**Loading skeletons** — since we're importing JSON directly there's no async loading to skeleton over. In a real app with `fetch()` I'd add a `loading` ref in `useRisks` and render skeleton rows while it's true.

**Owner dropdown in filters** — the spec says "multi-select dropdown" but with only 4 mock owners, checkboxes felt more honest. A proper dropdown would need a search input and virtual scrolling for a real user list.

## API issues I'd raise with backend

The `risks.json` response has a few things that would trip up a production frontend:

1. **Inconsistent severity casing** — some items say "Critical", others "critical" or "HIGH". I normalise everything to lowercase in `useRisks` but this should be consistent from the API.
2. **"Moderate" isn't a valid severity** — item RSK-1049 has `severity: "Moderate"`. I mapped it to "medium" but we should agree on the canonical values.
3. **Empty severity** — RSK-1055 has `severity: ""`. I fall back to "unknown" but the API shouldn't return empty strings.
4. **No owner details** — we only get `owner_id`, not names or avatars. I mocked 4 owners locally but we'd need a `/users` endpoint or the owner object embedded in the response.
5. **No `total_count`** — pagination needs the total number of items. Right now I'm computing it client-side from the array length, but with server-side pagination we'd need this in the response.

## Assumptions

- EUR currency for cost impact (the sample data looks EU-based)
- 5 items per page is reasonable for a dense table — would make this configurable in prod
- "Updated" shows relative time (e.g. "3 days ago") rather than absolute dates — matches the spec
- Severity sort order is critical > high > medium > low > unknown (domain-specific, not alphabetical)

## Design system vs app-specific

**Would go in a shared design system:** SeverityChip, FilterChip, CheckboxGroup, PaginationControls, the tokens.css file, base.css reset, OwnerAvatar (generalised to UserAvatar)

**Stays app-specific:** RiskTable and its sub-components, the composables (useRisks, useFilters, useSorting), StatusEditor (too domain-coupled), the data normalisation logic

## What I'd add with more time

- Virtual scrolling for 10k+ rows
- Vitest unit tests for the composables (they're pure functions, easy to test)
- Playwright e2e for the filter→sort→paginate flow
- URL query param sync so filter state survives page refresh
- Dark mode (the token layer is already set up for it)
