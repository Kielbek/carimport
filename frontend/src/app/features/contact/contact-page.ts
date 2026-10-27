import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AnalyticsService } from '../../core/analytics/analytics.service';
import { CarImportApi } from '../../core/api/carimport-api';
import { LanguageService } from '../../core/i18n/language.service';
import { pathFor } from '../../core/routing/paths';
import { contactEmail } from '../../core/site.config';
import { Icon } from '../../shared/icon/icon';
import { Select, SelectOption } from '../../shared/select/select';

const TOPICS = ['report', 'order', 'partner', 'other'] as const;
type Topic = (typeof TOPICS)[number];

/**
 * Contact form: the message is e-mailed to the operator with the visitor as Reply-To. Beside it the direct address in
 * the reader's language and quick links (FAQ, calculator), so simple questions do not need a message at all.
 */
@Component({
  selector: 'app-contact-page',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe, Icon, Select],
  template: `
    <div class="site py-16">
      <p class="eyebrow">{{ 'contact.eyebrow' | translate }}</p>
      <h1 class="h-section mt-4 max-w-3xl">{{ 'contact.title' | translate }}</h1>
      <p class="lead mt-4 max-w-2xl">{{ 'contact.lead' | translate }}</p>

      <div class="mt-12 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <section class="card p-6 sm:p-9">
          @if (sent()) {
            <div class="py-6 text-center" role="status">
              <span class="mx-auto grid size-14 place-items-center rounded-full bg-success/15 text-success"><app-icon name="check-circle" [size]="30" /></span>
              <h2 class="mt-5 text-2xl font-extrabold">{{ 'contact.sent.title' | translate }}</h2>
              <p class="mx-auto mt-2 max-w-md text-muted">{{ 'contact.sent.text' | translate: { email: form.value.email } }}</p>
              <a [routerLink]="calculator()" class="btn btn-primary mt-7">{{ 'contact.sent.cta' | translate }}</a>
            </div>
          } @else {
            <form [formGroup]="form" (ngSubmit)="submit()" class="grid grid-cols-[minmax(0,1fr)] gap-5 sm:grid-cols-2" novalidate>
              <div>
                <label class="label" for="c-name">{{ 'contact.name' | translate }}</label>
                <input id="c-name" class="input" formControlName="name" autocomplete="name" maxlength="120" />
              </div>
              <div>
                <label class="label" for="c-email">{{ 'contact.email' | translate }}</label>
                <input id="c-email" class="input" type="email" formControlName="email" autocomplete="email" maxlength="254" />
                @if (shown('email')) { <p class="mt-1.5 text-xs font-semibold text-danger">{{ 'contact.emailInvalid' | translate }}</p> }
              </div>
              <div [class.sm:col-span-2]="!needsOrder()">
                <label class="label" for="c-topic">{{ 'contact.topic' | translate }}</label>
                <app-select inputId="c-topic" [options]="topics()" [value]="form.value.topic ?? null" [title]="'contact.topic' | translate"
                            (changed)="form.controls.topic.setValue($any($event))" />
              </div>
              @if (needsOrder()) {
                <div>
                  <label class="label" for="c-order">{{ 'contact.order' | translate }} <span class="font-normal text-muted">({{ 'contact.optional' | translate }})</span></label>
                  <input id="c-order" class="input" formControlName="order" maxlength="64" [placeholder]="'contact.orderHint' | translate" />
                </div>
              }
              <div class="sm:col-span-2">
                <label class="label" for="c-message">{{ 'contact.message' | translate }}</label>
                <textarea id="c-message" class="input min-h-40 resize-y" rows="6" formControlName="message" maxlength="5000"
                          [placeholder]="'contact.messageHint' | translate"></textarea>
                @if (shown('message')) { <p class="mt-1.5 text-xs font-semibold text-danger">{{ 'contact.messageShort' | translate }}</p> }
              </div>
              <input class="hidden" formControlName="website" tabindex="-1" autocomplete="off" aria-hidden="true" />
              <div class="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p class="max-w-md text-xs leading-relaxed text-muted">{{ 'contact.privacy' | translate }}
                  <a [routerLink]="privacy()" class="underline underline-offset-2 hover:text-brand-text">{{ 'footer.privacy' | translate }}</a>.</p>
                <button type="submit" class="btn btn-primary shrink-0" [disabled]="busy()">
                  @if (busy()) { <span class="size-4 animate-spin rounded-full border-2 border-brand-ink/30 border-t-brand-ink"></span> }
                  @else { <app-icon name="mail" [size]="18" /> }
                  {{ 'contact.submit' | translate }}
                </button>
              </div>
              @if (failed()) {
                <p class="rounded-[4px] bg-danger-soft p-4 text-sm font-semibold text-danger sm:col-span-2" role="alert">
                  {{ 'contact.error' | translate: { email: email() } }}
                </p>
              }
            </form>
          }
        </section>

        <aside class="space-y-5">
          <div class="theme-dark rounded-[10px] bg-[#101011] p-6 text-fg">
            <p class="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">{{ 'contact.direct' | translate }}</p>
            <a [href]="'mailto:' + email()" class="mt-3 block break-all text-lg font-extrabold hover:text-brand">{{ email() }}</a>
            <p class="mt-3 flex items-start gap-2 text-sm text-fg/70"><app-icon name="clock" [size]="16" class="mt-0.5 shrink-0 text-brand" />{{ 'contact.response' | translate }}</p>
          </div>
          <div class="card p-6">
            <p class="font-extrabold">{{ 'contact.quick' | translate }}</p>
            <ul class="mt-4 space-y-3 text-sm">
              <li><a [routerLink]="home()" fragment="faq" class="link-arrow">{{ 'layout.faq' | translate }} <app-icon name="arrow-right" [size]="15" /></a></li>
              <li><a [routerLink]="method()" class="link-arrow">{{ 'layout.method' | translate }} <app-icon name="arrow-right" [size]="15" /></a></li>
              <li><a [routerLink]="calculator()" class="link-arrow">{{ 'layout.calculator' | translate }} <app-icon name="arrow-right" [size]="15" /></a></li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  `,
})
export class ContactPage implements OnInit {
  /** ?topic=partner from the "for business" button, ?order=AB12CD34 from a report page. */
  readonly topic = input<string>();
  readonly order = input<string>();

