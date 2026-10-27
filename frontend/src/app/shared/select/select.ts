import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, ElementRef, computed, effect, inject, input, output, signal, viewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Flag } from '../flag/flag';
import { Icon } from '../icon/icon';

export interface SelectOption {
  value: string;
  label: string;
  /** Country code for a flag in front of the label. */
  flag?: string;
}

/** Lists longer than this get a search field. */
const SEARCH_FROM = 10;

/**
 * Drop-down list styled like the site instead of the browser's native picker: a panel under the field on wider
 * screens, a full-screen sheet with large rows on phones. Keyboard: arrows, Home/End, Enter, Escape and typing
 * (filters a long list, jumps to the first match in a short one). The trigger carries the id, so an outer
 * <label for=...> focuses it.
 */
@Component({
  selector: 'app-select',
  imports: [TranslatePipe, Flag, Icon],
  host: { class: 'relative block' },
  template: `
    <button type="button" #trigger [id]="inputId()" class="input flex items-center gap-3 text-left"
            role="combobox" aria-haspopup="listbox" [attr.aria-expanded]="open()" [attr.aria-controls]="listId"
            (click)="toggle()" (keydown)="onTriggerKey($event)">
      @if (selected()?.flag; as f) { <app-flag [code]="f" class="w-6" /> }
      <span class="min-w-0 flex-1 truncate">{{ selected()?.label ?? placeholder() }}</span>
      <app-icon name="chevron-down" [size]="18" class="shrink-0 text-muted transition" [class.rotate-180]="open() && !sheet()" />
    </button>

    @if (open()) {
      @if (sheet()) {
        <div class="fixed inset-0 z-[60] bg-black/40" (click)="close()" aria-hidden="true"></div>
      }
      <div [class]="sheet()
             ? 'fixed inset-0 z-[61] flex flex-col bg-panel'
             : 'absolute inset-x-0 z-40 flex max-h-80 flex-col overflow-hidden rounded-[6px] border border-line bg-panel shadow-2xl '
               + (up() ? 'bottom-full mb-1' : 'top-full mt-1')"
           (keydown)="onListKey($event)">
        @if (sheet()) {
          <div class="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
            <span class="font-extrabold">{{ title() }}</span>
            <button type="button" class="grid size-10 place-items-center rounded-full hover:bg-panel-2" [attr.aria-label]="'layout.close' | translate" (click)="close()">
              <app-icon name="x" [size]="22" />
            </button>
          </div>
        }
        @if (searchable()) {
          <div class="border-b border-line p-2">
            <input #search type="search" class="input !py-2.5" [placeholder]="'select.search' | translate" [value]="query()"
                   (input)="query.set($any($event.target).value); active.set(0)" autocomplete="off" />
          </div>
        }
        <ul #list [id]="listId" role="listbox" style="position: relative" [attr.aria-label]="title()" tabindex="-1" class="min-h-0 flex-1 overflow-y-auto py-1 outline-none">
          @for (o of filtered(); track o.value; let i = $index) {
            <li role="option" [id]="listId + '-' + i" [attr.aria-selected]="o.value === value()"
                class="flex cursor-pointer items-center gap-3 px-4"
                [class]="(sheet() ? 'py-3.5 text-[16px] ' : 'py-2.5 text-[15px] ') + (i === active() ? 'bg-brand/15 ' : '') + (o.value === value() ? 'font-semibold' : '')"
                (mousemove)="active() !== i && active.set(i)" (click)="choose(o)">
              @if (o.flag) { <app-flag [code]="o.flag" class="w-6" /> }
              <span class="min-w-0 flex-1">{{ o.label }}</span>
              @if (o.value === value()) { <app-icon name="check" [size]="18" class="shrink-0 text-brand-text" /> }
            </li>
          } @empty {
            <li class="px-4 py-3 text-sm text-muted">{{ 'select.empty' | translate }}</li>
          }
        </ul>
      </div>
    }
  `,
})
export class Select {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly document = inject(DOCUMENT);

  readonly inputId = input.required<string>();
  readonly options = input.required<SelectOption[]>();
  readonly value = input<string | null>(null);
  /** Heading of the phone sheet and name of the list for screen readers. */
  readonly title = input('');
  readonly placeholder = input('');
  readonly changed = output<string>();

  protected readonly listId = `sel-${Math.random().toString(36).slice(2, 8)}`;
  protected readonly open = signal(false);
  protected readonly sheet = signal(false);
  /** Open upwards when the field sits low on the screen and there is more room above. */
  protected readonly up = signal(false);
  protected readonly query = signal('');
  protected readonly active = signal(0);
  /** Move the focus into the panel once it has been rendered (the view queries below update after rendering). */
  private focusPending = false;
  private readonly trigger = viewChild.required<ElementRef<HTMLButtonElement>>('trigger');
  private readonly list = viewChild<ElementRef<HTMLUListElement>>('list');
  private readonly search = viewChild<ElementRef<HTMLInputElement>>('search');

