import { Component, input } from '@angular/core';

/**
 * Studio-style coupé illustration with brand-coloured rim light, used in the hero until a licensed photo is configured
 * (SITE.heroImage). Pure SVG: crisp at any size, ~3 kB, no network request.
 */
@Component({
  selector: 'app-car-visual',
  template: `
    <svg viewBox="0 0 900 380" class="h-auto w-full overflow-visible" role="img" [attr.aria-label]="label()">
      <defs>
        <linearGradient [attr.id]="id('body')" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#2a3246" />
          <stop offset="0.45" stop-color="#151a26" />
          <stop offset="1" stop-color="#07090d" />
        </linearGradient>
        <linearGradient [attr.id]="id('rim')" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#3d7bff" />
          <stop offset="0.55" stop-color="#ffc61a" />
          <stop offset="1" stop-color="#ffc61a" stop-opacity="0.2" />
        </linearGradient>
        <linearGradient [attr.id]="id('glass')" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#3d7bff" stop-opacity="0.35" />
          <stop offset="0.5" stop-color="#0b0f18" stop-opacity="0.95" />
          <stop offset="1" stop-color="#ffc61a" stop-opacity="0.18" />
        </linearGradient>
        <radialGradient [attr.id]="id('floor')" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stop-color="#3d7bff" stop-opacity="0.45" />
          <stop offset="0.6" stop-color="#3d7bff" stop-opacity="0.08" />
          <stop offset="1" stop-color="#3d7bff" stop-opacity="0" />
        </radialGradient>
        <radialGradient [attr.id]="id('wheel')" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.55" stop-color="#9aa3b4" />
          <stop offset="0.85" stop-color="#2b3140" />
          <stop offset="1" stop-color="#11141b" />
        </radialGradient>
        <linearGradient [attr.id]="id('fade')" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fff" stop-opacity="0.35" />
          <stop offset="0.7" stop-color="#fff" stop-opacity="0" />
        </linearGradient>
        <mask [attr.id]="id('reflect')"><rect x="0" y="270" width="900" height="110" [attr.fill]="url('fade')" /></mask>
        <filter [attr.id]="id('glow')" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <ellipse cx="450" cy="272" rx="430" ry="34" [attr.fill]="url('floor')" />

      <!-- reflection -->
      <g [attr.mask]="url('reflect')" transform="translate(0 544) scale(1 -1)" opacity="0.5">
        <path [attr.d]="body" [attr.fill]="url('body')" />
      </g>

      <!-- body -->
      <path [attr.d]="body" [attr.fill]="url('body')" />
      <path [attr.d]="glass" [attr.fill]="url('glass')" stroke="#ffffff" stroke-opacity="0.08" />
      <path d="M582 100 L578 152" stroke="#05070b" stroke-width="7" />
      <!-- shoulder line & rim light -->
      <path d="M120 216 C320 204 600 200 852 204" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="16" />
      <path d="M118 212 C300 199 560 195 852 199" fill="none" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1.5" />
      <path d="M146 252 A70 70 0 0 1 284 252 M631 252 A70 70 0 0 1 769 252" fill="none" stroke="#ffc61a" stroke-opacity="0.35" stroke-width="2" />
      <path [attr.d]="roofline" fill="none" [attr.stroke]="url('rim')" stroke-width="3" [attr.filter]="url('glow')" stroke-linecap="round" />
      <!-- lights -->
      <path d="M68 214 L150 202 L156 208 L74 222 Z" fill="#cfe0ff" [attr.filter]="url('glow')" />
      <path d="M806 172 L856 186 L859 196 L812 186 Z" fill="#ff3b5c" [attr.filter]="url('glow')" />
      <path d="M90 236 L170 232" stroke="#3d7bff" stroke-width="2" stroke-opacity="0.7" />
      <!-- door & handle -->
      <path d="M400 156 C398 200 400 228 412 246 M744 170 C750 200 748 228 740 246" fill="none" stroke="#000" stroke-opacity="0.55" stroke-width="2" />
      <path d="M612 180 h34" stroke="#9aa3b4" stroke-opacity="0.5" stroke-width="4" stroke-linecap="round" />

      @for (w of wheels; track w) {
        <g [attr.transform]="'translate(' + w + ' 250)'">
          <circle r="58" fill="#05070b" />
          <circle r="54" fill="#0c0f15" stroke="#1d2230" stroke-width="2" />
          <circle r="38" [attr.fill]="url('wheel')" />
          @for (a of spokes; track a) {
            <path [attr.transform]="'rotate(' + a + ')'" d="M-4 -9 L-8 -36 L8 -36 L4 -9 Z" fill="#0b0e14" />
          }
          <circle r="9" fill="#1a1f2b" stroke="#ffc61a" stroke-opacity="0.6" stroke-width="1.5" />
          <path d="M-44 -20 A48 48 0 0 1 10 -47" fill="none" stroke="#ffc61a" stroke-opacity="0.55" stroke-width="2" />
        </g>
      }
    </svg>
  `,
  host: { class: 'block' },
})
export class CarVisual {
  readonly label = input('');
  private static seq = 0;
  private readonly uid = `car${CarVisual.seq++}`;

  protected readonly wheels = [215, 700];
  protected readonly spokes = [0, 72, 144, 216, 288];
  protected readonly body =
    'M60 236 C58 220 68 208 94 202 L214 184 C266 172 332 160 392 148 C440 118 480 98 530 92 L610 92 C672 96 742 128 812 168 ' +
    'C836 172 852 180 858 192 C864 208 864 224 860 238 L846 248 L762 250 A62 62 0 0 0 638 250 L277 250 A62 62 0 0 0 153 250 ' +
    'L78 250 C66 248 60 244 60 236 Z';
  protected readonly glass = 'M412 150 C452 121 486 104 532 100 L606 100 C660 104 718 130 772 160 Z';
  protected readonly roofline = 'M154 196 C266 172 332 160 392 148 C440 118 480 98 530 92 L610 92 C672 96 742 128 812 168 C836 172 852 180 858 192';

  protected id(name: string): string {
    return `${this.uid}-${name}`;
  }

  protected url(name: string): string {
    return `url(#${this.id(name)})`;
  }
}
