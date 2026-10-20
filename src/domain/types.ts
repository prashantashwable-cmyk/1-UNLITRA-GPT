// Domain model for AIEC Elevator OS (spec §23). One database, one project record per project ID,
// one stage machine. Every screen, dashboard, map and chat reads from this same data.

import type { Lang } from '../i18n/core';

export type Role =
  | 'rider'
  | 'sales'
  | 'qc'
  | 'supplier'
  | 'technician'
  | 'customer'
  | 'finance'
  | 'admin'
  | 'owner';

export const ROLES: Role[] = ['rider', 'sales', 'qc', 'supplier', 'technician', 'customer', 'finance', 'admin', 'owner'];

export type Workspace = 'live' | 'practice';

export interface User {
  id: string;
  name: string;
  phone: string;
  role: Role;
  pinSalt: string;
  pinHash: string;
  language: Lang;
  active: boolean;
  area?: string;
  skills: string[];
  /** Tasks this person is verified/authorised to perform (spec §15). */
  authorisedTasks: string[];
  trainingCompleted: Record<string, number>;
  documents: { id: string; label: string; verified: boolean }[];
  availability: 'available' | 'busy' | 'leave';
  onboarding: 'applied' | 'training' | 'verified' | 'active';
  supplierCompany?: string;
  createdAt: number;
  consentAt?: number;
  mustChangePin?: boolean;
}

// ---------------------------------------------------------------------------
// Project stage machine (spec §1, §7, §18)

export type Stage =
  | 'lead_new'
  | 'lead_correction'
  | 'lead_review'
  | 'contacted'
  | 'requirements'
  | 'quotation'
  | 'negotiation'
  | 'follow_up'
  | 'lost'
  | 'agreement'
  | 'token_payment'
  | 'site_prep'
  | 'site_qc'
  | 'site_corrections'
  | 'material_prep'
  | 'in_transit'
  | 'material_arrived'
  | 'material_handover'
  | 'installation'
  | 'final_qc'
  | 'install_corrections'
  | 'handover'
  | 'amc';

export type LeadSource = 'field' | 'referral' | 'phone' | 'walk_in';
export type AddressConfidence = 'detected' | 'confirmed' | 'manual' | 'unknown';
export type ContactRole = 'owner' | 'builder' | 'contractor' | 'watchman' | 'other';
export type YesNoUnsure = 'yes' | 'no' | 'not_sure';

export interface GeoPoint {
  lat: number;
  lng: number;
  accuracy?: number;
  at?: number;
}

export interface Site {
  address: string;
  area: string;
  addressConfidence: AddressConfidence;
  location?: GeoPoint;
  landmark?: string;
}

export interface Contact {
  name: string;
  phone: string;
  role: ContactRole;
}

export type BuildingUse = 'residential' | 'commercial' | 'hospital' | 'hotel' | 'other';
export type Capacity = 4 | 6 | 8 | 10 | 13;
export type Operation = 'automatic' | 'manual';
export type Finish = 'ss' | 'ms';

export interface Requirements {
  buildingUse: BuildingUse;
  stops: number;
  capacity: Capacity;
  operation: Operation;
  finish: Finish;
  machineRoom: 'with_room' | 'roomless';
  expectedMonth: string; // YYYY-MM
  shaftStatus: 'ready' | 'under_construction' | 'not_started';
  threePhasePower: YesNoUnsure;
  notes: string;
}

export type CommChannel = 'call' | 'whatsapp' | 'visit' | 'sms';
export type CommOutcome =
  | 'reached'
  | 'no_answer'
  | 'call_back'
  | 'not_interested'
  | 'wrong_number'
  | 'message_opened'
  | 'message_sent'
  | 'message_not_sent';

export interface CommLog {
  id: string;
  at: number;
  by: string;
  channel: CommChannel;
  outcome: CommOutcome;
  note: string;
  templateId?: string;
}

export interface Contribution {
  userId: string;
  at: number;
  evidenceIds: string[];
  note: string;
  /** Duplicate-lead commission (spec §6, §26) — never paid until the owner approves the rule. */
  commission: 'rule_pending' | 'eligible' | 'not_eligible';
}

export interface PrepItemState {
  itemId: string;
  done: boolean;
  evidenceIds: string[];
  doneAt?: number;
  doneBy?: string;
}

