
import { CredentialState } from './credentialState';


export interface CredentialContract {
  credentialId?: string;
  state?: CredentialState;
  connectionId?: string;
  definitionId?: string;
  schemaId?: string;
  values?: { [key: string]: string; };
}