  private readonly api = inject(CarImportApi);
  private readonly lang = inject(LanguageService);
  private readonly translate = inject(TranslateService);
  private readonly analytics = inject(AnalyticsService);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    topic: ['report' as Topic, Validators.required],
    order: ['', Validators.maxLength(64)],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(5000)]],
    website: [''],
  });
  protected readonly busy = signal(false);
  protected readonly sent = signal(false);
  protected readonly failed = signal(false);
  private readonly tried = signal(false);
  private readonly topicValue = signal<Topic>('report');

  protected readonly email = computed(() => contactEmail(this.lang.current()));
  protected readonly home = computed(() => pathFor('home', this.lang.current()));
  protected readonly calculator = computed(() => pathFor('calculator', this.lang.current()));
  protected readonly method = computed(() => pathFor('method', this.lang.current()));
  protected readonly privacy = computed(() => pathFor('privacy', this.lang.current()));
  protected readonly needsOrder = computed(() => this.topicValue() === 'report' || this.topicValue() === 'order');
  protected readonly topics = computed<SelectOption[]>(() => {
    this.lang.current();
    return TOPICS.map((t) => ({ value: t, label: this.translate.instant('contact.topics.' + t) }));
  });

  constructor() {
    this.form.controls.topic.valueChanges.subscribe((t) => this.topicValue.set(t));
  }

  ngOnInit(): void {
    const t = this.topic();
    if (t && (TOPICS as readonly string[]).includes(t)) {
      this.form.controls.topic.setValue(t as Topic);
    }
    if (this.order()) {
      this.form.controls.order.setValue(this.order()!.slice(0, 64));
    }
  }

  protected shown(field: 'email' | 'message'): boolean {
    const c = this.form.controls[field];
    return c.invalid && (c.touched || this.tried());
  }

  protected submit(): void {
    this.tried.set(true);
    this.form.markAllAsTouched();
    if (this.form.invalid || this.busy()) {
      return;
    }
    this.busy.set(true);
    this.failed.set(false);
    const v = this.form.getRawValue();
    this.api.sendContact({ ...v, order: this.needsOrder() ? v.order : '', locale: this.lang.current() }).subscribe({
      next: () => {
        this.busy.set(false);
        this.sent.set(true);
        this.analytics.track('contact_sent', { topic: v.topic });
      },
      error: () => {
        this.busy.set(false);
        this.failed.set(true);
      },
    });
  }
}
