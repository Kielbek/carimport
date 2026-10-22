import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MAP_EU_PORTS, MAP_ROUTES, MAP_VIEWBOX } from './world-map.data';

/**
 * World map of the import lanes: the EU in blue, export ports and EU ports as dots, animated sea routes. Nothing else -
 * no labels, flags or legend. Land shapes come from the cached /map/world.svg sprite (`<use>` inherits the theme
 * colours); routes and ports are inline so they prerender.
 */
@Component({
  selector: 'app-world-map',
  imports: [TranslatePipe],
  template: `
    <svg [attr.viewBox]="'0 0 ' + box.width + ' ' + box.height" class="block h-auto w-full" role="img"
         [attr.aria-label]="'home.map.aria' | translate">
      <use href="/map/world.svg#rest" fill="var(--map-land)" />
      <use href="/map/world.svg#eu" fill="var(--map-eu)" />
      @for (r of routes; track r.port + r.to) {
        <path class="route-base" [attr.d]="r.d" />
        <path class="route-flow" [attr.d]="r.d" />
        <circle r="2" fill="var(--brand)">
          <animateMotion [attr.path]="r.d" [attr.dur]="duration(r.days)" repeatCount="indefinite" />
        </circle>
        <circle [attr.cx]="r.from[0]" [attr.cy]="r.from[1]" r="3" fill="var(--brand)" stroke="var(--bg)" stroke-width="1">
          <title>{{ r.port }}</title>
        </circle>
      }
      @for (p of euPorts; track p.code) {
        <g [attr.transform]="'translate(' + p.at[0] + ' ' + p.at[1] + ')'">
          @if (p.hub) {
            <circle class="port-pulse" r="2.6" fill="none" stroke="#fff" stroke-width="0.8" />
            <circle r="2.6" fill="#fff" stroke="var(--map-eu)" stroke-width="1.2"><title>{{ p.name }}</title></circle>
          } @else {
            <circle r="1.3" fill="#fff" stroke="var(--map-eu)" stroke-width="0.6"><title>{{ p.name }}</title></circle>
          }
        </g>
      }
    </svg>
  `,
  host: { class: 'block' },
})
export class WorldMap {
  protected readonly box = MAP_VIEWBOX;
  protected readonly routes = MAP_ROUTES;
  protected readonly euPorts = MAP_EU_PORTS;

  /** Animation speed proportional to real transit time (UK hops are quick, Japan is slow). */
  protected duration(days: string): string {
    const max = Number(days.split('–').pop());
    return `${Math.max(3, Math.min(14, max / 3))}s`;
  }
}
