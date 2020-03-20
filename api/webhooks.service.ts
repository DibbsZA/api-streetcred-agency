import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { WebhookContract } from '../model/webhookContract';
import { WebhookContractArray } from '../model/webhookContractArray';
import { WebhookParameters } from '../model/webhookParameters';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';

@Injectable()
export class WebhooksService {
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
   * Create new webhook
   * Create new webhook
   * @param webhookParameters
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createWebhook(
    webhookParameters?: WebhookParameters,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<WebhookContract>;
  public createWebhook(
    webhookParameters?: WebhookParameters,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<WebhookContract>>;
  public createWebhook(
    webhookParameters?: WebhookParameters,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<WebhookContract>>;
  public createWebhook(
    webhookParameters?: WebhookParameters,
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

    return this.httpClient.post<WebhookContract>(`${this.basePath}/webhooks`, webhookParameters, {
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Disables a webhook
   * Disables a webhook
   * @param webhookId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public disableWebhook(webhookId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public disableWebhook(webhookId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public disableWebhook(webhookId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public disableWebhook(webhookId: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (webhookId === null || webhookId === undefined) {
      throw new Error('Required parameter webhookId was null or undefined when calling disableWebhook.');
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

    return this.httpClient.put<any>(`${this.basePath}/webhooks/${encodeURIComponent(String(webhookId))}/disable`, null, {
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Enables a webhook
   * Enables a webhook
   * @param webhookId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public enableWebhook(webhookId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public enableWebhook(webhookId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public enableWebhook(webhookId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public enableWebhook(webhookId: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (webhookId === null || webhookId === undefined) {
      throw new Error('Required parameter webhookId was null or undefined when calling enableWebhook.');
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

    return this.httpClient.put<any>(`${this.basePath}/webhooks/${encodeURIComponent(String(webhookId))}/enable`, null, {
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * List all webhooks
   * List all webhooks
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public listWebhooks(observe?: 'body', reportProgress?: boolean): Observable<WebhookContractArray>;
  public listWebhooks(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<WebhookContractArray>>;
  public listWebhooks(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<WebhookContractArray>>;
  public listWebhooks(observe: any = 'body', reportProgress: boolean = false): Observable<any> {
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

    return this.httpClient.get<WebhookContractArray>(`${this.basePath}/webhooks`, {
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Remove registered webhook
   * Remove registered webhook
   * @param webhookId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public removeWebhook(webhookId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public removeWebhook(webhookId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public removeWebhook(webhookId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public removeWebhook(webhookId: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (webhookId === null || webhookId === undefined) {
      throw new Error('Required parameter webhookId was null or undefined when calling removeWebhook.');
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

    return this.httpClient.delete<any>(`${this.basePath}/webhooks/${encodeURIComponent(String(webhookId))}`, {
      withCredentials: this.configuration.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
}