  protected readonly selected = computed(() => this.options().find((o) => o.value === this.value()) ?? null);
  protected readonly searchable = computed(() => this.options().length > SEARCH_FROM);
  protected readonly filtered = computed(() => {
    const q = normalize(this.query());
    return q ? this.options().filter((o) => normalize(o.label).includes(q) || o.value.toLowerCase() === q) : this.options();
  });

  constructor() {
    const onDocClick = (e: MouseEvent) => {
      if (!this.sheet() && !this.host.nativeElement.contains(e.target as Node)) {
        this.close(false);
      }
    };
    this.document.addEventListener('click', onDocClick, true);
    inject(DestroyRef).onDestroy(() => {
      this.document.removeEventListener('click', onDocClick, true);
      this.lockScroll(false);
    });
    effect(() => {
      const target = this.search() ?? this.list();
      if (this.open() && target && this.focusPending) {
        this.focusPending = false;
        target.nativeElement.focus();
      }
    });
    // keep the highlighted row in view and focus the search field (or the list) once the panel is rendered
    effect(() => {
      if (!this.open()) {
        return;
      }
      const i = this.active();
      queueMicrotask(() => {
        // scroll the list only - scrollIntoView would also scroll the page and slide rows under a still mouse
        const list = this.list()?.nativeElement;
        const row = list?.querySelector<HTMLElement>(`#${this.listId}-${i}`);
        if (list && row) {
          if (row.offsetTop < list.scrollTop) {
            list.scrollTop = row.offsetTop;
          } else if (row.offsetTop + row.offsetHeight > list.scrollTop + list.clientHeight) {
            list.scrollTop = row.offsetTop + row.offsetHeight - list.clientHeight;
          }
        }
      });
    });
  }

  protected toggle(): void {
    if (this.open()) {
      this.close();
    } else {
      this.show();
    }
  }

  private show(): void {
    const view = this.document.defaultView;
    this.sheet.set(!!view && view.matchMedia('(max-width: 639px)').matches);
    if (view) {
      const r = this.trigger().nativeElement.getBoundingClientRect();
      const below = view.innerHeight - r.bottom;
      this.up.set(below < 330 && r.top > below);
    }
    this.query.set('');
    this.active.set(Math.max(0, this.options().findIndex((o) => o.value === this.value())));
    this.open.set(true);
    this.lockScroll(this.sheet());
    this.focusPending = true;
  }

  protected close(refocus = true): void {
    if (!this.open()) {
      return;
    }
    this.open.set(false);
    this.lockScroll(false);
    if (refocus) {
      this.trigger().nativeElement.focus();
    }
  }

  protected choose(o: SelectOption): void {
    if (o.value !== this.value()) {
      this.changed.emit(o.value);
    }
    this.close();
  }

  protected onTriggerKey(e: KeyboardEvent): void {
    if (this.open()) {
      // keys pressed before the focus has moved into the panel
      this.onListKey(e);
      return;
    }
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
      e.preventDefault();
      this.show();
    }
  }

  protected onListKey(e: KeyboardEvent): void {
    const n = this.filtered().length;
    switch (e.key) {
      case 'ArrowDown':
        this.active.set(Math.min(n - 1, this.active() + 1));
        break;
      case 'ArrowUp':
        this.active.set(Math.max(0, this.active() - 1));
        break;
      case 'Home':
        this.active.set(0);
        break;
      case 'End':
        this.active.set(n - 1);
        break;
      case 'Enter': {
        const o = this.filtered()[this.active()];
        if (o) {
          this.choose(o);
        }
        break;
      }
      case 'Escape':
      case 'Tab':
        this.close(e.key === 'Escape');
        return;
      default:
        // short list without a search field: a letter jumps to the first option that starts with it
        if (!this.searchable() && e.key.length === 1) {
          const i = this.filtered().findIndex((o) => normalize(o.label).startsWith(normalize(e.key)));
          if (i >= 0) {
            this.active.set(i);
          }
        }
        return;
    }
    e.preventDefault();
  }

  private lockScroll(lock: boolean): void {
    this.document.body.style.overflow = lock ? 'hidden' : '';
  }
}

/** Case- and accent-insensitive comparison: "lodz" finds "Łódź", "sao" finds "São Paulo". */
function normalize(s: string): string {
  return s.normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/ł/g, 'l').replace(/Ł/g, 'L').toLowerCase().trim();
}
