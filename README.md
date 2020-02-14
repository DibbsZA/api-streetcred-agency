# api-streetcred-agency

Angular module to connect to the Streetcred.Id Agency API.

## Installation

```sh
npm install api-streetcred-agency --save
```

## General usage

In your Angular project:

First extend your `src/environments/*.ts` files by adding the corresponding base path:

```typescript
export const environment = {
  production: false,
  streetcredAgencyApiPath: 'https://api.streetcred.id/agency/v1',
  streetcredApiKey: 'Bearer <your auth key>',
  streetcredSubsKey: '<your subscription token>'
};
```

Note: The ApiModule is restricted to being instantiated once app wide.
This is to ensure that all services are treated as singletons.

In order to use multiple `ApiModules` you need to create an alias name when importing
the modules in order to avoid naming conflicts:

In the src/app/app.module.ts:

```typescript
import {
  ApiModule as StreetcredAgencyApiModule,
  BASE_PATH as SC_AGENCY_PATH,
  SC_API_KEY as SC_AGENCY_API_KEY,
  SC_SUBS_KEY as SC_AGENCY_SUBS_KEY
  } from 'api-streetcred-agency';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        StreetcredAgencyApiModule,
        // make sure to import the HttpClientModule in the AppModule only,
        // see https://github.com/angular/angular/issues/20575
        HttpClientModule
    ],
    { provide: SC_AGENCY_PATH, useValue: environment.streetcredAgencyApiPath },
    { provide: SC_AGENCY_API_KEY, useValue: environment.streetcredApiKey },
    { provide: SC_AGENCY_SUBS_KEY, useValue: environment.streetcredSubsKey }
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

In your components.

```typescript
import { DefaultApi as StreetcredAgencyDefaultApi } from 'api-streetcred-agency';

export class AppComponent {
  constructor(private apiGateway: StreetcredAgencyDefaultApi) { }
}
```
