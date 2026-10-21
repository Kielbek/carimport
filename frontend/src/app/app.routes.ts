import { inject } from '@angular/core';
import { Route, Routes } from '@angular/router';
import { languageGuard } from './core/i18n/language.guard';
import { LanguageService } from './core/i18n/language.service';
import { SLUGS } from './core/routing/paths';

const calculator = () => import('./features/calculator/calculator-page').then((m) => m.CalculatorPage);
const privacy = () => import('./features/legal/privacy-page').then((m) => m.PrivacyPage);

/** Every language's slug resolves to the same page, e.g. /pl/kalkulator, /en/calculator, /de/rechner. */
const localized = (slugs: Record<string, string>, load: NonNullable<Route['loadComponent']>, page: string): Routes =>
  [...new Set(Object.values(slugs))].map((path) => ({ path, loadComponent: load, data: { page } }));

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: () => inject(LanguageService).detect() },
  {
    path: ':lang',
    canActivate: [languageGuard],
    loadComponent: () => import('./layout/shell').then((m) => m.Shell),
    children: [
      { path: '', loadComponent: () => import('./features/home/home-page').then((m) => m.HomePage), data: { page: 'home' } },
      ...localized(SLUGS.calculator, calculator, 'calculator'),
      ...localized(SLUGS.privacy, privacy, 'privacy'),
      // Stripe cancel_url returns here; the wizard restores its state from session storage
      { path: 'result/:quoteId', loadComponent: calculator, data: { page: 'calculator', noindex: true } },
      {
        path: 'report/:orderId',
        loadComponent: () => import('./features/report/report-page').then((m) => m.ReportPage),
        data: { page: 'report' },
      },
      { path: '**', redirectTo: '' },
    ],
  },
];
