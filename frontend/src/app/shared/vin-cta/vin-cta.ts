import { Component, computed, inject, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AnalyticsService } from '../../core/analytics/analytics.service';
import { SITE } from '../../core/site.config';
import { Icon } from '../icon/icon';

/**
 * "Check the vehicle history before you buy" - the referral link to SITE.vinPartner. Renders nothing when no partner
 * is configured, so the provider can be swapped or switched off in one place.
 */
@Component({
  selector: 'app-vin-cta',
  imports: [TranslatePipe, Icon],
  template: `
    @if (partner; as p) {
      <aside class="rounded-[6px] border border-line bg-panel p-5">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
          <span class="hidden h-11 w-11 shrink-0 place-items-center rounded-full bg-brand/15 text-brand-text sm:grid">
            <app-icon name="shield" [size]="22" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="font-bold">{{ 'vinCta.title' | translate }}</p>
            <p class="mt-1 text-sm text-fg/80">{{ 'vinCta.text' | translate }}</p>
          </div>
          <a [href]="href()" target="_blank" rel="sponsored nofollow noopener" class="btn btn-primary shrink-0 self-start sm:self-center" (click)="clicked()">
            {{ 'vinCta.button' | translate: { partner: p.name } }} <app-icon name="external-link" [size]="16" />
          </a>
        </div>
        <p class="mt-3 text-[11px] text-muted">{{ 'vinCta.label' | translate }}</p>
      </aside>
    }
  `,
})
export class VinCta {
  private readonly analytics = inject(AnalyticsService);
  /** The car's VIN, when known - passed to the partner if its URL has a "{vin}" placeholder. */
  readonly vin = input<string | null>(null);
  /** Where the link sits, for analytics (vin_page, copart, origin, result). */
  readonly placement = input.required<string>();

  protected readonly partner = SITE.vinPartner;
  protected readonly href = computed(() => {
    const url = this.partner?.url ?? '';
    return url.includes('{vin}') ? url.replace('{vin}', encodeURIComponent(this.vin() ?? '')) : url;
  });

  protected clicked(): void {
    this.analytics.track('vin_partner_click', { placement: this.placement(), partner: this.partner?.name ?? '' });
  }
}
