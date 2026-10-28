import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/** A sample VIN (valid check digit) split into its parts, each with a short label - the "how to read a VIN" figure. */
const SAMPLE = '1FA6P8CF7L5123456';
const PARTS: readonly { from: number; to: number; key: string; tone: string }[] = [
  { from: 0, to: 1, key: 'country', tone: 'bg-brand text-[#101011]' },
  { from: 1, to: 3, key: 'maker', tone: 'bg-[var(--cat-1)] text-[var(--bg)]' },
  { from: 3, to: 8, key: 'vds', tone: 'bg-[var(--cat-2)] text-white' },
  { from: 8, to: 9, key: 'check', tone: 'bg-brand text-[#101011]' },
  { from: 9, to: 10, key: 'year', tone: 'bg-[var(--cat-1)] text-[var(--bg)]' },
  { from: 10, to: 11, key: 'plant', tone: 'bg-[var(--cat-2)] text-white' },
  { from: 11, to: 17, key: 'serial', tone: 'bg-[var(--cat-4)] text-[#101011]' },
];

@Component({
  selector: 'app-vin-anatomy',
  imports: [TranslatePipe],
  template: `
    <figure class="mt-6 rounded-[8px] border border-line bg-panel p-4 sm:p-6">
      <div class="flex flex-wrap justify-center gap-1 font-mono text-lg font-extrabold sm:text-2xl">
        @for (p of parts; track p.key) {
          <div class="flex flex-col items-center">
            <span class="rounded-[4px] px-1.5 py-1 tracking-[0.12em] sm:px-2" [class]="p.tone">{{ sample.slice(p.from, p.to) }}</span>
            <span class="mt-1.5 max-w-[5.5rem] text-center text-[10px] font-semibold uppercase leading-tight tracking-wide text-muted sm:text-[11px]">
              {{ 'vinPage.anatomy.' + p.key | translate }}
            </span>
          </div>
        }
      </div>
      <figcaption class="mt-4 text-center text-xs text-muted">{{ 'vinPage.anatomy.caption' | translate: { vin: sample } }}</figcaption>
    </figure>
  `,
})
export class VinAnatomy {
  protected readonly sample = SAMPLE;
  protected readonly parts = PARTS;
}
