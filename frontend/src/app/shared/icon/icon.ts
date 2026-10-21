import { Component, computed, input } from '@angular/core';
import { ICONS, IconName, IconNode } from './icons';

/**
 * Line icon (Lucide set, 24px grid, currentColor). The SVG children are produced by the template itself - no
 * innerHTML - so icons are present in prerendered HTML, hydrate cleanly and need no sanitizer bypass.
 * Decorative by default; pass `label` to expose the icon to screen readers.
 */
@Component({
  selector: 'app-icon',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-linecap="round" stroke-linejoin="round"
         [attr.width]="size()" [attr.height]="size()" [attr.stroke-width]="stroke()"
         [attr.aria-hidden]="label() ? null : 'true'" [attr.role]="label() ? 'img' : null" [attr.aria-label]="label() || null">
      @for (n of nodes(); track $index) {
        @switch (n[0]) {
          @case ('path') { <path [attr.d]="n[1]['d']" /> }
          @case ('circle') { <circle [attr.cx]="n[1]['cx']" [attr.cy]="n[1]['cy']" [attr.r]="n[1]['r']" /> }
          @case ('ellipse') { <ellipse [attr.cx]="n[1]['cx']" [attr.cy]="n[1]['cy']" [attr.rx]="n[1]['rx']" [attr.ry]="n[1]['ry']" /> }
          @case ('rect') {
            <rect [attr.x]="n[1]['x']" [attr.y]="n[1]['y']" [attr.width]="n[1]['width']" [attr.height]="n[1]['height']"
                  [attr.rx]="n[1]['rx']" [attr.ry]="n[1]['ry']" />
          }
          @case ('line') { <line [attr.x1]="n[1]['x1']" [attr.y1]="n[1]['y1']" [attr.x2]="n[1]['x2']" [attr.y2]="n[1]['y2']" /> }
          @case ('polyline') { <polyline [attr.points]="n[1]['points']" /> }
          @case ('polygon') { <polygon [attr.points]="n[1]['points']" /> }
        }
      }
    </svg>
  `,
  host: { class: 'inline-flex shrink-0' },
})
export class Icon {
  readonly name = input.required<IconName | string>();
  readonly size = input(20);
  readonly stroke = input(1.75);
  readonly label = input('');

  protected readonly nodes = computed(() => (ICONS[this.name() as IconName] ?? []) as unknown as IconNode);
}
