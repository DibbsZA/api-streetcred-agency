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
import { MessageDirection } from './messageDirection';


export interface BasicMessageRecord { 
    sentTime?: Date;
    direction?: MessageDirection;
    text?: string;
    id?: string;
}
