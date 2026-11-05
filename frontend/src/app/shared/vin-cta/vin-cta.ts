import { Component, computed, inject, input, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AnalyticsService } from '../../core/analytics/analytics.service';
import { SITE } from '../../core/site.config';
import { Icon } from '../icon/icon';

/**
 * "Check the vehicle history before you buy" - the referral link and discount code of SITE.vinPartner. Renders nothing
 * when no partner is configured, so the provider can be swapped or switched off in one place.
 */
@Component({
  selector: 'app-vin-cta',
  imports: [TranslatePipe, Icon],
  template: `
    @if (partner; as p) {
      <aside class="rounded-[6px] border border-line bg-panel p-5">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div class="min-w-0 flex-1">
            @if (p.logo) {
              <img [src]="p.logo" [alt]="p.name" width="140" height="20" loading="lazy" class="h-5 w-auto dark:hidden" />
              <img [src]="p.logoDark ?? p.logo" [alt]="p.name" width="140" height="20" loading="lazy" class="hidden h-5 w-auto dark:block" />
            }
            <p class="font-bold" [class.mt-3]="p.logo">{{ 'vinCta.title' | translate }}</p>
            <p class="mt-1 text-sm text-fg/80">{{ 'vinCta.text' | translate }}</p>
          </div>
          <a [href]="href()" target="_blank" rel="sponsored nofollow noopener" class="btn btn-primary shrink-0 self-start sm:self-center" (click)="clicked()">
            {{ 'vinCta.button' | translate: { partner: p.name } }} <app-icon name="external-link" [size]="16" />
          </a>
        </div>
        @if (p.coupon) {
          <div class="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-[4px] border border-dashed border-brand/60 bg-brand/8 px-4 py-3">
            <span class="text-sm">{{ 'vinCta.code' | translate }}</span>
            <code class="rounded-[3px] bg-panel px-2.5 py-1 font-mono text-[15px] font-bold tracking-wider">{{ p.coupon }}</code>
            @if (p.discount) {
              <span class="text-sm font-semibold text-brand-text">{{ 'vinCta.discount' | translate: { pct: p.discount, partner: p.name } }}</span>
            }
            <button type="button" (click)="copy(p.coupon)" class="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-2 hover:no-underline">
              <app-icon [name]="copied() ? 'check' : 'copy'" [size]="15" /> {{ (copied() ? 'vinCta.copied' : 'vinCta.copy') | translate }}
            </button>
          </div>
        }
        <p class="mt-3 text-[11px] text-muted">{{ 'vinCta.label' | translate }}</p>
      </aside>
    }
  `,
})
export class VinCta {
  private readonly analytics = inject(AnalyticsService);
  /** The car's VIN, when known - opens the partner's VIN landing with it. */
  readonly vin = input<string | null>(null);
  /** Where the link sits, for analytics (vin_page, copart, origin, result). */
  readonly placement = input.required<string>();

  protected readonly partner = SITE.vinPartner;
  protected readonly copied = signal(false);
  protected readonly href = computed(() => {
    const p = this.partner;
    const vin = this.vin()?.trim();
    if (!p) {
      return '';
    }
    return vin && p.vinUrl ? p.vinUrl.replace('{vin}', encodeURIComponent(vin.toUpperCase())) : p.url;
  });

  protected clicked(): void {
    this.analytics.track('vin_partner_click', { placement: this.placement(), partner: this.partner?.name ?? '' });
  }

  protected copy(code: string): void {
    navigator.clipboard?.writeText(code).then(
      () => {
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2500);
      },
      () => undefined,
    );
    this.analytics.track('vin_partner_coupon_copied', { placement: this.placement(), partner: this.partner?.name ?? '' });
  }
}
