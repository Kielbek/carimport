import { Directive, ElementRef, effect, inject, input, untracked } from '@angular/core';

/**
 * Animates a number from its previous to its new value (ease-out, 600 ms) whenever the bound signal input changes -
 * the "slot machine" effect on the live price range. Respects prefers-reduced-motion.
 */
@Directive({ selector: '[appCountUp]' })
export class CountUpDirective {
  readonly appCountUp = input.required<number>();
  readonly currency = input.required<string>();
  readonly locale = input.required<string>();

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private shown = 0;
  private frame = 0;

  constructor() {
    effect(() => {
      const target = this.appCountUp();
      const format = new Intl.NumberFormat(this.locale(), {
        style: 'currency',
        currency: this.currency(),
        maximumFractionDigits: 0,
      });
      untracked(() => this.animate(target, format));
    });
  }

  private animate(target: number, format: Intl.NumberFormat): void {
    cancelAnimationFrame(this.frame);
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const from = this.shown;
    if (reduced || from === target) {
      this.render(target, format);
      return;
    }
    const start = performance.now();
    const duration = 600;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      this.render(from + (target - from) * eased, format);
      if (t < 1) {
        this.frame = requestAnimationFrame(tick);
      }
    };
    this.frame = requestAnimationFrame(tick);
  }

  private render(value: number, format: Intl.NumberFormat): void {
    this.shown = value;
    this.el.nativeElement.textContent = format.format(Math.round(value));
  }
}