export type StepStatus = 'todo' | 'done' | 'blocked';

export interface StepState {
  index: number;
  status: StepStatus;
  evidenceIds: string[];
  safetyConfirmed: boolean;
  note?: string;
  doneAt?: number;
  doneBy?: string;
  blockerTaskId?: string;
}

export interface Installation {
  startedAt: number;
  targetAt: number;
  steps: StepState[];
  finalRequestedAt?: number;
}

export interface Handover {
  customerName?: string;
  customerSignatureId?: string;
  technicianSignatureId?: string;
  rating?: number;
  feedback?: string;
  acceptedAt?: number;
  docsIssuedAt?: number;
  docIds: string[];
  statutoryLicenceRef?: string;
}

export interface Project {
  id: string;
  createdAt: number;
  createdBy: string;
  source: LeadSource;
  stage: Stage;
  stageSince: number;
  resumeStage?: Stage;
  site: Site;
  contact: Contact;
  shaftReady: YesNoUnsure;
  floors?: number;
  leadEvidenceIds: string[];
  duplicateCandidates: string[];
  contributions: Contribution[];
  returnReason?: string;
  lostReason?: string;
  lostNote?: string;
  salesOwnerId?: string;
  qcId?: string;
  technicianId?: string;
  supplierId?: string;
  customerUserId?: string;
  customerName?: string;
  nextFollowUp?: { at: number; note: string; ownerId: string };
  comms: CommLog[];
  requirements?: Requirements;
  quoteIds: string[];
  acceptedQuoteId?: string;
  agreementId?: string;
  paymentDue: Partial<Record<CustomerPaymentPurpose, number>>;
  prep: PrepItemState[];
  prepDueAt?: number;
  inspectionIds: string[];
  drawingsDocId?: string;
  shipmentId?: string;
  installation?: Installation;
  handover?: Handover;
  amcId?: string;
  frozen?: { incidentId: string; at: number };
  riskFlags: string[];
}

// ---------------------------------------------------------------------------
// Evidence (spec §6, §19)

export type EvidenceType = 'photo' | 'video' | 'audio' | 'signature';
export type EvidenceFlag = 'dark' | 'blurry' | 'no_location' | 'far_from_site' | 'low_accuracy';

export interface Evidence {
  id: string;
  mediaId: string;
  type: EvidenceType;
  mime: string;
  capturedAt: number;
  uploadedAt: number;
  userId: string;
  device: string;
  appVersion: string;
  location?: GeoPoint;
  projectId?: string;
  ref: string;
  hash?: string;
  checks: { brightness?: number; sharpness?: number; flags: EvidenceFlag[] };
  status: 'ok' | 'flagged' | 'rejected';
  reviewNote?: string;
  reviewedBy?: string;
  /** Illustrative sample image used only in seeded/practice data. */
  sample?: boolean;
}

/** What the capture UI produces before it is attached to a record. */
export interface CapturedMedia {
  mediaId: string;
  type: EvidenceType;
  mime: string;
  capturedAt: number;
  device: string;
  appVersion: string;
  location?: GeoPoint;
  hash?: string;
  checks: { brightness?: number; sharpness?: number; flags: EvidenceFlag[] };
  ref: string;
  sample?: boolean;
}

// ---------------------------------------------------------------------------
// Quotation and agreement (spec §8, §9)

export interface QuoteLine {
  key: 'machine' | 'stops' | 'capacity' | 'finish' | 'installation' | 'transport';
  qty: number;
  cost: number;
  price: number;
}

export type CustomerPaymentPurpose = 'token' | 'arrival' | 'handover';
export type PaymentPurpose = CustomerPaymentPurpose | 'amc';

export interface Milestone {
  purpose: CustomerPaymentPurpose;
  amount: number;
}

export type QuoteStatus =
  | 'draft'
  | 'pending_approval'
  | 'approval_rejected'
  | 'sent'
  | 'change_requested'
  | 'accepted'
  | 'superseded';

export interface Quote {
  id: string;
  projectId: string;
  version: number;
  createdAt: number;
  createdBy: string;
  reason: string;
  inputs: Requirements;
  lines: QuoteLine[];
  cost: number;
  listPrice: number;
  discount: number;
  subtotal: number;
  taxRate: number;
  tax: number;
  total: number;
  margin: number;
  validUntil: number;
  milestones: Milestone[];
  approvalId?: string;
  status: QuoteStatus;
  sentAt?: number;
  policyApproved: boolean;
  customerResponse?: {
    at: number;
    by: string;
    kind: 'accept' | 'change';
    message: string;
    requestedPrice?: number;
    via: 'app' | 'recorded_by_sales';
  };
}

