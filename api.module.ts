import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { CommonService } from './api/common.service';
import { ConnectionsService } from './api/connections.service';
import { CredentialsService } from './api/credentials.service';
import { DefinitionsService } from './api/definitions.service';
import { MessagingService } from './api/messaging.service';
import { TenantsService } from './api/tenants.service';
import { VerificationsService } from './api/verifications.service';
import { WebhooksService } from './api/webhooks.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    CommonService,
    ConnectionsService,
    CredentialsService,
    DefinitionsService,
    MessagingService,
    TenantsService,
    VerificationsService,
    WebhooksService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
