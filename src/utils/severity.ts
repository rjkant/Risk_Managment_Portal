import type { Severity } from '@/types/risk'

const SEVERITY_ALIASES: Record<string, Severity> = {
  critical: 'critical',
  high: 'high',
  medium: 'medium',
  moderate: 'medium',
  low: 'low',
}

export const SEVERITY_ORDER: Record<Severity, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
  unknown: 4,
}

export const SEVERITY_LABELS: Record<Severity, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
  unknown: 'Unknown',
}

export function normalizeSeverity(raw: string): Severity {
  if (!raw || raw.trim() === '') return 'unknown'
  return SEVERITY_ALIASES[raw.toLowerCase()] ?? 'unknown'
}

export function compareSeverity(a: Severity, b: Severity): number {
  return SEVERITY_ORDER[a] - SEVERITY_ORDER[b]
}
