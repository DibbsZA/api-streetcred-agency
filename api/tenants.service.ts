import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { IssuerStatusContract } from '../model/issuerStatusContract';
import { TenantContract } from '../model/tenantContract';
import { TenantContractArray } from '../model/tenantContractArray';
import { TenantParameters } from '../model/tenantParameters';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';

@Injectable()
export class TenantsService {
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
   * Create new tenant
   * Create new tenant and setup a unique agency endpoint. The agency will be set as an issuer
   * @param tenantParameters Configuration options for creating new tenant.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createTenant(
    tenantParameters?: TenantParameters,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<TenantContract>;
  public createTenant(
    tenantParameters?: TenantParameters,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<TenantContract>>;
  public createTenant(
    tenantParameters?: TenantParameters,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<TenantContract>>;
  public createTenant(
    tenantParameters?: TenantParameters,
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

    return this.httpClient.post<TenantContract>(`${this.basePath}/tenants`, tenantParameters, {
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Delete a tenant.
   * Permanently remove a tenant, including their wallet, endpoint registrations and all data.              All definitions, connections and credentials issued will be deleted.              This action cannot be reverted.
   * @param tenantId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteTenant(tenantId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public deleteTenant(tenantId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public deleteTenant(tenantId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public deleteTenant(tenantId: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (tenantId === null || tenantId === undefined) {
      throw new Error('Required parameter tenantId was null or undefined when calling deleteTenant.');
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

    return this.httpClient.delete<any>(`${this.basePath}/tenants/${encodeURIComponent(String(tenantId))}`, {
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Get the issuer status for the current tenant.
   * If the tenant is configured with Dedicated endorsement, this  action will check if the issuer DID has the required ENDORSER role   on the configured ledger network.  Additionally, check the acceptance of the transaction  author agreement and return the text and version if acceptance  is required.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getIssuerStatus(observe?: 'body', reportProgress?: boolean): Observable<IssuerStatusContract>;
  public getIssuerStatus(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<IssuerStatusContract>>;
  public getIssuerStatus(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<IssuerStatusContract>>;
  public getIssuerStatus(observe: any = 'body', reportProgress: boolean = false): Observable<any> {
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

    return this.httpClient.get<IssuerStatusContract>(`${this.basePath}/tenants/issuerStatus`, {
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Returns the agent configuration
   * Returns the agent configuration
   * @param tenantId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getTenant(tenantId: string, observe?: 'body', reportProgress?: boolean): Observable<TenantContract>;
  public getTenant(tenantId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<TenantContract>>;
  public getTenant(tenantId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<TenantContract>>;
  public getTenant(tenantId: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (tenantId === null || tenantId === undefined) {
      throw new Error('Required parameter tenantId was null or undefined when calling getTenant.');
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

    return this.httpClient.get<TenantContract>(`${this.basePath}/tenants/${encodeURIComponent(String(tenantId))}`, {
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * List available tenants
   * Get a collection of available tenants for the current authorization context.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public listTenants(observe?: 'body', reportProgress?: boolean): Observable<TenantContractArray>;
  public listTenants(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<TenantContractArray>>;
  public listTenants(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<TenantContractArray>>;
  public listTenants(observe: any = 'body', reportProgress: boolean = false): Observable<any> {
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

    return this.httpClient.get<TenantContractArray>(`${this.basePath}/tenants`, {
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
}
