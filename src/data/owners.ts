import type { Owner } from '@/types/risk'

/**
 * Mock owner lookup.
 *
 * In production, this would come from a `/users` endpoint or be embedded
 * in the risk API response. Flagged in DECISIONS.md as an API gap.
 */
const OWNERS: Record<string, Owner> = {
  usr_8831: { id: 'usr_8831', name: 'Aoife Murphy', initials: 'AM' },
  usr_2210: { id: 'usr_2210', name: 'Liam Chen', initials: 'LC' },
  usr_5502: { id: 'usr_5502', name: 'Priya Sharma', initials: 'PS' },
  usr_9014: { id: 'usr_9014', name: 'Marcus Weber', initials: 'MW' },
}

const UNKNOWN_OWNER: Owner = { id: 'unknown', name: 'Unknown', initials: '??' }

export function getOwner(ownerId: string): Owner {
  return OWNERS[ownerId] ?? UNKNOWN_OWNER
}

export function getAllOwners(): Owner[] {
  return Object.values(OWNERS)
}
