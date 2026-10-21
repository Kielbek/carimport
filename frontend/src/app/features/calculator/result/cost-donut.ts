import { Component, ElementRef, OnDestroy, effect, input, viewChild } from '@angular/core';
import { ArcElement, Chart, DoughnutController, Legend, Tooltip } from 'chart.js';
import { CostCategory } from '../../../core/api/api.models';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

export const CATEGORY_COLORS: Record<CostCategory, string> = {
  VEHICLE: '#4f46e5',
  TRANSPORT: '#0ea5e9',
  TAXES: '#f59e0b',
  REGISTRATION: '#10b981',
};

/**
 * Doughnut of the cost structure. The chart instance is created once and updated in place from an effect, so Chart.js
 * animates the arcs between states instead of redrawing - the "live" feel while the user drags the slider.
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
  private chart?: Chart<'doughnut'>;
  private readonly order: CostCategory[] = ['VEHICLE', 'TRANSPORT', 'TAXES', 'REGISTRATION'];

  constructor() {
    effect(() => {
      const shares = this.shares();
      const labels = this.labels();
      const data = this.order.map((c) => shares[c] ?? 0);
      const names = this.order.map((c) => labels[c] ?? c);
      if (!this.chart) {
        this.chart = new Chart(this.canvas().nativeElement, {
          type: 'doughnut',
          data: {
            labels: names,
            datasets: [{ data, backgroundColor: this.order.map((c) => CATEGORY_COLORS[c]), borderWidth: 2, hoverOffset: 12 }],
          },
          options: {
            cutout: '68%',
            animation: { animateRotate: true, duration: 700, easing: 'easeOutQuart' },
            plugins: {
              legend: { display: false },
              tooltip: { callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%` } },
            },
          },
        });
      } else {
        this.chart.data.labels = names;
        this.chart.data.datasets[0].data = data;
        this.chart.update();
      }
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
