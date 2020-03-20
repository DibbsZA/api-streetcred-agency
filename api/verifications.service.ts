import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { IdContract } from '../model/idContract';
import { VerificationContract } from '../model/verificationContract';
import { VerificationContractArray } from '../model/verificationContractArray';
import { VerificationParameters } from '../model/verificationParameters';
import { VerificationResult } from '../model/verificationResult';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';

@Injectable()
export class VerificationsService {
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
   * Creates the specified create verification.
   * Creates the specified create verification.
   * @param verificationParameters The create verification.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createVerification(
    verificationParameters?: VerificationParameters,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<IdContract>;
  public createVerification(
    verificationParameters?: VerificationParameters,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<IdContract>>;
  public createVerification(
    verificationParameters?: VerificationParameters,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<IdContract>>;
  public createVerification(
    verificationParameters?: VerificationParameters,
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

    return this.httpClient.post<IdContract>(`${this.basePath}/verifications`, verificationParameters, {
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Get the verification with the given identifier
   * Get the verification with the given identifier
   * @param verificationId The verification identifier.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getVerification(verificationId: string, observe?: 'body', reportProgress?: boolean): Observable<VerificationContract>;
  public getVerification(
    verificationId: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<VerificationContract>>;
  public getVerification(
    verificationId: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<VerificationContract>>;
  public getVerification(verificationId: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (verificationId === null || verificationId === undefined) {
      throw new Error('Required parameter verificationId was null or undefined when calling getVerification.');
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

    return this.httpClient.get<VerificationContract>(
      `${this.basePath}/verifications/${encodeURIComponent(String(verificationId))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress,
      }
    );
  }

  /**
   * Lists the verifications for connection.
   * Lists the verifications for connection.
   * @param connectionId The connection identifier.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public listVerificationsForConnection(
    connectionId?: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<VerificationContractArray>;
  public listVerificationsForConnection(
    connectionId?: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<VerificationContractArray>>;
  public listVerificationsForConnection(
    connectionId?: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<VerificationContractArray>>;
  public listVerificationsForConnection(
    connectionId?: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
    if (connectionId !== undefined && connectionId !== null) {
      queryParameters = queryParameters.set('connectionId', connectionId as any);
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

    return this.httpClient.get<VerificationContractArray>(`${this.basePath}/verifications`, {
      params: queryParameters,
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Execute verification on this record. This is an expensive action and is executed  by veryfing the proof againt the ledger data.
   * Execute verification on this record. This is an expensive action and is executed  by veryfing the proof againt the ledger data.
   * @param verificationId Verification identifier
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public verifyVerification(verificationId: string, observe?: 'body', reportProgress?: boolean): Observable<VerificationResult>;
  public verifyVerification(
    verificationId: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<VerificationResult>>;
  public verifyVerification(
    verificationId: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<VerificationResult>>;
  public verifyVerification(verificationId: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (verificationId === null || verificationId === undefined) {
      throw new Error('Required parameter verificationId was null or undefined when calling verifyVerification.');
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

    return this.httpClient.get<VerificationResult>(
      `${this.basePath}/verifications/${encodeURIComponent(String(verificationId))}/verify`,
      {
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress,
      }
    );
  }
}
