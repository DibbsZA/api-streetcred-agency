


export interface CredentialDefinitionContract {
  name?: string;
  version?: string;
  attributes?: Array<string>;
  supportsRevocation?: boolean;
  maxCredentialCount?: number;
  schemaId?: string;
  definitionId?: string;
}
