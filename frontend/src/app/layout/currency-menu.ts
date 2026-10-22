import { Component, ElementRef, computed, inject, input, output, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  CURRENCY_FLAG,
  DISPLAY_CURRENCIES,
  DisplayCurrency,
  currencyName,
  currencySymbol,
} from '../core/currency/currencies';
import { LanguageService } from '../core/i18n/language.service';
import { Flag } from '../shared/flag/flag';
import { Icon } from '../shared/icon/icon';

const EU_CURRENCIES: DisplayCurrency[] = ['EUR', 'PLN', 'CZK', 'HUF', 'RON', 'SEK', 'DKK'];

/**
 * Result currency picker: says what it is for ("result currency"), shows flag, code and symbol, and lists every
 * option with its full name in the UI language, so "DKK" is never a guess.
 */
@Component({
  selector: 'app-currency-menu',
  imports: [TranslatePipe, Flag, Icon],
  template: `
    <button type="button" (click)="open.set(!open())" [attr.aria-expanded]="open()" aria-haspopup="listbox"
            [attr.aria-label]="('currency.label' | translate) + ': ' + current().name"
            class="flex h-11 items-center gap-2 rounded-[4px] border border-line bg-panel px-2.5 text-left sm:gap-2.5 sm:px-3 transition hover:border-brand">
      <app-flag [code]="current().flag" class="w-6" />
      <span class="leading-tight">
        <span class="hidden text-[10px] font-semibold uppercase tracking-[0.08em] text-muted sm:block">{{ 'currency.label' | translate }}</span>
        <span class="block whitespace-nowrap text-sm font-bold">{{ value() }} <span class="font-medium text-muted">· {{ current().symbol }}</span></span>
      </span>
      <app-icon name="chevron-down" [size]="14" class="text-muted transition" [class.rotate-180]="open()" />
    </button>
    @if (open()) {
      <div class="reveal-enter fixed inset-x-4 top-[4.5rem] z-40 overflow-hidden sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:w-[22rem] rounded-[4px] border border-line bg-panel shadow-2xl"
           animate.leave="reveal-leave">
        <div class="border-b border-line px-4 py-3">
          <p class="text-sm font-bold">{{ 'currency.title' | translate }}</p>
          <p class="mt-1 text-xs leading-snug text-muted">{{ 'currency.hint' | translate }}</p>
        </div>
        <div class="max-h-[60vh] overflow-y-auto py-1" role="listbox" [attr.aria-label]="'currency.label' | translate">
          @for (group of groups(); track group.key) {
            <p class="px-4 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">{{ 'currency.' + group.key | translate }}</p>
            @for (c of group.items; track c.code) {
              <button type="button" role="option" [attr.aria-selected]="c.code === value()" (click)="pick(c.code)"
                      class="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition hover:bg-panel-2"
                      [class.bg-brand/10]="c.code === value()">
                <app-flag [code]="c.flag" class="w-6" />
                <span class="w-11 font-bold">{{ c.code }}</span>
                <span class="min-w-0 flex-1 truncate text-fg/85">{{ c.name }}</span>
                <span class="text-muted">{{ c.symbol }}</span>
                @if (c.code === value()) { <app-icon name="check" [size]="16" [stroke]="2.5" class="text-brand-text" /> }
              </button>
            }
          }
        </div>
      </div>
    }
  `,
  host: { class: 'relative', '(document:click)': 'onDocumentClick($event)', '(document:keydown.escape)': 'open.set(false)' },
})
export class CurrencyMenu {
  readonly value = input.required<DisplayCurrency>();
  readonly changed = output<DisplayCurrency>();

  private readonly lang = inject(LanguageService);
  private readonly host = inject(ElementRef<HTMLElement>);
  protected readonly open = signal(false);

  private readonly all = computed(() =>
    DISPLAY_CURRENCIES.map((code) => ({
      code,
      flag: CURRENCY_FLAG[code],
      name: currencyName(code, this.lang.locale()),
      symbol: currencySymbol(code, this.lang.locale()),
    })),
  );
  protected readonly current = computed(() => this.all().find((c) => c.code === this.value()) ?? this.all()[0]);
  protected readonly groups = computed(() => [
    { key: 'groupEu', items: this.all().filter((c) => EU_CURRENCIES.includes(c.code)) },
    { key: 'groupOther', items: this.all().filter((c) => !EU_CURRENCIES.includes(c.code)) },
  ]);

  protected pick(code: DisplayCurrency): void {
    this.changed.emit(code);
    this.open.set(false);
  }

  protected onDocumentClick(event: Event): void {
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
    }
  }
}
