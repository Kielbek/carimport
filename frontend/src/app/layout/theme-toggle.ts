import { Component, computed, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from '../core/theme/theme.service';
import { Icon } from '../shared/icon/icon';

@Component({
  selector: 'app-theme-toggle',
  imports: [Icon, TranslatePipe],
  template: `
    <button type="button" (click)="theme.toggle()"
            class="grid size-10 place-items-center text-fg/80 transition hover:text-brand-text"
            [attr.aria-label]="label() | translate" [title]="label() | translate">
      <app-icon [name]="theme.theme() === 'dark' ? 'sun' : 'moon'" [size]="18" />
    </button>
  `,
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeService);
  protected readonly label = computed(() => (this.theme.theme() === 'dark' ? 'layout.themeLight' : 'layout.themeDark'));
}
