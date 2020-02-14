/**
 * Streetcred ID Credentials API
 * An API to issue, manage, and verify self-sovereign identity credentials
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
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