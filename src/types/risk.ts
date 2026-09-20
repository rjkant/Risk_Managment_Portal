export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'unknown'

export type Status = 'open' | 'mitigating' | 'accepted' | 'closed'

export type SortDirection = 'asc' | 'desc' | 'none'

export type SortColumn = 'severity' | 'status' | 'costImpact' | 'updatedAt'

export interface Owner {
  id: string
  name: string
  initials: string
}

export interface Risk {
  id: string
  title: string
  severity: Severity
  status: Status
  ownerId: string
  mitigationCount: number
  costImpactEur: number
  updatedAt: string
}

export interface RiskApiResponse {
  programme_id: string
  page: number
  page_size: number
  risks: RiskApiItem[]
}

export interface RiskApiItem {
  id: string
  title: string
  severity: string
  status: string
  owner_id: string
  mitigation_count: number
  cost_impact_eur: number
  updated_at: string
}
