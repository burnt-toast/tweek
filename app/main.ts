import 'rxjs/Rx';
import { bootstrap }  from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';
import { AppComponent } from './app.component';
import { HTTP_PROVIDERS } from  '@angular/http';

bootstrap(AppComponent,  [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS
]);