export interface Agreement {
  id: string;
  projectId: string;
  quoteId: string;
  templateVersion: string;
  terms: {
    customerName: string;
    siteAddress: string;
    quoteVersion: number;
    total: number;
    milestones: Milestone[];
    stops: number;
    capacity: Capacity;
    operation: Operation;
    finish: Finish;
  };
  termsHash: string;
  status: 'sent' | 'signed';
  createdAt: number;
  signedAt?: number;
  signature?: {
    evidenceId: string;
    typedName: string;
    consent: true;
    signedByUserId: string;
    witnessId?: string;
  };
}

// ---------------------------------------------------------------------------
// Payments (spec §9, §11, §20)

export type PaymentStatus = 'initiated' | 'pending' | 'confirmed' | 'failed' | 'reversed' | 'reconciled';
export type PaymentMethod = 'sandbox_gateway' | 'bank_transfer';

export interface Payment {
  id: string;
  projectId: string;
  purpose: PaymentPurpose;
  amount: number;
  currency: 'INR';
  method: PaymentMethod;
  providerRef?: string;
  status: PaymentStatus;
  confirmationSource?: 'provider_sandbox' | 'finance_verified';
  createdAt: number;
  createdBy: string;
  confirmAt?: number;
  history: { at: number; status: PaymentStatus; by: string; note?: string }[];
}

// ---------------------------------------------------------------------------
// Approvals (spec §18 — single approval engine)

export type ApprovalKind =
  | 'quote_discount'
  | 'site_qc'
  | 'drawings_release'
  | 'final_qc'
  | 'handover_docs'
  | 'incident_close'
  | 'payout';

export interface ApprovalDecision {
  userId: string;
  role: Role;
  decision: 'approve' | 'reject';
  at: number;
  reason: string;
}

export interface Approval {
  id: string;
  projectId?: string;
  kind: ApprovalKind;
  subjectId: string;
  requestedBy: string;
  requestedAt: number;
  summary: string;
  evidenceIds: string[];
  approverRoles: Role[];
  requiredApprovals: number;
  decisions: ApprovalDecision[];
  status: 'pending' | 'approved' | 'rejected';
  decidedAt?: number;
}

// ---------------------------------------------------------------------------
// QC inspections (spec §10, §13)

export type InspectionKind = 'site' | 'final' | 'surprise';
export type CheckResult = 'pass' | 'fail' | 'na';

export interface CorrectionInput {
  text: string;
  assigneeRole: Role;
  dueAt: number;
}

export interface Inspection {
  id: string;
  projectId: string;
  kind: InspectionKind;
  requestedAt: number;
  requestedBy: string;
  reason?: string;
  announced: boolean;
  authorisedBy?: string;
  scheduledAt?: number;
  inspectorId?: string;
  status: 'requested' | 'scheduled' | 'done';
  checklistVersion: string;
  measurements: Record<string, number>;
  results: Record<string, CheckResult>;
  outcome?: 'approved' | 'corrections' | 'revisit' | 'pass' | 'fail';
  notes?: string;
  revisitReason?: string;
  evidenceIds: string[];
  correctionTaskIds: string[];
  signatureEvidenceId?: string;
  doneAt?: number;
}

// ---------------------------------------------------------------------------
// Tasks (spec §23 Task) — corrections, follow-ups, blockers, evidence requests, exceptions

export type TaskKind =
  | 'site_correction'
  | 'install_correction'
  | 'blocker'
  | 'evidence_request'
  | 'material_exception'
  | 'general';

export type BlockerReason = 'material_missing' | 'site_not_ready' | 'safety_issue' | 'need_help' | 'other';

