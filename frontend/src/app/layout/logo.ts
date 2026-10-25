import { Component } from '@angular/core';

/** Brand mark from the template: white arc with the inner lane in the brand colour, wordmark underneath. */
@Component({
  selector: 'app-logo',
  template: `
    <svg width="57" height="29" viewBox="0 0 57 29" fill="none" aria-hidden="true">
      <path d="M4 26C9 10 17 2 28 2C39 2 48 11 53 26" stroke="currentColor" stroke-width="5" stroke-linecap="round" />
      <path d="M16 26C19 12 24 4 31 2M31 2C35 8 39 16 41 26" stroke="var(--brand)" stroke-width="3" stroke-linecap="round" />
    </svg>
    <span class="mt-1 text-[15px] font-extrabold tracking-[0.06em]">CARGLO</span>
  `,
  host: { class: 'inline-flex flex-col items-center leading-none' },
})
export class Logo {}
