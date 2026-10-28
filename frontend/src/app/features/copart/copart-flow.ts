import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Icon } from '../../shared/icon/icon';

/** The Copart purchase from Europe as a timeline: step, what happens, typical duration. */
const STEPS = [
  { key: 's1', icon: 'search' },
  { key: 's2', icon: 'shield' },
  { key: 's3', icon: 'wallet' },
  { key: 's4', icon: 'route' },
  { key: 's5', icon: 'ship' },
  { key: 's6', icon: 'landmark' },
  { key: 's7', icon: 'document' },
] as const;

@Component({
  selector: 'app-copart-flow',
  imports: [TranslatePipe, Icon],
  template: `
    <figure class="mt-6 rounded-[8px] border border-line bg-panel p-4 sm:p-6">
      <figcaption class="text-sm font-bold">{{ 'copart.flow.title' | translate }}</figcaption>
      <ol class="mt-4 space-y-0">
        @for (s of steps; track s.key; let last = $last; let i = $index) {
          <li class="relative flex gap-4 pb-5" [class.pb-0]="last">
            @if (!last) { <span class="absolute left-[19px] top-10 h-[calc(100%-2.5rem)] w-0.5 bg-line"></span> }
            <span class="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-[#101011]">
              <app-icon [name]="s.icon" [size]="18" />
            </span>
            <div class="min-w-0 flex-1 pt-1">
              <div class="flex flex-wrap items-baseline justify-between gap-x-3">
                <p class="font-bold">{{ i + 1 }}. {{ 'copart.flow.' + s.key + '.title' | translate }}</p>
                <p class="text-xs font-semibold tabular-nums text-brand-text">{{ 'copart.flow.' + s.key + '.time' | translate }}</p>
              </div>
              <p class="mt-0.5 text-sm text-fg/80">{{ 'copart.flow.' + s.key + '.text' | translate }}</p>
            </div>
          </li>
        }
      </ol>
    </figure>
  `,
})
export class CopartFlow {
  protected readonly steps = STEPS;
}
