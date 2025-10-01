import { Routes } from '@angular/router';
import { OpenInTelegram } from './pages/open-in-telegram/open-in-telegram';
import {App} from './app';


export const routes: Routes = [
  { path: '', component: App },
  { path: 'open-in-telegram', component: OpenInTelegram },
  { path: '**', redirectTo: '' }
];
