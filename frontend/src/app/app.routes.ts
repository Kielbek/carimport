import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { languageGuard } from './core/i18n/language.guard';
import { LanguageService } from './core/i18n/language.service';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: () => inject(LanguageService).detect() },
  {
    path: ':lang',
    canActivate: [languageGuard],
    children: [
      { path: '', loadComponent: () => import('./features/calculator/calculator-page').then((m) => m.CalculatorPage) },
      // Stripe cancel_url returns here; the wizard restores its state from session storage
      {
        path: 'result/:quoteId',
        loadComponent: () => import('./features/calculator/calculator-page').then((m) => m.CalculatorPage),
      },
      {
        path: 'report/:orderId',
        loadComponent: () => import('./features/report/report-page').then((m) => m.ReportPage),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
