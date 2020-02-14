


/**
 * Represents a request object to create new credential definition for an agency
 */
export interface CredentialDefinitionFromSchemaParameters {
  /**
   * Name of the schema.
   */
  name: string;
  /**
   * Schema version.
   */
  version: string;
  /**
   * Schema attribute names.
   */
  attrNames: Array<string>;
  /**
   * Support credential revocation
   */
  supportRevocation?: boolean;
  /**
   * Unique tag to differentiate definitions of the same schema
   */
  tag?: string;
}
