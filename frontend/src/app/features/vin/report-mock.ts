import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

const ROWS: readonly { date: string; key: string; bad?: boolean; photos?: boolean }[] = [
  { date: '2020-03', key: 'r1' },
  { date: '2022-08', key: 'r2' },
  { date: '2023-09', key: 'r3', bad: true },
  { date: '2023-10', key: 'r4', bad: true },
  { date: '2023-11', key: 'r5', photos: true },
];

/** An illustrative vehicle history report (not a real one): a dated timeline with damage, title brand and auction photos. */
@Component({
  selector: 'app-report-mock',
  imports: [TranslatePipe],
  template: `
    <figure class="mt-8">
      <div class="overflow-hidden rounded-[8px] border border-line bg-panel">
        <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line bg-panel-2 px-4 py-2.5">
          <span class="text-sm font-extrabold">{{ 'vinCompare.mock.title' | translate }}</span>
          <span class="font-mono text-xs font-bold tracking-wide">VIN 1FA6P8CF7L5123456</span>
        </div>
        <ol class="px-4 py-3 sm:px-5">
          @for (r of rows; track r.key; let last = $last) {
            <li class="relative grid grid-cols-[4.5rem_minmax(0,1fr)] gap-3 pb-3" [class.pb-0]="last">
              <span class="pt-0.5 font-mono text-xs text-muted tabular-nums">{{ r.date }}</span>
              <div class="relative border-l-2 pl-4" [class.border-line]="!r.bad" [class.border-danger]="r.bad">
                <span class="absolute -left-[7px] top-1 size-3 rounded-full border-2 border-panel"
                      [class]="r.bad ? 'bg-danger' : 'bg-[var(--cat-2)]'"></span>
                <p class="text-sm" [class.font-semibold]="r.bad" [class.text-danger]="r.bad">{{ 'vinCompare.mock.' + r.key | translate }}</p>
                @if (r.photos) {
                  <div class="mt-2 flex gap-2">
                    @for (n of [1, 2, 3]; track n) {
                      <svg viewBox="0 0 64 44" class="h-11 w-16 rounded-[4px] bg-panel-2 text-[var(--cat-4)]" aria-hidden="true">
                        <path d="M10 30 L13 23 Q15 20 22 19 Q28 12 36 12 L44 12 Q50 13 54 19 L56 21 Q58 23 58 27 L58 30 Z" fill="currentColor" />
                        <circle cx="21" cy="31" r="4.5" fill="var(--cat-2)" /><circle cx="48" cy="31" r="4.5" fill="var(--cat-2)" />
                      </svg>
                    }
                  </div>
                }
              </div>
            </li>
          }
        </ol>
      </div>
      <figcaption class="mt-2 text-xs text-muted">{{ 'vinCompare.mock.caption' | translate }}</figcaption>
    </figure>
  `,
})
export class ReportMock {
  protected readonly rows = ROWS;
}
