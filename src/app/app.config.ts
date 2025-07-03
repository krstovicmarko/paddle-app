import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { jwtInterceptor } from './jwt.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideCharts(withDefaultRegisterables()),
     provideCharts(withDefaultRegisterables()), provideHttpClient(withInterceptors([jwtInterceptor]))]
};
