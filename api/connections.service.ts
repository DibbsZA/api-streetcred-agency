/**
 * Streetcred ID Agency API
 * An API to issue, manage, and verify self-sovereign identity credentials
 *
 * OpenAPI spec version: v1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { ConnectionContract } from '../model/connectionContract';
import { ConnectionContractArray } from '../model/connectionContractArray';
import { ConnectionInvitationParameters } from '../model/connectionInvitationParameters';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';

@Injectable()
export class ConnectionsService {
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
   * Create a new connection
   * Initiate a new connection by creating an invitation. The newly created connection record  will be in state &#39;Invited&#39; until the other party has accepted the invitation.   The response body includes details about the newly creation connection  &lt;br /&gt;&lt;i&gt;Please check the &lt;a href&#x3D;\&quot;https://docs.streetcred.id/docs/connections\&quot;&gt;documentation&lt;/a&gt; on how to present the invitation data to mobile clients using a QR code.&lt;/i&gt;
   * @param connectionInvitationParameters Connection invitation parameters
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createConnection(
    connectionInvitationParameters?: ConnectionInvitationParameters,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<ConnectionContract>;
  public createConnection(
    connectionInvitationParameters?: ConnectionInvitationParameters,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<ConnectionContract>>;
  public createConnection(
    connectionInvitationParameters?: ConnectionInvitationParameters,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<ConnectionContract>>;
  public createConnection(
    connectionInvitationParameters?: ConnectionInvitationParameters,
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

    return this.httpClient.post<ConnectionContract>(`${this.basePath}/connections`, connectionInvitationParameters, {
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Delete a connection record
   * Delete a connection record
   * @param connectionId Connection identifier
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteConnection(connectionId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public deleteConnection(connectionId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public deleteConnection(connectionId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public deleteConnection(connectionId: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (connectionId === null || connectionId === undefined) {
      throw new Error('Required parameter connectionId was null or undefined when calling deleteConnection.');
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

    return this.httpClient.delete<any>(`${this.basePath}/connections/${encodeURIComponent(String(connectionId))}`, {
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Get a connection by connectionId
   * Get a connection by connectionId
   * @param connectionId The connection identifier.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getConnection(connectionId: string, observe?: 'body', reportProgress?: boolean): Observable<ConnectionContract>;
  public getConnection(
    connectionId: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<ConnectionContract>>;
  public getConnection(
    connectionId: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<ConnectionContract>>;
  public getConnection(connectionId: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (connectionId === null || connectionId === undefined) {
      throw new Error('Required parameter connectionId was null or undefined when calling getConnection.');
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

    return this.httpClient.get<ConnectionContract>(`${this.basePath}/connections/${encodeURIComponent(String(connectionId))}`, {
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * List all connections
   * Retrieve a list of all connections. Optionally, list only connections in a specified state.
   * @param state state of the connection
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public listConnections(
    state?: 'Invited' | 'Negotiating' | 'Connected',
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<ConnectionContractArray>;
  public listConnections(
    state?: 'Invited' | 'Negotiating' | 'Connected',
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<ConnectionContractArray>>;
  public listConnections(
    state?: 'Invited' | 'Negotiating' | 'Connected',
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<ConnectionContractArray>>;
  public listConnections(
    state?: 'Invited' | 'Negotiating' | 'Connected',
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
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

    return this.httpClient.get<ConnectionContractArray>(`${this.basePath}/connections`, {
      params: queryParameters,
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
}
