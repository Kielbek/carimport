import { Component } from '@angular/core';

/** Brand mark: a route arcing across the ocean from the start to the destination pin, and the wordmark beside it. */
@Component({
  selector: 'app-logo',
  template: `
    <svg width="34" height="34" viewBox="1 0 66 66" aria-hidden="true" class="shrink-0">
      <path d="M10 50 Q30 4 52 30" fill="none" stroke="var(--brand)" stroke-width="7" stroke-linecap="round" />
      <path d="M10 50 Q30 4 52 30" fill="none" stroke="var(--brand-ink)" stroke-opacity=".55" stroke-width="1.6" stroke-dasharray="3 5" stroke-linecap="round" />
      <circle cx="10" cy="50" r="6" fill="currentColor" />
      <path d="M52 61C46 53 41 49 41 42A11 11 0 1 1 63 42C63 49 58 53 52 61Z" fill="currentColor" />
      <circle cx="52" cy="42" r="4" fill="var(--brand)" />
    </svg>
    <span class="text-[25px] font-extrabold tracking-[-0.02em]">carglo</span>
  `,
  host: { class: 'inline-flex items-center gap-2 leading-none' },
})
export class Logo {}
