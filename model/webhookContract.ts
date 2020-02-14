
import { WebhookType } from './webhookType';


/**
 * Webhook Contract.
 */
export interface WebhookContract {
  /**
   * Gets or sets the webhook endpoing url
   */
  url?: string;
  type?: WebhookType;
  /**
   * Gets or set if this webhook is enabled
   */
  enabled?: boolean;
  /**
   * The webhook identifier
   */
  id?: string;
}
