


export type CredentialState = 'Offered' | 'Requested' | 'Issued' | 'Rejected' | 'Revoked';

export const CredentialState = {
  Offered: 'Offered' as CredentialState,
  Requested: 'Requested' as CredentialState,
  Issued: 'Issued' as CredentialState,
  Rejected: 'Rejected' as CredentialState,
  Revoked: 'Revoked' as CredentialState
};
