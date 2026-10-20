// Role- and project-based access control (spec §3, §14, §19).
// A role comes only from the user directory managed by an administrator — never from a choice on screen.

import type { DB, Project, Role, User } from './types';

export type Permission =
  | 'lead.capture'
  | 'lead.review'
  | 'lead.assign'
  | 'lead.reopen'
  | 'sales.work'
  | 'quote.respond'
  | 'approval.quote'
  | 'agreement.sign'
  | 'payment.pay'
  | 'payment.verify'
  | 'prep.update'
  | 'qc.inspect'
  | 'qc.surprise'
  | 'drawings.release'
  | 'material.dispatch'
  | 'material.receive'
  | 'install.work'
  | 'handover.sign'
  | 'handover.issue'
  | 'amc.service'
  | 'amc.manage'
  | 'ticket.create'
  | 'ticket.manage'
  | 'incident.report'
  | 'incident.resolve'
  | 'evidence.review'
  | 'task.create'
  | 'project.assign'
  | 'users.manage'
  | 'rules.approve'
  | 'settings.edit'
  | 'payout.manage'
  | 'payout.pay'
  | 'payout.view_own'
  | 'view.financials'
  | 'view.margin'
  | 'view.audit'
  | 'view.dashboard'
  | 'view.workers'
  | 'shift.work';

const STAFF: Role[] = ['rider', 'sales', 'qc', 'supplier', 'technician', 'finance', 'admin', 'owner'];

const MATRIX: Record<Permission, Role[]> = {
  'lead.capture': ['rider', 'sales', 'admin'],
  'lead.review': ['sales', 'admin'],
  'lead.assign': ['admin'],
  'lead.reopen': ['admin', 'owner'],
  'sales.work': ['sales', 'admin'],
  'quote.respond': ['customer', 'sales'],
  'approval.quote': ['admin', 'owner'],
  'agreement.sign': ['customer', 'sales'],
  'payment.pay': ['customer', 'sales'],
  'payment.verify': ['finance'],
  'prep.update': ['customer', 'sales'],
  'qc.inspect': ['qc'],
  'qc.surprise': ['qc', 'admin'],
  'drawings.release': ['admin'],
  'material.dispatch': ['supplier'],
  'material.receive': ['technician', 'admin'],
  'install.work': ['technician'],
  'handover.sign': ['technician'],
  'handover.issue': ['admin'],
  'amc.service': ['technician'],
  'amc.manage': ['admin', 'sales'],
  'ticket.create': ['customer', 'sales', 'admin'],
  'ticket.manage': ['admin', 'technician'],
  'incident.report': STAFF,
  'incident.resolve': ['admin', 'owner'],
  'evidence.review': ['qc', 'admin'],
  'task.create': ['admin', 'qc', 'sales', 'owner'],
  'project.assign': ['admin'],
  'users.manage': ['admin'],
  'rules.approve': ['owner'],
  'settings.edit': ['admin', 'owner'],
  'payout.manage': ['admin'],
  'payout.pay': ['finance'],
  'payout.view_own': ['technician'],
  'view.financials': ['sales', 'finance', 'admin', 'owner', 'customer'],
  'view.margin': ['sales', 'finance', 'admin', 'owner'],
  'view.audit': ['admin', 'owner'],
  'view.dashboard': ['admin', 'owner', 'finance'],
  'view.workers': ['admin', 'owner'],
  'shift.work': ['rider'],
};

export function can(user: Pick<User, 'role'> | null | undefined, permission: Permission): boolean {
  if (!user) return false;
  return MATRIX[permission].includes(user.role);
}

/** Roles that see every project. */
const ALL_PROJECT_ROLES: Role[] = ['admin', 'owner', 'finance'];

/** Project-based access: workers see only projects connected to their duties. */
export function canSeeProject(db: DB, user: User, project: Project): boolean {
  if (ALL_PROJECT_ROLES.includes(user.role)) return true;
  switch (user.role) {
    case 'rider':
      return project.createdBy === user.id || project.contributions.some((c) => c.userId === user.id);
    case 'sales':
      return project.salesOwnerId === user.id || (project.stage === 'lead_new' && !project.salesOwnerId);
    case 'qc':
      return (
        project.qcId === user.id ||
        project.inspectionIds.some((id) => {
          const ins = db.inspections[id];
          return ins && ins.status !== 'done' && !ins.inspectorId;
        })
      );
    case 'technician':
      return project.technicianId === user.id || (project.amcId ? db.amc[project.amcId]?.serviceTechnicianId === user.id : false);
    case 'supplier':
      return project.supplierId === user.id;
    case 'customer':
      return project.customerUserId === user.id;
    default:
      return false;
  }
}

/** Customer phone and personal data are hidden from roles that do not need them (spec §19). */
export function canSeeContact(user: User, project: Project): boolean {
  if (user.role === 'supplier') return false;
  if (user.role === 'rider') return project.createdBy === user.id;
  return true;
}

export function visibleProjects(db: DB, user: User): Project[] {
  return Object.values(db.projects).filter((p) => canSeeProject(db, user, p));
}

/** Which chat threads a user may read for a project. Internal team notes are never shown to customers. */
export function canReadThread(db: DB, user: User, thread: string): boolean {
  if (thread.startsWith('support:')) {
    return thread === `support:${user.id}` || user.role === 'admin' || user.role === 'owner';
  }
  const [, projectId, channel] = thread.split(':');
  const project = db.projects[projectId];
  if (!project || !canSeeProject(db, user, project)) return false;
  if (channel === 'customer') return user.role !== 'supplier' && user.role !== 'rider';
  if (channel === 'team') return user.role !== 'customer';
  return false;
}
