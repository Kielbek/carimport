import { Component, ElementRef, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/i18n/language.service';
import { pathFor } from '../../core/routing/paths';
import { Flag } from '../../shared/flag/flag';
import { Icon } from '../../shared/icon/icon';
import { MAP_EU_PORTS, MAP_LABELS, MAP_ROUTES, MAP_VIEWBOX } from './world-map.data';

const ORIGINS = ['USA', 'CANADA', 'JAPAN', 'UAE', 'UK'] as const;
type Origin = (typeof ORIGINS)[number];

/**
 * Import routes map: EU highlighted, origin countries tinted, animated sea lanes from export ports to EU ports.
 * Land shapes come from the cached /map/world.svg sprite (`<use>` inherits the theme colours); routes and ports are
 * inline so they prerender. Hovering an origin in the legend highlights its lanes.
 */
@Component({
  selector: 'app-world-map',
  imports: [RouterLink, TranslatePipe, Flag, Icon],
  template: `
    <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
      <div class="card relative min-w-0 overflow-hidden">
        <div #scroller class="overflow-x-auto">
          <div class="relative min-w-[720px]">
            <svg [attr.viewBox]="'0 0 ' + box.width + ' ' + box.height" class="block h-auto w-full" role="img"
                 [attr.aria-label]="'home.map.aria' | translate">
              <use href="/map/world.svg#rest" fill="var(--map-land)" />
              <use href="/map/world.svg#origin" fill="var(--map-origin)" />
              <use href="/map/world.svg#eu" fill="var(--map-eu)" fill-opacity="0.85" />

              @for (r of routes; track r.port) {
                <g [class.route--dim]="active() && active() !== r.origin" [class.route--active]="active() === r.origin">
                  <path class="route-base" [attr.d]="r.d" />
                  <path class="route-flow" [attr.d]="r.d" />
                  <circle r="2.6" fill="var(--brand)">
                    <animateMotion [attr.path]="r.d" [attr.dur]="duration(r.days)" repeatCount="indefinite" rotate="auto" />
                  </circle>
                </g>
                <g [attr.transform]="'translate(' + r.from[0] + ' ' + r.from[1] + ')'">
                  <circle r="3.4" fill="var(--brand)" stroke="var(--panel)" stroke-width="1.2" />
                  <title>{{ r.port }} → {{ portName(r.to) }} · {{ r.days }} {{ 'home.map.days' | translate }}</title>
                </g>
              }
              @for (p of euPorts; track p.code) {
                <g [attr.transform]="'translate(' + p.at[0] + ' ' + p.at[1] + ')'">
                  <circle class="port-pulse" r="3" fill="none" stroke="#fff" stroke-width="1" />
                  <circle r="3.2" fill="#fff" stroke="var(--map-eu)" stroke-width="1.6" />
                  <title>{{ p.name }}</title>
                </g>
              }
            </svg>

            <!-- HTML labels positioned in viewBox percentages: stay sharp and translatable -->
            @for (o of origins; track o) {
              <button type="button" class="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-[3px] border border-line bg-panel/90 px-2 py-1 text-[11px] font-semibold shadow-sm backdrop-blur transition hover:border-brand"
                      [style.left.%]="pct(o)[0]" [style.top.%]="pct(o)[1]" (mouseenter)="active.set(o)" (mouseleave)="active.set(null)"
                      (focus)="active.set(o)" (blur)="active.set(null)">
                <app-flag [code]="o" class="w-4" /> {{ 'origin.' + o | translate }}
              </button>
            }
            <span class="absolute -translate-x-1/2 rounded-[3px] bg-accent px-2 py-1 text-[11px] font-bold text-white shadow"
                  [style.left.%]="euLabel[0]" [style.top.%]="euLabel[1]">{{ 'home.map.eu' | translate }}</span>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line px-5 py-3 text-xs text-muted">
          <span class="flex items-center gap-2"><span class="size-3 rounded-[2px] bg-[var(--map-eu)]"></span>{{ 'home.map.legendEu' | translate }}</span>
          <span class="flex items-center gap-2"><span class="size-3 rounded-[2px] bg-[var(--map-origin)]"></span>{{ 'home.map.legendOrigin' | translate }}</span>
          <span class="flex items-center gap-2"><span class="h-0.5 w-5 border-t-2 border-dashed border-brand"></span>{{ 'home.map.legendRoute' | translate }}</span>
          <span class="flex items-center gap-2 lg:hidden"><app-icon name="arrow-right" [size]="14" />{{ 'home.map.scroll' | translate }}</span>
        </div>
      </div>

      <ul class="min-w-0 space-y-2">
        @for (o of origins; track o) {
          <li>
            <a [routerLink]="calculator()" [queryParams]="{ from: o }" (mouseenter)="active.set(o)" (mouseleave)="active.set(null)"
               class="card group flex items-center gap-4 p-4 transition hover:border-brand" [class.!border-brand]="active() === o">
              <app-flag [code]="o" class="w-9" />
              <span class="min-w-0 flex-1">
                <span class="block font-bold">{{ 'origin.' + o | translate }}</span>
                <span class="block truncate text-xs text-muted">{{ portsOf(o) }}</span>
              </span>
              <span class="text-right">
                <span class="block text-sm font-extrabold tabular-nums">{{ daysOf(o) }}</span>
                <span class="block text-[11px] text-muted">{{ 'home.map.days' | translate }}</span>
              </span>
              <app-icon name="arrow-right" [size]="16" class="text-muted transition group-hover:translate-x-0.5 group-hover:text-brand-text" />
            </a>
          </li>
        }
      </ul>
    </div>
  `,
})
export class WorldMap {
  private readonly lang = inject(LanguageService);
  protected readonly box = MAP_VIEWBOX;
  protected readonly routes = MAP_ROUTES;
  protected readonly euPorts = MAP_EU_PORTS;
  protected readonly origins = ORIGINS;
  protected readonly active = signal<Origin | null>(null);
  protected readonly calculator = computed(() => pathFor('calculator', this.lang.current()));
  private readonly scroller = viewChild.required<ElementRef<HTMLElement>>('scroller');

  constructor() {
    // on narrow screens start with the Atlantic in view - routes converging on Europe tell the story
    afterNextRender(() => {
      const el = this.scroller().nativeElement;
      el.scrollLeft = (el.scrollWidth - el.clientWidth) * 0.45;
    });
  }

  protected readonly euLabel = [(MAP_EU_PORTS[0].at[0] / MAP_VIEWBOX.width) * 100 + 4, (MAP_EU_PORTS[0].at[1] / MAP_VIEWBOX.height) * 100 - 21];

  protected pct(o: Origin): [number, number] {
    const [x, y] = MAP_LABELS[o];
    return [(x / MAP_VIEWBOX.width) * 100, (y / MAP_VIEWBOX.height) * 100];
  }

  protected portsOf(o: Origin): string {
    return MAP_ROUTES.filter((r) => r.origin === o).map((r) => r.port).join(' · ');
  }

  /** Shortest–longest transit across the origin's lanes, e.g. "13–36". */
  protected daysOf(o: Origin): string {
    const bounds = MAP_ROUTES.filter((r) => r.origin === o).flatMap((r) => r.days.split('–').map(Number));
    return `${Math.min(...bounds)}–${Math.max(...bounds)}`;
  }

  protected portName(code: string): string {
    return MAP_EU_PORTS.find((p) => p.code === code)?.name ?? code;
  }

  /** Animation speed proportional to real transit time (UK hops are quick, Japan is slow). */
  protected duration(days: string): string {
    const max = Number(days.split('–').pop());
    return `${Math.max(3, Math.min(14, max / 3))}s`;
  }
}
