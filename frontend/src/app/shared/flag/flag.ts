import { Component, computed, input } from '@angular/core';

/** ISO 3166 code of our domain values -> flag-icons file name. */
const ALIASES: Record<string, string> = { USA: 'us', CANADA: 'ca', JAPAN: 'jp', UAE: 'ae', UK: 'gb', GB: 'gb' };

/** Real SVG flag (flag-icons, MIT), self-hosted under /flags - no emoji, no third-party request. */
@Component({
  selector: 'app-flag',
  template: `<img [src]="src()" [alt]="alt()" width="4" height="3" loading="lazy" decoding="async"
                  class="h-full w-full rounded-[2px] object-cover shadow-[0_0_0_1px_rgb(0_0_0/0.12)]" />`,
  host: { class: 'inline-block aspect-[4/3] shrink-0 overflow-hidden' },
})
export class Flag {
  readonly code = input.required<string>();
  readonly alt = input('');
  protected readonly src = computed(() => `/flags/${ALIASES[this.code()] ?? this.code().toLowerCase()}.svg`);
}
