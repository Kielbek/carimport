import { inject } from '@angular/core';
import { Route, Routes } from '@angular/router';
import { languageGuard } from './core/i18n/language.guard';
import { LanguageService } from './core/i18n/language.service';
import { ALL_SECTION_SLUGS } from './core/routing/guide-paths';
import { SLUGS } from './core/routing/paths';

const calculator = () => import('./features/calculator/calculator-page').then((m) => m.CalculatorPage);
const guide = () => import('./features/guides/guide-page').then((m) => m.GuidePage);

/**
 * The SEO guides: /:lang/{section slug} (hub) and /:lang/{section slug}/{item slug}. Every language's section slug is
 * listed explicitly (prerendering needs static routes); GuidePage resolves the slugs for the active language.
 */
const guides: Routes = [...ALL_SECTION_SLUGS].flatMap((section) => [
  { path: section, loadComponent: guide, data: { page: 'guide', section } },
  { path: `${section}/:item`, loadComponent: guide, data: { page: 'guide', section } },
]);

const about = () => import('./features/about/about-page').then((m) => m.AboutPage);
const privacy = () => import('./features/legal/privacy-page').then((m) => m.PrivacyPage);

/** Every language's slug resolves to the same page, e.g. /pl/kalkulator, /en/calculator, /de/rechner. */
const localized = (slugs: Record<string, string>, load: NonNullable<Route['loadComponent']>, page: string): Routes =>
  [...new Set(Object.values(slugs))].map((path) => ({ path, loadComponent: load, data: { page } }));

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: () => inject(LanguageService).detect() },
  {
    path: ':lang',
    canActivate: [languageGuard],
    children: [
      // full-screen calculator: no site header/footer
      ...localized(SLUGS.calculator, calculator, 'calculator'),
      // Stripe cancel_url returns here; the wizard restores its state from session storage
      { path: 'result/:quoteId', loadComponent: calculator, data: { page: 'calculator', noindex: true } },
      {
        path: '',
        loadComponent: () => import('./layout/shell').then((m) => m.Shell),
        children: [
          { path: '', loadComponent: () => import('./features/home/home-page').then((m) => m.HomePage), data: { page: 'home' } },
          ...localized(SLUGS.about, about, 'about'),
          ...localized(SLUGS.privacy, privacy, 'privacy'),
          ...guides,
          {
            path: 'report/:orderId',
            loadComponent: () => import('./features/report/report-page').then((m) => m.ReportPage),
            data: { page: 'report' },
          },
          { path: '**', redirectTo: '' },
        ],
      },
    ],
  },
];
