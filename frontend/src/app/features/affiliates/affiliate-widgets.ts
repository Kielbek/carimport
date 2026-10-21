import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { EMPTY, catchError, of, switchMap } from 'rxjs';
import { AffiliateOffer } from '../../core/api/api.models';
import { CarImportApi } from '../../core/api/carimport-api';
import { LanguageService } from '../../core/i18n/language.service';
import { Icon } from '../../shared/icon/icon';
import { IconName } from '../../shared/icon/icons';
import { CalculatorStore } from '../calculator/calculator.store';

const ICONS: Record<AffiliateOffer['kind'], IconName> = { CURRENCY_EXCHANGE: 'exchange', VIN_CHECK: 'search', FINANCING: 'wallet' };

/** Contextual affiliate offers (depend on origin, destination and language). Links are marked sponsored. */
@Component({
  selector: 'app-affiliate-widgets',
  imports: [TranslatePipe, Icon],
  template: `
    @if (offers().length) {
      <section class="mt-10" animate.enter="reveal-enter">
        <h2 class="label">{{ 'affiliate.title' | translate }}</h2>
        <div class="grid gap-3 sm:grid-cols-3">
          @for (o of offers(); track o.id) {
            <a class="card card-hover group flex flex-col p-5" rel="sponsored noopener" target="_blank"
               [href]="o.href + '?locale=' + lang.current() + '&subId=' + (store.frozenQuote()?.quoteId ?? '')">
              <span class="flex items-center justify-between">
                <app-icon [name]="icons[o.kind]" [size]="24" class="text-brand-text" />
                <span class="text-[10px] uppercase tracking-wider text-muted">{{ 'affiliate.sponsored' | translate }}</span>
              </span>
              <span class="mt-4 font-semibold">{{ 'affiliate.' + o.kind | translate }}</span>
              <span class="mt-1 text-xs text-muted">{{ 'affiliate.' + o.kind + '_HINT' | translate }}</span>
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
    (isPlatformBrowser(inject(PLATFORM_ID)) ? toObservable(this.context) : EMPTY).pipe(
      switchMap((c) => this.api.affiliates(c.origin, c.country, c.lang).pipe(catchError(() => of([])))),
    ),
    { initialValue: [] as AffiliateOffer[] },
  );
}