export interface Task {
  id: string;
  projectId?: string;
  kind: TaskKind;
  title: string;
  description?: string;
  assigneeRole: Role;
  assigneeId?: string;
  createdBy: string;
  createdAt: number;
  dueAt?: number;
  status: 'open' | 'done' | 'cancelled';
  requiredEvidence: number;
  evidenceIds: string[];
  doneAt?: number;
  doneBy?: string;
  resolutionNote?: string;
  source?: { type: 'inspection' | 'message' | 'evidence' | 'shipment' | 'install'; id: string };
  blocker?: { reason: BlockerReason; stepIndex: number; voiceNoteId?: string };
  critical?: boolean;
}

// ---------------------------------------------------------------------------
// Material custody (spec §11)

export interface MaterialItem {
  id: string;
  templateKey: string;
  qty: number;
  unit: 'set' | 'pcs' | 'm' | 'kg';
  serialRequired: boolean;
  serial?: string;
  packed: boolean;
  received?: 'ok' | 'damaged' | 'short';
  receivedNote?: string;
}

export interface Shipment {
  id: string;
  projectId: string;
  supplierId: string;
  createdAt: number;
  createdBy: string;
  items: MaterialItem[];
  status: 'ordered' | 'dispatched' | 'arrived' | 'handed_over';
  sealNumber?: string;
  vehicleNo?: string;
  driverPhone?: string;
  dispatchedAt?: number;
  dispatchEvidenceIds: string[];
  locationUpdates: { at: number; by: string; text: string }[];
  arrival?: {
    at: number;
    by: string;
    location?: GeoPoint;
    sealObserved: string;
    sealStatus: 'intact' | 'broken' | 'mismatch';
    condition: 'good' | 'some_damage' | 'major_damage';
    note: string;
    evidenceIds: string[];
  };
  handover?: {
    at: number;
    by: string;
    customerName: string;
    customerSignatureId: string;
    technicianSignatureId: string;
    exceptionTaskIds: string[];
  };
}

// ---------------------------------------------------------------------------
// Chat, notifications, audit (spec §18, §20)

export type MessageKind = 'message' | 'question' | 'blocker' | 'decision' | 'approval_request' | 'call_summary' | 'system';

export interface Message {
  id: string;
  thread: string; // p:<projectId>:team | p:<projectId>:customer | support:<userId>
  projectId?: string;
  senderId: string;
  at: number;
  text: string;
  kind: MessageKind;
  attachments: string[];
  recipientRole?: Role;
  taskId?: string;
  approvalId?: string;
  resolvedAt?: number;
  resolvedBy?: string;
  callMeta?: { withWhom: string; at: number; source: 'phone' | 'in_person' | 'other_app' };
}

export interface Notification {
  id: string;
  userId: string;
  at: number;
  kind: 'task' | 'approval' | 'stage' | 'payment' | 'blocker' | 'evidence' | 'escalation' | 'security' | 'message' | 'info';
  titleKey: string;
  params: Record<string, string | number>;
  route: string;
  projectId?: string;
  readAt?: number;
  dedupeKey?: string;
}

export interface AuditEvent {
  id: string;
  at: number;
  actorId: string;
  actorRole: Role | 'system';
  action: string;
  objectType: string;
  objectId: string;
  projectId?: string;
  before?: unknown;
  after?: unknown;
  reason?: string;
  evidenceIds?: string[];
  approvalId?: string;
  params?: Record<string, string | number>;
  timeline?: boolean;
}

// ---------------------------------------------------------------------------
// Incidents (spec §19)

export type IncidentKind = 'seal_mismatch' | 'missing_material' | 'damage' | 'unauthorised_access' | 'theft' | 'other';

export interface Incident {
  id: string;
  projectId: string;
  kind: IncidentKind;
  description: string;
  reportedBy: string;
  at: number;
  evidenceIds: string[];
  status: 'open' | 'resolved';
  freeze: boolean;
  ownerId?: string;
  resolution?: string;
  resolvedAt?: number;
  approvalId?: string;
}

// ---------------------------------------------------------------------------
// AMC, complaints (spec §13, §14)

export interface ServiceVisit {
  id: string;
  dueAt: number;
  status: 'due' | 'done';
  doneAt?: number;
  technicianId?: string;
  results: Record<string, CheckResult>;
  evidenceIds: string[];
  customerSignatureId?: string;
  note?: string;
}

export interface AmcContract {
  id: string;
  projectId: string;
  startAt: number;
  endAt: number;
  plan: 'warranty_amc';
  visits: ServiceVisit[];
  serviceTechnicianId?: string;
  serviceContactPhone: string;
  renewals: { at: number; by: string; endAt: number }[];
}

