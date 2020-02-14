
import { EndorserType } from './endorserType';


/**
 * Configuration options for creating new tenant
 */
export interface TenantParameters {
  /**
   * (Optional) Issuer seed used for deterministic DID generation.  If omitted, a random DID/Key is generated
   */
  issuer_seed?: string;
  /**
   * The name of the tenant.
   */
  name: string;
  /**
   * (Optional) Location of image URL used as profile for this tenant
   */
  image_url?: string;
  /**
   * (Optional) Ledger network identifier. Default is Sovrin Staging (sovrin-staging)
   */
  network_id?: string;
  endorser_type?: EndorserType;
}
