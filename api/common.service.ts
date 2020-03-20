import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { CommonUploadPost200ApplicationJsonResponse } from '../model/commonUploadPost200ApplicationJsonResponse';
import { NetworkContractArray } from '../model/networkContractArray';
import { NetworkTxnAgreementContract } from '../model/networkTxnAgreementContract';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';

@Injectable()
export class CommonService {
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
   * Accept the latest transaction author agreement on the specified network.
   * Accept the latest transaction author agreement on the specified network.
   * @param networkId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public acceptTransactionAuthorAgreement(networkId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public acceptTransactionAuthorAgreement(
    networkId: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public acceptTransactionAuthorAgreement(
    networkId: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public acceptTransactionAuthorAgreement(
    networkId: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (networkId === null || networkId === undefined) {
      throw new Error('Required parameter networkId was null or undefined when calling acceptTransactionAuthorAgreement.');
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

    return this.httpClient.put<any>(
      `${this.basePath}/common/networks/${encodeURIComponent(String(networkId))}/txnAuthorAgreement`,
      null,
      {
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress,
      }
    );
  }

  /**
   * Return the latest transaction author agreement and acceptance methods if one   is set on the network with the specified {networkId}
   * Return the latest transaction author agreement and acceptance methods if one   is set on the network with the specified {networkId}
   * @param networkId Network identifier
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getTransactionAuthorAgreement(
    networkId: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<NetworkTxnAgreementContract>;
  public getTransactionAuthorAgreement(
    networkId: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<NetworkTxnAgreementContract>>;
  public getTransactionAuthorAgreement(
    networkId: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<NetworkTxnAgreementContract>>;
  public getTransactionAuthorAgreement(
    networkId: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (networkId === null || networkId === undefined) {
      throw new Error('Required parameter networkId was null or undefined when calling getTransactionAuthorAgreement.');
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
    const httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.get<NetworkTxnAgreementContract>(
      `${this.basePath}/common/networks/${encodeURIComponent(String(networkId))}/txnAuthorAgreement`,
      {
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress,
      }
    );
  }

  /**
   * List available ledger networks
   * Returns a list of available ledger networks. Some networks are available based on your subscription.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public listNetworks(observe?: 'body', reportProgress?: boolean): Observable<NetworkContractArray>;
  public listNetworks(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<NetworkContractArray>>;
  public listNetworks(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<NetworkContractArray>>;
  public listNetworks(observe: any = 'body', reportProgress: boolean = false): Observable<any> {
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
    const httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.get<NetworkContractArray>(`${this.basePath}/common/networks`, {
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Upload image
   * Upload an image and return a URL with the static remote location
   * @param uploadedFiles
   * @param filename
   * @param contentType
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public uploadImage(
    uploadedFiles: Blob,
    filename?: string,
    contentType?: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<CommonUploadPost200ApplicationJsonResponse>;
  public uploadImage(
    uploadedFiles: Blob,
    filename?: string,
    contentType?: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<CommonUploadPost200ApplicationJsonResponse>>;
  public uploadImage(
    uploadedFiles: Blob,
    filename?: string,
    contentType?: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<CommonUploadPost200ApplicationJsonResponse>>;
  public uploadImage(
    uploadedFiles: Blob,
    filename?: string,
    contentType?: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (uploadedFiles === null || uploadedFiles === undefined) {
      throw new Error('Required parameter uploadedFiles was null or undefined when calling uploadImage.');
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
    const httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = ['multipart/form-data'];

    const canConsumeForm = this.canConsumeForm(consumes);

    let formParams: { append(param: string, value: any): void };
    let useForm = false;
    const convertFormParamsToString = false;
    // use FormData to transmit files using content-type "multipart/form-data"
    // see https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data
    useForm = canConsumeForm;
    if (useForm) {
      formParams = new FormData();
    } else {
      formParams = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
    }

    if (uploadedFiles !== undefined) {
      //formParams =
      formParams.append('uploadedFiles', uploadedFiles as any); // || formParams;
    }
    if (filename !== undefined) {
      //formParams =
      formParams.append('filename', filename as any); // || formParams;
    }
    if (contentType !== undefined) {
      //formParams =
      formParams.append('contentType', contentType as any); // || formParams;
    }

    return this.httpClient.post<CommonUploadPost200ApplicationJsonResponse>(
      `${this.basePath}/common/upload`,
      convertFormParamsToString ? formParams.toString() : formParams,
      {
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress,
      }
    );
  }
}
