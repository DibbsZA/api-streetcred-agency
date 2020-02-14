


/**
 * Connection invitation parameters
 */
export interface ConnectionInvitationParameters {
  /**
   * Unique connection identifier. If not specified, a random one will be generated.
   */
  connection_id?: string;
  /**
   * If set to 'true', the invitation can be used by multiple parties and will always have the status set to 'Invited'.  When a party accepts this invitation, a new connection record with a unique identifier will be created.                Default value is 'false'.
   */
  multi_party?: boolean;
}
