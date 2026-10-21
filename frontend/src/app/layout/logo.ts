import { Component } from '@angular/core';

/** Brand mark: the arc from the reference template, drawn in brand yellow with a blue lane. */
@Component({
  selector: 'app-logo',
  template: `
    <svg width="46" height="26" viewBox="0 0 57 30" fill="none" aria-hidden="true">
      <path d="M4 27C9 11 17 3 28 3C39 3 48 12 53 27" stroke="var(--brand)" stroke-width="5" stroke-linecap="round" />
      <path d="M17 27C20 13 24 6 31 3" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" />
    </svg>
    <span class="text-[15px] font-extrabold tracking-[0.08em]">CARIMPORT<span class="text-brand-text">.EU</span></span>
  `,
  host: { class: 'inline-flex items-center gap-2.5 leading-none' },
})
export class Logo {}
