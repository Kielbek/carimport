import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { Logo } from '../../layout/logo';

interface OrderRow {
  id: string;
  number: string;
  createdAt: string;
  paidAt: string | null;
  status: string;
  email: string;
  name: string;
  locale: string;
  amountMinor: number;
  currency: string;
  emailSentAt: string | null;
  emailAttempts: number;
  generationAttempts: number;
  paymentIntent: string | null;
  refundedMinor: number;
  refundedAt: string | null;
  refundReason: string | null;
  refundableMinor: number;
}
interface OrderPage { orders: OrderRow[]; total: number; page: number; pages: number }
interface Stats {
  ordersToday: number;
  ordersWeek: number;
  ordersMonth: number;
  revenueMonth: { currency: string; amountMinor: number; orders: number }[];
  failed: number;
  pending: number;
  newsletterConfirmed: number;
  newsletterPending: number;
  fxDate: string;
  mailEnabled: boolean;
}

const STATUSES = ['', 'PENDING', 'PAID', 'GENERATING', 'READY', 'FAILED', 'EXPIRED', 'REFUNDED'];
const STATUS_PL: Record<string, string> = {
  '': 'Wszystkie', PENDING: 'Czeka na płatność', PAID: 'Opłacone', GENERATING: 'Generowanie', READY: 'Gotowe',
  FAILED: 'Błąd PDF', EXPIRED: 'Wygasłe', REFUNDED: 'Zwrócone',
};
const AUTH_KEY = 'carglo.admin';

/**
 * Operator panel (Polish, not indexed, outside the language routes): numbers, orders with search and status filter,
 * "send the e-mail again", "generate the PDF again", the payment in Stripe, newsletter CSV. Credentials live only in
 * this tab's session storage and travel as HTTP Basic to /api/v1/admin.
 */
