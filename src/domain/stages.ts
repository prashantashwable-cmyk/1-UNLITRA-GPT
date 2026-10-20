import type { Stage } from './types';

/** All stages in lifecycle order. */
export const STAGES: Stage[] = [
  'lead_new',
  'lead_correction',
  'lead_review',
  'contacted',
  'requirements',
  'quotation',
  'negotiation',
  'follow_up',
  'lost',
  'agreement',
  'token_payment',
  'site_prep',
  'site_qc',
  'site_corrections',
  'material_prep',
  'in_transit',
  'material_arrived',
  'material_handover',
  'installation',
  'final_qc',
  'install_corrections',
  'handover',
  'amc',
];

/** Allowed stage transitions. Every stage change in the system goes through this table. */
export const EDGES: Record<Stage, Stage[]> = {
  lead_new: ['lead_review', 'lead_correction', 'lost'],
  lead_correction: ['lead_new', 'lost'],
  lead_review: ['contacted', 'follow_up', 'lost'],
  contacted: ['requirements', 'follow_up', 'lost'],
  requirements: ['quotation', 'follow_up', 'lost'],
  quotation: ['negotiation', 'agreement', 'follow_up', 'lost'],
  negotiation: ['quotation', 'agreement', 'follow_up', 'lost'],
  follow_up: ['lead_review', 'contacted', 'requirements', 'quotation', 'negotiation', 'lost'],
  lost: ['lead_review'],
  agreement: ['token_payment'],
  token_payment: ['site_prep'],
  site_prep: ['site_qc'],
  site_qc: ['site_corrections', 'material_prep'],
  site_corrections: ['site_qc'],
  material_prep: ['in_transit'],
  in_transit: ['material_arrived'],
  material_arrived: ['material_handover'],
  material_handover: ['installation'],
  installation: ['final_qc'],
  final_qc: ['install_corrections', 'handover'],
  install_corrections: ['final_qc'],
  handover: ['amc'],
  amc: [],
};

/** Customer-friendly milestones used by the stage tracker on every project screen. */
export type Milestone =
  | 'm_found'
  | 'm_sales'
  | 'm_quote'
  | 'm_agreement'
  | 'm_site'
  | 'm_material'
  | 'm_install'
  | 'm_final_qc'
  | 'm_handover'
  | 'm_service';

export const MILESTONES: { key: Milestone; stages: Stage[] }[] = [
  { key: 'm_found', stages: ['lead_new', 'lead_correction'] },
  { key: 'm_sales', stages: ['lead_review', 'contacted', 'requirements'] },
  { key: 'm_quote', stages: ['quotation', 'negotiation', 'follow_up'] },
  { key: 'm_agreement', stages: ['agreement', 'token_payment'] },
  { key: 'm_site', stages: ['site_prep', 'site_qc', 'site_corrections'] },
  { key: 'm_material', stages: ['material_prep', 'in_transit', 'material_arrived', 'material_handover'] },
  { key: 'm_install', stages: ['installation'] },
  { key: 'm_final_qc', stages: ['final_qc', 'install_corrections'] },
  { key: 'm_handover', stages: ['handover'] },
  { key: 'm_service', stages: ['amc'] },
];

export function milestoneIndex(stage: Stage): number {
  return MILESTONES.findIndex((m) => m.stages.includes(stage));
}

/** Sales pipeline buckets (spec §7): New → Review → Contacted → Requirements → Quotation → Negotiation → Won/Lost/Follow-up. */
export type Pipeline = 'new' | 'review' | 'contacted' | 'requirements' | 'quotation' | 'negotiation' | 'follow_up' | 'won' | 'lost';

export const PIPELINE: Pipeline[] = ['new', 'review', 'contacted', 'requirements', 'quotation', 'negotiation', 'follow_up', 'won', 'lost'];

export function pipelineOf(stage: Stage): Pipeline {
  switch (stage) {
    case 'lead_new':
    case 'lead_correction':
      return 'new';
    case 'lead_review':
      return 'review';
    case 'contacted':
      return 'contacted';
    case 'requirements':
      return 'requirements';
    case 'quotation':
      return 'quotation';
    case 'negotiation':
      return 'negotiation';
    case 'follow_up':
      return 'follow_up';
    case 'lost':
      return 'lost';
    default:
      return 'won';
  }
}

export const SALES_STAGES: Stage[] = ['lead_review', 'contacted', 'requirements', 'quotation', 'negotiation', 'follow_up'];

export function isWon(stage: Stage): boolean {
  return pipelineOf(stage) === 'won';
}

/** Stages after which the customer has a signed commercial relationship. */
export function isAfter(stage: Stage, reference: Stage): boolean {
  return STAGES.indexOf(stage) > STAGES.indexOf(reference);
}

/** Visual tone of each stage — always shown together with words and an icon, never colour alone. */
export type Tone = 'info' | 'waiting' | 'action' | 'success' | 'danger' | 'neutral';

export function stageTone(stage: Stage): Tone {
  switch (stage) {
    case 'lost':
      return 'neutral';
    case 'lead_correction':
    case 'site_corrections':
    case 'install_corrections':
      return 'danger';
    case 'amc':
      return 'success';
    case 'follow_up':
      return 'waiting';
    default:
      return 'info';
  }
}
