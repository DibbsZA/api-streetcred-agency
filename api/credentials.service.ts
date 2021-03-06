import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { Body } from '../model/body';
import { CredentialContract } from '../model/credentialContract';
import { CredentialContractArray } from '../model/credentialContractArray';
import { CredentialOfferParameters } from '../model/credentialOfferParameters';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';

@Injectable()
export class CredentialsService {
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
   * Sends credential offer of the specified DefinitionId to the specified ConnectionId
   * Sends credential offer of the specified DefinitionId to the specified ConnectionId
   * @param credentialOfferParameters The definition and connection to which this offer will be sent.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createCredential(
    credentialOfferParameters?: CredentialOfferParameters,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<CredentialContract>;
  public createCredential(
    credentialOfferParameters?: CredentialOfferParameters,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<CredentialContract>>;
  public createCredential(
    credentialOfferParameters?: CredentialOfferParameters,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<CredentialContract>>;
  public createCredential(
    credentialOfferParameters?: CredentialOfferParameters,
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

    return this.httpClient.post<CredentialContract>(`${this.basePath}/credentials`, credentialOfferParameters, {
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Gets the credentials.
   * Gets the credentials.
   * @param credentialId The credential identifier.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getCredential(credentialId: string, observe?: 'body', reportProgress?: boolean): Observable<CredentialContract>;
  public getCredential(
    credentialId: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<CredentialContract>>;
  public getCredential(
    credentialId: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<CredentialContract>>;
  public getCredential(credentialId: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (credentialId === null || credentialId === undefined) {
      throw new Error('Required parameter credentialId was null or undefined when calling getCredential.');
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

    return this.httpClient.get<CredentialContract>(`${this.basePath}/credentials/${encodeURIComponent(String(credentialId))}`, {
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Issues the credential.
   * Issues the credential.
   * @param credentialId The credential identifier.
   * @param body If the values offered were incorrect, changes to the values may be made here. You must update all of the values, and they must be follow the same structure of the schema.              To keep the values the same as those included in the credential offer, leave the body blank
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public issueCredential(credentialId: string, body?: Body, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public issueCredential(
    credentialId: string,
    body?: Body,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public issueCredential(
    credentialId: string,
    body?: Body,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public issueCredential(
    credentialId: string,
    body?: Body,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (credentialId === null || credentialId === undefined) {
      throw new Error('Required parameter credentialId was null or undefined when calling issueCredential.');
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
    const httpHeaderAccepts: string[] = [];
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

    return this.httpClient.put<any>(`${this.basePath}/credentials/${encodeURIComponent(String(credentialId))}`, body, {
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Lists the credentials.
   * Lists the credentials.
   * @param connectionId
   * @param state
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public listCredentials(
    connectionId?: string,
    state?: 'Offered' | 'Requested' | 'Issued' | 'Rejected' | 'Revoked',
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<CredentialContractArray>;
  public listCredentials(
    connectionId?: string,
    state?: 'Offered' | 'Requested' | 'Issued' | 'Rejected' | 'Revoked',
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<CredentialContractArray>>;
  public listCredentials(
    connectionId?: string,
    state?: 'Offered' | 'Requested' | 'Issued' | 'Rejected' | 'Revoked',
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<CredentialContractArray>>;
  public listCredentials(
    connectionId?: string,
    state?: 'Offered' | 'Requested' | 'Issued' | 'Rejected' | 'Revoked',
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
    if (connectionId !== undefined && connectionId !== null) {
      queryParameters = queryParameters.set('connectionId', connectionId as any);
    }
    if (state !== undefined && state !== null) {
      queryParameters = queryParameters.set('state', state as any);
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

    return this.httpClient.get<CredentialContractArray>(`${this.basePath}/credentials`, {
      params: queryParameters,
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Revokes a credential.
   * Revoke credential that was issued previously. Process of revocation will update the revocation  registry locally and on the ledger. Issued credentials can still participate in proof workflows  and be considered valid, but only if the verifying ignores the revocation trail.
   * @param credentialId Credential identifier.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public revokeCredential(credentialId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public revokeCredential(credentialId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public revokeCredential(credentialId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public revokeCredential(credentialId: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (credentialId === null || credentialId === undefined) {
      throw new Error('Required parameter credentialId was null or undefined when calling revokeCredential.');
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
    const httpHeaderAccepts: string[] = [];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.delete<any>(`${this.basePath}/credentials/${encodeURIComponent(String(credentialId))}`, {
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
}