@Component({
  selector: 'app-admin-page',
  imports: [FormsModule, Logo],
  template: `
    <div class="min-h-screen bg-bg text-fg">
      <header class="border-b border-line">
        <div class="site flex items-center justify-between py-4">
          <span class="flex items-center gap-3"><app-logo class="scale-75 origin-left" /><span class="badge">panel</span></span>
          @if (auth()) { <button type="button" class="btn btn-outline !py-2" (click)="logout()">Wyloguj</button> }
        </div>
      </header>

      @if (!auth()) {
        <form class="site mt-16 max-w-sm space-y-4" (ngSubmit)="login()">
          <h1 class="text-2xl font-extrabold">Logowanie</h1>
          <div><label class="label" for="ad-user">Użytkownik</label><input id="ad-user" class="input" name="user" autocomplete="username" [(ngModel)]="user" /></div>
          <div><label class="label" for="ad-pass">Hasło</label><input id="ad-pass" class="input" type="password" name="pass" autocomplete="current-password" [(ngModel)]="pass" /></div>
          @if (error()) { <p class="text-sm font-semibold text-danger" role="alert">{{ error() }}</p> }
          <button type="submit" class="btn btn-primary w-full" [disabled]="busy()">Zaloguj</button>
        </form>
      } @else {
        <main class="site py-8">
          @if (stats(); as s) {
            <section class="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <div class="card p-4"><p class="text-xs text-muted">Zamówienia dziś / 7 dni / miesiąc</p><p class="mt-1 text-2xl font-extrabold">{{ s.ordersToday }} / {{ s.ordersWeek }} / {{ s.ordersMonth }}</p></div>
              <div class="card p-4"><p class="text-xs text-muted">Przychód w tym miesiącu</p>
                <p class="mt-1 text-2xl font-extrabold">@for (r of s.revenueMonth; track r.currency) { <span class="block">{{ money(r.amountMinor, r.currency) }} <span class="text-sm font-normal text-muted">({{ r.orders }})</span></span> } @empty { 0 }</p></div>
              <div class="card p-4" [class.!border-danger]="s.failed > 0"><p class="text-xs text-muted">Błędy PDF / czeka na płatność</p><p class="mt-1 text-2xl font-extrabold" [class.text-danger]="s.failed > 0">{{ s.failed }} / {{ s.pending }}</p></div>
              <div class="card p-4"><p class="text-xs text-muted">Newsletter: potwierdzeni / niepotwierdzeni</p><p class="mt-1 text-2xl font-extrabold">{{ s.newsletterConfirmed }} / {{ s.newsletterPending }}</p>
                <button type="button" class="mt-2 text-sm font-semibold text-brand-text underline" (click)="downloadCsv()">Pobierz CSV</button></div>
              <div class="card p-4"><p class="text-xs text-muted">Kursy NBP / wysyłka maili</p><p class="mt-1 text-lg font-extrabold">{{ s.fxDate }}</p>
                <p class="text-sm" [class.text-danger]="!s.mailEnabled">{{ s.mailEnabled ? 'SMTP włączone' : 'SMTP wyłączone' }}</p></div>
            </section>
          }

          <section class="mt-8">
            <form class="flex flex-wrap items-end gap-3" (ngSubmit)="load(0)">
              <div><label class="label" for="ad-q">Szukaj (e-mail lub nr)</label><input id="ad-q" class="input !w-72" name="q" [(ngModel)]="q" /></div>
              <div><label class="label" for="ad-st">Status</label>
                <select id="ad-st" class="input" name="status" [(ngModel)]="status" (ngModelChange)="load(0)">
                  @for (st of statuses; track st) { <option [value]="st">{{ statusPl[st] }}</option> }
                </select></div>
              <button type="submit" class="btn btn-primary">Szukaj</button>
              <button type="button" class="btn btn-outline" (click)="refresh()">Odśwież</button>
            </form>
            @if (message()) { <p class="mt-3 rounded-[4px] bg-brand/10 p-3 text-sm font-semibold" role="status">{{ message() }}</p> }

            @if (page(); as p) {
              <div class="mt-4 overflow-x-auto">
                <table class="w-full min-w-[960px] text-sm">
                  <thead class="text-left text-xs uppercase text-muted">
                    <tr class="border-b border-line"><th class="py-2">Nr</th><th>Data</th><th>Klient</th><th>Kwota</th><th>Status</th><th>E-mail z raportem</th><th class="text-right">Akcje</th></tr>
                  </thead>
                  <tbody class="divide-y divide-line">
                    @for (o of p.orders; track o.id) {
                      <tr>
                        <td class="py-2.5 font-mono font-semibold">{{ o.number }}</td>
                        <td>{{ date(o.paidAt ?? o.createdAt) }}</td>
                        <td>{{ o.name }}<br><span class="text-muted">{{ o.email }} · {{ o.locale }}</span></td>
                        <td class="tabular-nums">{{ money(o.amountMinor, o.currency) }}
                          @if (o.refundedMinor) { <span class="block text-xs text-danger" [title]="o.refundReason ?? ''">zwrócono {{ money(o.refundedMinor, o.currency) }}</span> }</td>
                        <td><span class="badge" [class.!bg-danger-soft]="o.status === 'FAILED'">{{ statusPl[o.status] }}</span>
                          @if (o.generationAttempts > 1) { <span class="block text-xs text-muted">prób PDF: {{ o.generationAttempts }}</span> }</td>
                        <td>@if (o.emailSentAt) { {{ date(o.emailSentAt) }} } @else if (o.emailAttempts) { <span class="text-danger">nieudane ({{ o.emailAttempts }})</span> } @else { – }</td>
                        <td class="space-x-2 whitespace-nowrap text-right">
                          @if (o.status === 'READY') { <button type="button" class="btn btn-outline !px-3 !py-1.5 text-xs" [disabled]="busy()" (click)="act(o, 'resend')">Wyślij ponownie</button> }
                          @if (o.status === 'FAILED' || o.status === 'PAID') { <button type="button" class="btn btn-outline !px-3 !py-1.5 text-xs" [disabled]="busy()" (click)="act(o, 'regenerate')">Generuj PDF</button> }
                          @if (o.refundableMinor > 0) { <button type="button" class="btn btn-outline !px-3 !py-1.5 text-xs" [disabled]="busy()" (click)="openRefund(o)">Zwrot</button> }
                          @if (o.paymentIntent) { <a class="text-xs font-semibold text-brand-text underline" target="_blank" rel="noopener" [href]="'https://dashboard.stripe.com/payments/' + o.paymentIntent">Stripe</a> }
                        </td>
                      </tr>
                    } @empty {
                      <tr><td colspan="7" class="py-6 text-center text-muted">Brak zamówień</td></tr>
                    }
                  </tbody>
                </table>
              </div>
              <div class="mt-4 flex items-center gap-3 text-sm">
                <button type="button" class="btn btn-outline !py-1.5" [disabled]="p.page === 0" (click)="load(p.page - 1)">←</button>
                <span>strona {{ p.page + 1 }} z {{ p.pages || 1 }} · {{ p.total }} zamówień</span>
                <button type="button" class="btn btn-outline !py-1.5" [disabled]="p.page + 1 >= p.pages" (click)="load(p.page + 1)">→</button>
              </div>
            }
          </section>
        </main>
      }

      @if (refundOf(); as o) {
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-labelledby="rf-title">
          <form class="card w-full max-w-md space-y-4 bg-panel p-6" (ngSubmit)="refund(o)">
            <h2 id="rf-title" class="text-xl font-extrabold">Zwrot – zamówienie {{ o.number }}</h2>
            <p class="text-sm text-muted">{{ o.name }} · {{ o.email }}<br>Zapłacono {{ money(o.amountMinor, o.currency) }}@if (o.refundedMinor) {, zwrócono już {{ money(o.refundedMinor, o.currency) }}}</p>
            <div>
              <label class="label" for="rf-amount">Kwota zwrotu ({{ o.currency }})</label>
              <input id="rf-amount" class="input" type="number" name="amount" min="0.01" step="0.01" [max]="o.refundableMinor / 100" [(ngModel)]="refundAmount" required />
              <p class="mt-1 text-xs text-muted">Cała kwota ({{ money(o.refundableMinor, o.currency) }}) blokuje dostęp do raportu. Mniejsza kwota (np. rekompensata) zostawia raport klientowi.</p>
            </div>
            <div>
              <label class="label" for="rf-reason">Powód</label>
              <select id="rf-reason" class="input" name="reason" [(ngModel)]="refundReason">
                <option value="requested_by_customer">Prośba klienta / reklamacja</option>
                <option value="duplicate">Podwójna płatność</option>
                <option value="fraudulent">Oszustwo</option>
              </select>
            </div>
            <div><label class="label" for="rf-note">Notatka (opcjonalnie)</label><input id="rf-note" class="input" name="note" maxlength="150" [(ngModel)]="refundNote" /></div>
            <p class="text-xs text-muted">Pieniądze zwraca Stripe na kartę lub konto klienta (5–10 dni roboczych). Klient dostanie maila o zwrocie.</p>
            <div class="flex justify-end gap-3">
              <button type="button" class="btn btn-outline" (click)="refundOf.set(null)">Anuluj</button>
              <button type="submit" class="btn btn-primary" [disabled]="busy() || !refundAmount || refundAmount * 100 > o.refundableMinor">Zwróć {{ refundAmount ? money(round(refundAmount * 100), o.currency) : '' }}</button>
            </div>
          </form>
        </div>
      }
    </div>
  `,
})
export class AdminPage implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  protected readonly statuses = STATUSES;
  protected readonly statusPl = STATUS_PL;

  protected user = 'admin';
  protected pass = '';
  protected q = '';
  protected status = '';
  protected readonly auth = signal<string | null>(null);
  protected readonly busy = signal(false);
  protected readonly error = signal('');
  protected readonly message = signal('');
  protected readonly stats = signal<Stats | null>(null);
  protected readonly page = signal<OrderPage | null>(null);
  protected readonly refundOf = signal<OrderRow | null>(null);
  protected refundAmount: number | null = null;
  protected refundReason = 'requested_by_customer';
  protected refundNote = '';

  constructor() {
    inject(Meta).updateTag({ name: 'robots', content: 'noindex,nofollow' });
  }

  ngOnInit(): void {
    if (!this.browser) {
      return;
    }
    try {
      this.auth.set(sessionStorage.getItem(AUTH_KEY));
    } catch {
      /* private mode: log in again each time */
    }
    if (this.auth()) {
      this.refresh();
    }
  }

  protected login(): void {
    this.auth.set(btoa(unescape(encodeURIComponent(`${this.user}:${this.pass}`))));
    this.error.set('');
    this.busy.set(true);
    this.http.get<Stats>('/api/v1/admin/stats', { headers: this.headers() }).subscribe({
      next: (s) => {
        try {
          sessionStorage.setItem(AUTH_KEY, this.auth()!);
        } catch {
          /* ignore */
        }
        this.pass = '';
        this.stats.set(s);
        this.busy.set(false);
        this.load(0);
      },
      error: (e: HttpErrorResponse) => {
        this.auth.set(null);
        this.busy.set(false);
        this.error.set(e.status === 404 ? 'Panel jest wyłączony – ustaw ADMIN_PASSWORD w .env.' : e.status === 429
          ? 'Za dużo prób – odczekaj minutę.' : 'Nieprawidłowy użytkownik lub hasło.');
      },
    });
  }

  protected logout(): void {
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch {
      /* ignore */
    }
    this.auth.set(null);
    this.stats.set(null);
    this.page.set(null);
  }

  protected refresh(): void {
    this.http.get<Stats>('/api/v1/admin/stats', { headers: this.headers() }).subscribe({
      next: (s) => this.stats.set(s),
      error: (e: HttpErrorResponse) => this.failed(e),
    });
    this.load(this.page()?.page ?? 0);
  }

  protected load(page: number): void {
    const params = new HttpParams().set('page', page).set('q', this.q).set('status', this.status);
    this.http.get<OrderPage>('/api/v1/admin/orders', { headers: this.headers(), params }).subscribe({
      next: (p) => this.page.set(p),
      error: (e: HttpErrorResponse) => this.failed(e),
    });
  }

  protected act(o: OrderRow, action: 'resend' | 'regenerate'): void {
    const what = action === 'resend' ? `wysłać ponownie e-mail z raportem do ${o.email}` : `wygenerować ponownie PDF zamówienia ${o.number}`;
    if (!confirm(`Na pewno ${what}?`)) {
      return;
    }
    this.busy.set(true);
    this.http.post<OrderRow>(`/api/v1/admin/orders/${o.id}/${action}`, null, { headers: this.headers() }).subscribe({
      next: (row) => {
        this.busy.set(false);
        this.message.set(action === 'resend'
          ? (row.emailSentAt ? `E-mail do ${row.email} wysłany.` : `Nie udało się wysłać – sprawdź SMTP (próby: ${row.emailAttempts}).`)
          : (row.status === 'READY' ? `PDF zamówienia ${row.number} gotowy, e-mail wychodzi automatycznie.` : `Generowanie nadal się nie udaje – szczegóły w logach.`));
        this.refresh();
      },
      error: (e: HttpErrorResponse) => {
        this.busy.set(false);
        this.failed(e);
      },
    });
  }

  protected openRefund(o: OrderRow): void {
    this.refundAmount = o.refundableMinor / 100;
    this.refundReason = 'requested_by_customer';
    this.refundNote = '';
    this.refundOf.set(o);
  }

  protected refund(o: OrderRow): void {
    const amountMinor = this.round((this.refundAmount ?? 0) * 100);
    this.busy.set(true);
    this.http.post<OrderRow>(`/api/v1/admin/orders/${o.id}/refund`,
      { amountMinor, reason: this.refundReason, note: this.refundNote }, { headers: this.headers() }).subscribe({
      next: (row) => {
        this.busy.set(false);
        this.refundOf.set(null);
        this.message.set(`Zwrot ${this.money(amountMinor, row.currency)} dla zamówienia ${row.number} zlecony w Stripe.`
          + (row.status === 'REFUNDED' ? ' Dostęp do raportu zablokowany.' : ' Raport pozostaje dostępny.'));
        this.refresh();
      },
      error: (e: HttpErrorResponse) => {
        this.busy.set(false);
        this.refundOf.set(null);
        this.message.set(`Zwrot nie powiódł się: ${e.error?.detail ?? e.error?.title ?? e.message}`);
      },
    });
  }

  protected round(n: number): number {
    return Math.round(n);
  }

  protected downloadCsv(): void {
    const site = window.location.origin;
    this.http.get('/api/v1/admin/newsletter.csv', { headers: this.headers(), params: { site }, responseType: 'blob' }).subscribe({
      next: (blob) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'carglo-newsletter.csv';
        a.click();
        URL.revokeObjectURL(a.href);
      },
      error: (e: HttpErrorResponse) => this.failed(e),
    });
  }

  protected money(minor: number, currency: string): string {
    return new Intl.NumberFormat('pl-PL', { style: 'currency', currency }).format(minor / 100);
  }

  protected date(iso: string): string {
    return new Intl.DateTimeFormat('pl-PL', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(iso));
  }

  private headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Basic ${this.auth()}` });
  }

  private failed(e: HttpErrorResponse): void {
    if (e.status === 401) {
      this.logout();
      this.error.set('Sesja wygasła – zaloguj się ponownie.');
    } else {
      this.message.set(`Błąd ${e.status}: ${e.error?.title ?? e.message}`);
    }
  }
}
