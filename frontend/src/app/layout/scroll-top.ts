import { afterNextRender, Component, DestroyRef, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Icon } from '../shared/icon/icon';
import { NewsletterCard } from './newsletter-popup';

/** Back-to-top button in the bottom-right corner of the content pages, after a screen and a half of scrolling. */
@Component({
  selector: 'app-scroll-top',
  imports: [TranslatePipe, Icon],
  template: `
    @if (visible() && !popup.open()) {
      <button type="button" (click)="toTop()" [attr.aria-label]="'layout.toTop' | translate" [title]="'layout.toTop' | translate"
              animate.enter="reveal-enter" animate.leave="reveal-leave"
              class="fixed bottom-4 right-4 z-30 grid size-12 place-items-center rounded-full bg-brand text-brand-ink shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 sm:bottom-6 sm:right-6">
        <app-icon name="arrow-up" [size]="22" [stroke]="2.25" />
      </button>
    }
  `,
})
export class ScrollTop {
  /** Hidden while the newsletter card occupies the same corner. */
  protected readonly popup = inject(NewsletterCard);
  protected readonly visible = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const onScroll = () => this.visible.set(window.scrollY > window.innerHeight * 1.5);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }

  protected toTop(): void {
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  }
}
