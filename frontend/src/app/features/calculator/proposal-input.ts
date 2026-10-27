import { Component, computed, input, output, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Icon } from '../../shared/icon/icon';

/**
 * Number input pre-filled with the calculator's proposal. Untouched it shows the proposal with a "proposed" tag (the
 * request sends null and the server applies the same proposal); typing overrides it, and "use proposal" goes back.
 * While the field has focus it shows exactly what was typed, so it can be cleared and retyped; left empty, it falls
 * back to the proposal on blur.
 */
@Component({
  selector: 'app-proposal-input',
  imports: [TranslatePipe, Icon],
  template: `
    <div class="flex items-baseline justify-between gap-3">
      <label class="label" [for]="inputId()">{{ label() | translate }}</label>
      @if (value() == null) {
        @if (proposal() != null) {
          <span class="badge !bg-brand/15 !text-brand-text"><app-icon name="sparkles" [size]="12" /> {{ 'proposal.tag' | translate }}</span>
        }
      } @else if (proposal() != null) {
        <button type="button" class="text-xs font-semibold text-brand-text hover:underline" (click)="changed.emit(null)">
          {{ 'proposal.restore' | translate }}
        </button>
      }
    </div>
    <div class="relative">
      <input [id]="inputId()" type="number" [min]="0" [step]="step()" inputmode="decimal" class="input pr-20"
             [class.text-muted]="value() == null && draft() === null" [value]="draft() ?? shown() ?? ''"
             [attr.aria-describedby]="inputId() + '-hint'" (input)="emit($event)" (blur)="draft.set(null)" />
      <span class="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted">{{ unit() }}</span>
    </div>
    <p class="mt-2 text-xs text-muted" [id]="inputId() + '-hint'">
      @if (value() != null && proposal() != null) {
        {{ 'proposal.was' | translate: { value: proposal(), unit: unit() } }} ·
      }
      @if (hint()) { {{ hint() | translate: hintParams() }} }
    </p>
  `,
})
export class ProposalInput {
  readonly inputId = input.required<string>();
  readonly label = input.required<string>();
  readonly hint = input<string>('');
  readonly hintParams = input<Record<string, unknown>>({});
  readonly unit = input<string>('');
  readonly step = input<number>(100);
  /** The user's own value; null = use the proposal. */
  readonly value = input<number | null>(null);
  readonly proposal = input<number | null>(null);
  readonly changed = output<number | null>();

  protected readonly shown = computed(() => this.value() ?? this.proposal());
  /** The text being typed; null when the field is not being edited. */
  protected readonly draft = signal<string | null>(null);

  protected emit(e: Event): void {
    const v = (e.target as HTMLInputElement).value;
    this.draft.set(v);
    this.changed.emit(v === '' ? null : Number(v));
  }
}
