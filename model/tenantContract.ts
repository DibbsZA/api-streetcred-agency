
import { NetworkContract } from './networkContract';
import { TenantExtendedInformationContract } from './tenantExtendedInformationContract';


/**
 * Tenant info.
 */
export interface TenantContract {
  /**
   * Gets or sets the name.
   */
  name?: string;
  /**
   * Gets or sets the image URI.
   */
  imageUrl?: string;
  network?: NetworkContract;
  /**
   * Gets or sets the tenant identifier.
   */
  tenantId?: string;
  extendedInformation?: TenantExtendedInformationContract;
}
