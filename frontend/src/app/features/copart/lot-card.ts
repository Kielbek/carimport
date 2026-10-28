import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/** The fields as they appear on a US auction lot page (English there too) - explained in the "listing" section. */
const FIELDS: readonly [string, string, boolean?][] = [
  ['Primary damage', 'FRONT END', true],
  ['Secondary damage', 'MINOR DENT/SCRATCHES'],
  ['Odometer', '41,250 mi (ACTUAL)'],
  ['Title', 'SALVAGE (FL)', true],
  ['Highlights', 'RUN AND DRIVE'],
  ['Keys', 'YES'],
  ['Est. retail value', '$31,400'],
];

/** An illustrative auction lot card (not a real listing): car sketch with the damaged area, key fields and the bid. */
@Component({
  selector: 'app-lot-card',
  imports: [TranslatePipe],
  template: `
    <figure class="mt-5">
      <div class="overflow-hidden rounded-[8px] border border-line bg-panel">
        <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line bg-panel-2 px-4 py-2.5 text-xs">
          <span class="font-mono font-bold tracking-wide">LOT #41238517</span>
          <span class="font-extrabold uppercase">2020 Ford Mustang GT</span>
        </div>
        <div class="grid grid-cols-[minmax(0,1fr)] gap-4 p-4 sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] sm:p-5">
          <svg viewBox="0 0 240 100" class="h-auto w-full self-center text-fg" role="img" [attr.aria-label]="'copart.lot.alt' | translate">
            <path d="M8 66 L12 52 Q15 45 28 43 L66 39 Q88 20 118 18 L156 18 Q176 20 196 38 L222 44 Q233 47 233 57 L233 66 Q233 70 228 70 L206 70 A17 17 0 0 0 172 70 L74 70 A17 17 0 0 0 40 70 L13 70 Q8 70 8 66 Z"
                  fill="var(--panel-2)" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" />
            <path d="M74 40 Q92 25 117 24 L120 24 L120 40 Z M127 24 L154 24 Q170 26 184 40 L127 40 Z" fill="var(--cat-4)" opacity=".55" />
            <circle cx="57" cy="70" r="13" fill="var(--bg)" stroke="currentColor" stroke-width="2.2" />
            <circle cx="57" cy="70" r="5" fill="currentColor" />
            <circle cx="189" cy="70" r="13" fill="var(--bg)" stroke="currentColor" stroke-width="2.2" />
            <circle cx="189" cy="70" r="5" fill="currentColor" />
            <circle cx="224" cy="54" r="17" fill="var(--danger-soft)" stroke="var(--danger)" stroke-width="2" stroke-dasharray="4 3" />
            <path d="M216 47 L222 53 L218 56 L226 62" fill="none" stroke="var(--danger)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <dl class="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1 text-xs">
            @for (f of fields; track f[0]) {
              <dt class="text-muted">{{ f[0] }}</dt>
              <dd class="font-semibold" [class.text-danger]="f[2]">{{ f[1] }}</dd>
            }
          </dl>
        </div>
        <div class="flex flex-wrap items-center justify-between gap-2 border-t border-line px-4 py-3">
          <span class="text-xs text-muted">Current bid</span>
          <span class="text-lg font-extrabold tabular-nums text-brand-text">$14,200 USD</span>
        </div>
      </div>
      <figcaption class="mt-2 text-xs text-muted">{{ 'copart.lot.caption' | translate }}</figcaption>
    </figure>
  `,
})
export class LotCard {
  protected readonly fields = FIELDS;
}
