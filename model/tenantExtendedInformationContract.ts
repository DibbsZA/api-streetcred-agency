
import { EndorserType } from './endorserType';


/**
 * Extended tenant information
 */
export interface TenantExtendedInformationContract {
  /**
   * Issuer DID
   */
  issuerDid?: string;
  /**
   * Issuer Public Key
   */
  issuerKey?: string;
  /**
   * Isuser key generation seed used for deterministic key creation (32 characters)
   */
  issuerKeyGenerationSeed?: string;
  /**
   * Agent DID
   */
  agentDid?: string;
  /**
   * Agent Public Key
   */
  agentKey?: string;
  /**
   * Agent key generation seed used for deterministic key creation (32 characters)
   */
  agentKeyGenerationSeed?: string;
  /**
   * Agent service endpoint URL
   */
  agentServiceEndpoint?: string;
  transactionEndorsement?: EndorserType;
}
