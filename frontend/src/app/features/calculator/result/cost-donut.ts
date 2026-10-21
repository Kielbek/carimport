import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, OnDestroy, PLATFORM_ID, effect, inject, input, viewChild } from '@angular/core';
import { ArcElement, Chart, DoughnutController, Tooltip } from 'chart.js';
import { CostCategory } from '../../../core/api/api.models';

Chart.register(DoughnutController, ArcElement, Tooltip);

/** Shared with the legend so chart and list always match. Yellow = taxes, blue = vehicle (brand palette). */
export const CATEGORY_COLORS: Record<CostCategory, string> = {
  VEHICLE: '#3d7bff',
  TRANSPORT: '#38bdf8',
  TAXES: '#ffc61a',
  REGISTRATION: '#94a3b8',
  RISK: '#f97316',
};
const ORDER: CostCategory[] = ['VEHICLE', 'TRANSPORT', 'TAXES', 'REGISTRATION', 'RISK'];

/**
 * Doughnut of the cost structure. The chart is created once in the browser and updated in place from an effect, so
 * Chart.js animates the arcs between states instead of redrawing. Nothing is drawn during prerendering.
 */
@Component({
  selector: 'app-cost-donut',
  template: `<canvas #canvas role="img" [attr.aria-label]="ariaLabel()"></canvas>`,
  host: { class: 'block relative' },
})
export class CostDonut implements OnDestroy {
  readonly shares = input.required<Record<CostCategory, number>>();
  readonly labels = input.required<Record<CostCategory, string>>();
  readonly ariaLabel = input('');

  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private chart?: Chart<'doughnut'>;

  constructor() {
    effect(() => {
      const shares = this.shares();
      const labels = this.labels();
      if (!this.browser) {
        return;
      }
      const data = ORDER.map((c) => shares[c] ?? 0);
      const names = ORDER.map((c) => labels[c] ?? c);
      if (this.chart) {
        this.chart.data.labels = names;
        this.chart.data.datasets[0].data = data;
        this.chart.update();
        return;
      }
      this.chart = new Chart(this.canvas().nativeElement, {
        type: 'doughnut',
        data: {
          labels: names,
          datasets: [{
            data,
            backgroundColor: ORDER.map((c) => CATEGORY_COLORS[c]),
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 3,
            hoverOffset: 10,
          }],
        },
        options: {
          cutout: '70%',
          animation: { animateRotate: true, duration: 700, easing: 'easeOutQuart' },
          plugins: { tooltip: { callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%` } } },
        },
      });
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
