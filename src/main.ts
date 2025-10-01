import { bootstrapApplication } from '@angular/platform-browser';

import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import {routes} from './app/app.routes';
import {provideRouter} from '@angular/router';




bootstrapApplication(App, {
  providers: [
    provideHttpClient(),provideRouter(routes)
  ]
});
