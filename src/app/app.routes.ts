import { Routes } from '@angular/router';
import { NoTg } from './features/no-tg/no-tg';
import { App } from './app';
import { Main } from './features/main/main';

export const routes: Routes = [
    {
        path: 'noTg',
        component: NoTg
    },
    {
        path: '',
        component: Main
    }
];
