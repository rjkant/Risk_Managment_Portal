import { ref, type Ref } from 'vue'
import type { Risk, RiskApiItem, Status } from '@/types/risk'
import { normalizeSeverity } from '@/utils/severity'
import risksData from '@/data/risks.json'

function normalizeStatus(raw: string): Status {
  const lower = raw.toLowerCase()
  const validStatuses: Status[] = ['open', 'mitigating', 'accepted', 'closed']
  return validStatuses.includes(lower as Status) ? (lower as Status) : 'open'
}

function mapApiItemToRisk(item: RiskApiItem): Risk {
  return {
    id: item.id,
    title: item.title,
    severity: normalizeSeverity(item.severity),
    status: normalizeStatus(item.status),
    ownerId: item.owner_id,
    mitigationCount: item.mitigation_count,
    costImpactEur: item.cost_impact_eur,
    updatedAt: item.updated_at,
  }
}

interface UseRisksReturn {
  risks: Ref<Risk[]>
  updateRiskStatus: (riskId: string, newStatus: Status) => void
}

export function useRisks(): UseRisksReturn {
  const apiItems = risksData.risks as RiskApiItem[]
  const risks = ref<Risk[]>(apiItems.map(mapApiItemToRisk))

  function updateRiskStatus(riskId: string, newStatus: Status) {
    const index = risks.value.findIndex((r) => r.id === riskId)
    if (index !== -1) {
      risks.value[index] = { ...risks.value[index], status: newStatus }
    }
  }

  return { risks, updateRiskStatus }
}
