import { Component, computed, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, of, switchMap } from 'rxjs';
import { AffiliateOffer } from '../../core/api/api.models';
import { CarImportApi } from '../../core/api/carimport-api';
import { LanguageService } from '../../core/i18n/language.service';
import { CalculatorStore } from '../calculator/calculator.store';

const ICONS: Record<AffiliateOffer['kind'], string> = { CURRENCY_EXCHANGE: '💱', VIN_CHECK: '🔎', FINANCING: '🏦' };

/** Contextual affiliate offers (depend on origin, destination and language). Links are marked sponsored. */
@Component({
  selector: 'app-affiliate-widgets',
  imports: [TranslatePipe],
  template: `
    @if (offers().length) {
      <section class="mt-10">
        <h3 class="step-label">{{ 'affiliate.title' | translate }}</h3>
        <div class="grid gap-3 sm:grid-cols-3">
          @for (o of offers(); track o.id) {
            <a class="choice-card items-start text-left" rel="sponsored noopener" target="_blank"
               [href]="o.href + '?locale=' + lang.current() + '&subId=' + (store.frozenQuote()?.quoteId ?? '')">
              <span class="text-2xl">{{ icons[o.kind] }}</span>
              <span class="mt-1 font-semibold">{{ 'affiliate.' + o.kind | translate }}</span>
              <span class="text-xs text-slate-500">{{ 'affiliate.' + o.kind + '_HINT' | translate }}</span>
              <span class="mt-2 text-[10px] uppercase tracking-wide text-slate-400">{{ 'affiliate.sponsored' | translate }}</span>
            </a>
          }
        </div>
      </section>
    }
  `,
})
export class AffiliateWidgets {
  protected readonly store = inject(CalculatorStore);
  protected readonly lang = inject(LanguageService);
  private readonly api = inject(CarImportApi);
  protected readonly icons = ICONS;

  /** Only the inputs that change the offer set - dragging the slider must not refetch. */
  private readonly context = computed(
    () => ({ origin: this.store.state().originCountry, country: this.store.state().destinationCountry, lang: this.lang.current() }),
    { equal: (a, b) => a.origin === b.origin && a.country === b.country && a.lang === b.lang },
  );

  protected readonly offers = toSignal(
    toObservable(this.context).pipe(
      switchMap((c) => this.api.affiliates(c.origin, c.country, c.lang).pipe(catchError(() => of([])))),
    ),
    { initialValue: [] as AffiliateOffer[] },
  );
}