export type TicketCategory = 'breakdown' | 'noise' | 'door' | 'billing' | 'other';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface Ticket {
  id: string;
  projectId: string;
  createdBy: string;
  createdAt: number;
  category: TicketCategory;
  text: string;
  evidenceIds: string[];
  status: TicketStatus;
  ownerId?: string;
  ownerRole: Role;
  nextStep?: string;
  expectedBy?: number;
  history: { at: number; by: string; status: TicketStatus; note: string }[];
}

// ---------------------------------------------------------------------------
// Technician payouts (spec §13 — proposed rule, human approval, dispute process)

export interface PayoutLine {
  projectId: string;
  stepIndex?: number;
  kind: 'sop_step' | 'service_visit';
  amount: number;
  at: number;
  refId: string;
}

export interface Payout {
  id: string;
  technicianId: string;
  weekStart: number;
  lines: PayoutLine[];
  total: number;
  status: 'pending_approval' | 'approved' | 'paid' | 'disputed';
  createdAt: number;
  approvedBy?: string;
  approvedAt?: number;
  paidRef?: string;
  paidAt?: number;
  dispute?: { at: number; text: string; resolution?: string; resolvedAt?: number; resolvedBy?: string };
}

// ---------------------------------------------------------------------------
// Rider shift (spec §6)

export interface Shift {
  id: string;
  userId: string;
  startAt: number;
  startLocation?: GeoPoint;
  endAt?: number;
  track: GeoPoint[];
}

// ---------------------------------------------------------------------------
// Documents generated by the system (drawings, handover pack)

export type DocKind = 'drawing_spec' | 'handover_certificate' | 'warranty' | 'amc_contract' | 'company_noc';

export interface DocRecord {
  id: string;
  projectId: string;
  kind: DocKind;
  createdAt: number;
  createdBy: string;
  approvalId?: string;
  data: Record<string, string | number>;
}

// ---------------------------------------------------------------------------
// Settings and business rules (spec §26)

export type RuleKey =
  | 'pricing_margins'
  | 'token_payment'
  | 'arrival_handover_split'
  | 'duplicate_commission'
  | 'install_target'
  | 'technician_weekly_pay'
  | 'material_return'
  | 'physical_security'
  | 'technical_sop';

export interface PricingPolicy {
  baseCost: Record<Operation, number>;
  perStopCost: number;
  capacityCost: Record<Capacity, number>;
  finishPerStop: Record<Finish, number>;
  roomlessExtra: number;
  installationPerStop: number;
  transport: number;
  targetMargin: number;
  autoFloorMargin: number;
  minMargin: number;
  gstRate: number;
  quoteValidityDays: number;
}

export interface Settings {
  pricing: PricingPolicy;
  rules: Record<RuleKey, { status: 'proposed' | 'approved'; approvedBy?: string; approvedAt?: number; note?: string }>;
  tokenAmount: number;
  arrivalPercent: number;
  handoverPercent: number;
  installTargetDays: number;
  paymentDueDays: number;
  escalation: { leadAcceptHours: number; qcScheduleHours: number; taskOverdueHours: number };
  secondApprover: { quoteDiscount: boolean; incidentClose: boolean };
  payoutRatePerStep: number;
  payoutRatePerVisit: number;
  amcVisitsPerYear: number;
  addressLookup: boolean;
}

export interface DB {
  schema: number;
  workspace: Workspace;
  seq: Record<string, number>;
  users: Record<string, User>;
  projects: Record<string, Project>;
  evidence: Record<string, Evidence>;
  quotes: Record<string, Quote>;
  agreements: Record<string, Agreement>;
  payments: Record<string, Payment>;
  approvals: Record<string, Approval>;
  inspections: Record<string, Inspection>;
  tasks: Record<string, Task>;
  shipments: Record<string, Shipment>;
  messages: Record<string, Message>;
  notifications: Record<string, Notification>;
  incidents: Record<string, Incident>;
  amc: Record<string, AmcContract>;
  tickets: Record<string, Ticket>;
  payouts: Record<string, Payout>;
  shifts: Record<string, Shift>;
  docs: Record<string, DocRecord>;
  readMarks: Record<string, Record<string, number>>;
  audit: AuditEvent[];
  settings: Settings;
}
