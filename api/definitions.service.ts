import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { CredentialDefinitionContract } from '../model/credentialDefinitionContract';
import { CredentialDefinitionContractArray } from '../model/credentialDefinitionContractArray';
import { CredentialDefinitionFromSchemaParameters } from '../model/credentialDefinitionFromSchemaParameters';
import { CredentialDefinitionParameters } from '../model/credentialDefinitionParameters';
import { DefinitionsSchemasPost200TextPlainResponse } from '../model/definitionsSchemasPost200TextPlainResponse';
import { ProofRequest } from '../model/proofRequest';
import { SchemaParameters } from '../model/schemaParameters';
import { SchemaRecordArray } from '../model/schemaRecordArray';
import { VerificationDefinitionContract } from '../model/verificationDefinitionContract';
import { VerificationDefinitionContractArray } from '../model/verificationDefinitionContractArray';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';

@Injectable()
export class DefinitionsService {
  protected basePath = 'https://api.streetcred.id/agency/v1';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(
    protected httpClient: HttpClient,
    @Optional() @Inject(BASE_PATH) basePath: string,
    @Optional() configuration: Configuration
  ) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data';
    for (const consume of consumes) {
      if (form === consume) {
        return true;
      }
    }
    return false;
  }

  /**
   * Create new credential definition and schema with the given parameters.
   * Create new credential definition and schema with the given parameters.
   * @param credentialDefinitionFromSchemaParameters Definition.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createCredentialDefinition(
    credentialDefinitionFromSchemaParameters?: CredentialDefinitionFromSchemaParameters,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<CredentialDefinitionContract>;
  public createCredentialDefinition(
    credentialDefinitionFromSchemaParameters?: CredentialDefinitionFromSchemaParameters,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<CredentialDefinitionContract>>;
  public createCredentialDefinition(
    credentialDefinitionFromSchemaParameters?: CredentialDefinitionFromSchemaParameters,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<CredentialDefinitionContract>>;
  public createCredentialDefinition(
    credentialDefinitionFromSchemaParameters?: CredentialDefinitionFromSchemaParameters,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let headers = this.defaultHeaders;

    // authentication (accessToken) required
    if (this.configuration.apiKeys) {
      headers = headers.set('Authorization', this.configuration.apiKeys);
    }

    // authentication (subscriptionKey) required
    if (this.configuration.accessToken) {
      headers = headers.set('X-Streetcred-Subscription-Key', this.configuration.accessToken);
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = ['text/plain', 'application/json', 'text/json'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json-patch+json', 'application/json', 'text/json', 'application/_*+json'];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.post<CredentialDefinitionContract>(
      `${this.basePath}/definitions/credentials`,
      credentialDefinitionFromSchemaParameters,
      {
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress,
      }
    );
  }

  /**
   * Create credential definition from existing schema identifier.
   * Create credential definition from existing schema identifier.
   * @param id schemaId
   * @param credentialDefinitionParameters
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createCredentialDefinitionForSchemaId(
    id: string,
    credentialDefinitionParameters?: CredentialDefinitionParameters,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<CredentialDefinitionContract>;
  public createCredentialDefinitionForSchemaId(
    id: string,
    credentialDefinitionParameters?: CredentialDefinitionParameters,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<CredentialDefinitionContract>>;
  public createCredentialDefinitionForSchemaId(
    id: string,
    credentialDefinitionParameters?: CredentialDefinitionParameters,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<CredentialDefinitionContract>>;
  public createCredentialDefinitionForSchemaId(
    id: string,
    credentialDefinitionParameters?: CredentialDefinitionParameters,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling createCredentialDefinitionForSchemaId.');
    }

    let headers = this.defaultHeaders;

    // authentication (accessToken) required
    if (this.configuration.apiKeys) {
      headers = headers.set('Authorization', this.configuration.apiKeys);
    }

    // authentication (subscriptionKey) required
    if (this.configuration.accessToken) {
      headers = headers.set('X-Streetcred-Subscription-Key', this.configuration.accessToken);
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = ['text/plain', 'application/json', 'text/json'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json-patch+json', 'application/json', 'text/json', 'application/_*+json'];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.post<CredentialDefinitionContract>(
      `${this.basePath}/definitions/credentials/${encodeURIComponent(String(id))}`,
      credentialDefinitionParameters,
      {
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress,
      }
    );
  }

  /**
   * Create new schema
   * Register schema with the current agency tenant and write the schema  to the ledger using the tenant as issuer. This does not create credential definition.
   * @param schemaParameters Schema details
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createSchema(
    schemaParameters?: SchemaParameters,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<DefinitionsSchemasPost200TextPlainResponse>;
  public createSchema(
    schemaParameters?: SchemaParameters,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<DefinitionsSchemasPost200TextPlainResponse>>;
  public createSchema(
    schemaParameters?: SchemaParameters,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<DefinitionsSchemasPost200TextPlainResponse>>;
  public createSchema(
    schemaParameters?: SchemaParameters,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let headers = this.defaultHeaders;

    // authentication (accessToken) required
    if (this.configuration.apiKeys) {
      headers = headers.set('Authorization', this.configuration.apiKeys);
    }

    // authentication (subscriptionKey) required
    if (this.configuration.accessToken) {
      headers = headers.set('X-Streetcred-Subscription-Key', this.configuration.accessToken);
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = ['text/plain', 'application/json', 'text/json'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json-patch+json', 'application/json', 'text/json', 'application/_*+json'];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.post<DefinitionsSchemasPost200TextPlainResponse>(
      `${this.basePath}/definitions/schemas`,
      schemaParameters,
      {
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress,
      }
    );
  }

  /**
   * Creates new verification definition.
   * Creates new verification definition.
   * @param proofRequest The proof request.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createVerificationDefinition(
    proofRequest?: ProofRequest,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<VerificationDefinitionContract>;
  public createVerificationDefinition(
    proofRequest?: ProofRequest,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<VerificationDefinitionContract>>;
  public createVerificationDefinition(
    proofRequest?: ProofRequest,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<VerificationDefinitionContract>>;
  public createVerificationDefinition(
    proofRequest?: ProofRequest,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let headers = this.defaultHeaders;

    // authentication (accessToken) required
    if (this.configuration.apiKeys) {
      headers = headers.set('Authorization', this.configuration.apiKeys);
    }

    // authentication (subscriptionKey) required
    if (this.configuration.accessToken) {
      headers = headers.set('X-Streetcred-Subscription-Key', this.configuration.accessToken);
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = ['text/plain', 'application/json', 'text/json'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json-patch+json', 'application/json', 'text/json', 'application/_*+json'];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.post<VerificationDefinitionContract>(`${this.basePath}/definitions/verifications`, proofRequest, {
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Get the credential definition with the specified identifier.
   * Get the credential definition with the specified identifier.
   * @param id definitionId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getCredentialDefinition(
    id: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<CredentialDefinitionContract>;
  public getCredentialDefinition(
    id: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<CredentialDefinitionContract>>;
  public getCredentialDefinition(
    id: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<CredentialDefinitionContract>>;
  public getCredentialDefinition(id: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getCredentialDefinition.');
    }

    let headers = this.defaultHeaders;

    // authentication (accessToken) required
    if (this.configuration.apiKeys) {
      headers = headers.set('Authorization', this.configuration.apiKeys);
    }

    // authentication (subscriptionKey) required
    if (this.configuration.accessToken) {
      headers = headers.set('X-Streetcred-Subscription-Key', this.configuration.accessToken);
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = ['text/plain', 'application/json', 'text/json'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.get<CredentialDefinitionContract>(
      `${this.basePath}/definitions/credentials/${encodeURIComponent(String(id))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress,
      }
    );
  }

  /**
   * Gets the specified verification definition.
   * Gets the specified verification definition.
   * @param definitionId The verification identifier.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getVerificationDefinition(
    definitionId: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<VerificationDefinitionContract>;
  public getVerificationDefinition(
    definitionId: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<VerificationDefinitionContract>>;
  public getVerificationDefinition(
    definitionId: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<VerificationDefinitionContract>>;
  public getVerificationDefinition(
    definitionId: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (definitionId === null || definitionId === undefined) {
      throw new Error('Required parameter definitionId was null or undefined when calling getVerificationDefinition.');
    }

    let headers = this.defaultHeaders;

    // authentication (accessToken) required
    if (this.configuration.apiKeys) {
      headers = headers.set('Authorization', this.configuration.apiKeys);
    }

    // authentication (subscriptionKey) required
    if (this.configuration.accessToken) {
      headers = headers.set('X-Streetcred-Subscription-Key', this.configuration.accessToken);
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = ['text/plain', 'application/json', 'text/json'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.get<VerificationDefinitionContract>(
      `${this.basePath}/definitions/verifications/${encodeURIComponent(String(definitionId))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress,
      }
    );
  }

  /**
   * List all credential definitions by this issuer.
   * List all credential definitions by this issuer.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public listCredentialDefinitions(observe?: 'body', reportProgress?: boolean): Observable<CredentialDefinitionContractArray>;
  public listCredentialDefinitions(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<CredentialDefinitionContractArray>>;
  public listCredentialDefinitions(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<CredentialDefinitionContractArray>>;
  public listCredentialDefinitions(observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    let headers = this.defaultHeaders;

    // authentication (accessToken) required
    if (this.configuration.apiKeys) {
      headers = headers.set('Authorization', this.configuration.apiKeys);
    }

    // authentication (subscriptionKey) required
    if (this.configuration.accessToken) {
      headers = headers.set('X-Streetcred-Subscription-Key', this.configuration.accessToken);
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = ['text/plain', 'application/json', 'text/json'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.get<CredentialDefinitionContractArray>(`${this.basePath}/definitions/credentials`, {
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * List the schemas registered or used by this issuer.
   * List the schemas registered or used by this issuer.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public listSchemas(observe?: 'body', reportProgress?: boolean): Observable<SchemaRecordArray>;
  public listSchemas(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SchemaRecordArray>>;
  public listSchemas(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SchemaRecordArray>>;
  public listSchemas(observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    let headers = this.defaultHeaders;

    // authentication (accessToken) required
    if (this.configuration.apiKeys) {
      headers = headers.set('Authorization', this.configuration.apiKeys);
    }

    // authentication (subscriptionKey) required
    if (this.configuration.accessToken) {
      headers = headers.set('X-Streetcred-Subscription-Key', this.configuration.accessToken);
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = ['text/plain', 'application/json', 'text/json'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.get<SchemaRecordArray>(`${this.basePath}/definitions/schemas`, {
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * List all verification definitions.
   * List all verification definitions.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public listVerificationDefinitions(observe?: 'body', reportProgress?: boolean): Observable<VerificationDefinitionContractArray>;
  public listVerificationDefinitions(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<VerificationDefinitionContractArray>>;
  public listVerificationDefinitions(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<VerificationDefinitionContractArray>>;
  public listVerificationDefinitions(observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    let headers = this.defaultHeaders;

    // authentication (accessToken) required
    if (this.configuration.apiKeys) {
      headers = headers.set('Authorization', this.configuration.apiKeys);
    }

    // authentication (subscriptionKey) required
    if (this.configuration.accessToken) {
      headers = headers.set('X-Streetcred-Subscription-Key', this.configuration.accessToken);
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = ['text/plain', 'application/json', 'text/json'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.get<VerificationDefinitionContractArray>(`${this.basePath}/definitions/verifications`, {
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
}
