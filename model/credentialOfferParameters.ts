


/**
 * Send offer.
 */
export interface CredentialOfferParameters {
  /**
   * Gets or sets the credential definition identifier.
   */
  definitionId: string;
  /**
   * Connection identifier to send this credential to.  If ommited, the request will be treated as connectionless  issuance and will generate a URL.
   */
  connectionId?: string;
  /**
   * If true, the credential will automatically be issued once the individual accepts the offer. If   false, when an individual accepts the offer the credential will be in state 'Requested' and must be manually issued using the   PUT /credentials/{credentialId} endpoint. This is set to false by default
   */
  automaticIssuance?: boolean;
  /**
   * Credential attribute values. If using connectionless issuance, these attributes must be specified.  Must match all credential definition attribute names.
   */
  credentialValues?: { [key: string]: string; };
}
