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


/**
 * Schema.
 */
export interface SchemaParameters { 
    /**
     * Gets or sets the name.
     */
    name: string;
    /**
     * Gets or sets the version.
     */
    version: string;
    /**
     * Gets or sets the attribute names.
     */
    attrNames: Array<string>;
}