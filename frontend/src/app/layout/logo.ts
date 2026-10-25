import { Component } from '@angular/core';

/** Brand mark: a map pin with a car - the trip from the auction yard to the buyer's door - and the wordmark beside it. */
@Component({
  selector: 'app-logo',
  template: `
    <svg width="25" height="34" viewBox="10 3 44 59" aria-hidden="true" class="shrink-0">
      <path d="M32 61C22 49 11 39 11 25A21 21 0 1 1 53 25C53 39 42 49 32 61Z" fill="var(--brand)" />
      <path d="M20 31L23 21Q24 18 27 18L37 18Q40 18 41 21L44 31Q46 32 46 35L46 40L18 40L18 35Q18 32 20 31Z" fill="var(--brand-ink)" />
      <path d="M24 29L26 22L38 22L40 29Z" fill="var(--brand)" />
      <circle cx="23" cy="35" r="2.2" fill="var(--brand)" />
      <circle cx="41" cy="35" r="2.2" fill="var(--brand)" />
      <rect x="19" y="40" width="6" height="4" rx="1.5" fill="var(--brand-ink)" />
      <rect x="39" y="40" width="6" height="4" rx="1.5" fill="var(--brand-ink)" />
    </svg>
    <span class="text-[25px] font-extrabold tracking-[-0.02em]">carglo</span>
  `,
  host: { class: 'inline-flex items-center gap-2 leading-none' },
})
export class Logo {}
