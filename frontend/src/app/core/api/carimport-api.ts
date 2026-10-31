import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AffiliateOffer,
  CalculationRequest,
  EuImportRequest,
  EuImportResult,
  DisplayCurrency,
  FullReport,
  OrderProgress,
  Place,
  PortOption,
  PublicQuoteView,
  RouteOptions,
  Suggestions,
  VinDecoding,
} from './api.models';

/** Thin typed client for /api/v1. Accept-Language is added by the language interceptor. */
@Injectable({ providedIn: 'root' })
export class CarImportApi {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/v1';

  euImport(request: EuImportRequest): Observable<EuImportResult> {
    return this.http.post<EuImportResult>(`${this.base}/quotes/eu`, request);
  }

  preview(request: CalculationRequest): Observable<PublicQuoteView> {
    return this.http.post<PublicQuoteView>(`${this.base}/quotes/preview`, request);
  }

  createQuote(request: CalculationRequest): Observable<PublicQuoteView> {
    return this.http.post<PublicQuoteView>(`${this.base}/quotes`, request);
  }

  /** The wizard input of a saved quote (link in the estimate e-mail). */
  quoteRequest(quoteId: string): Observable<CalculationRequest> {
    return this.http.get<CalculationRequest>(`${this.base}/quotes/${quoteId}/request`);
  }

  /** E-mails the free estimate; newsletter = also start the double opt-in. */
  emailEstimate(body: { quoteId: string; email: string; newsletter: boolean; website: string }): Observable<void> {
    return this.http.post<void>(`${this.base}/quotes/email`, body);
  }

  /** Cheapest EU port for this car and address, distances and the proposed amounts. */
  suggestions(request: CalculationRequest): Observable<Suggestions> {
    return this.http.post<Suggestions>(`${this.base}/quotes/suggestions`, request);
  }

  searchAddress(q: string): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.base}/geo/search`, { params: { q } });
  }

  routeOptions(origin: string, destination: string, euPort: string): Observable<RouteOptions> {
    return this.http.get<RouteOptions>(`${this.base}/reference/options`, { params: { origin, destination, euPort } });
  }

  decodeVin(vin: string): Observable<VinDecoding> {
    return this.http.get<VinDecoding>(`${this.base}/vehicle/vin/${encodeURIComponent(vin)}`);
  }

  /** NBP mid rates as PLN per unit; PLN itself is 1. */
  fx(): Observable<{ date: string; plnPerUnit: Record<string, number> }> {
    return this.http.get<{ date: string; plnPerUnit: Record<string, number> }>(`${this.base}/reference/fx`);
  }

  ports(): Observable<PortOption[]> {
    return this.http.get<PortOption[]>(`${this.base}/reference/ports`);
  }

  startCheckout(body: {
    quoteId: string;
    email: string;
    fullName: string;
    currency: DisplayCurrency;
    locale: string;
    termsAccepted: boolean;
    termsVersion: string;
  }): Observable<{ orderId: string; accessToken: string; checkoutUrl: string }> {
    return this.http.post<{ orderId: string; accessToken: string; checkoutUrl: string }>(
      `${this.base}/reports/checkout`,
      body,
    );
  }

  orderStatus(orderId: string, token: string): Observable<OrderProgress> {
    return this.http.get<OrderProgress>(`${this.base}/reports/orders/${orderId}`, { headers: bearer(token) });
  }

  /** Asks the server to check the payment with Stripe right away (the webhook may come later or not at all). */
  confirmOrder(orderId: string, token: string, sessionId: string): Observable<OrderProgress> {
    return this.http.post<OrderProgress>(`${this.base}/reports/orders/${orderId}/confirm`, { sessionId }, {
      headers: bearer(token),
    });
  }

  fullReport(orderId: string, token: string): Observable<FullReport> {
    return this.http.get<FullReport>(`${this.base}/reports/orders/${orderId}/full`, { headers: bearer(token) });
  }

  reportPdf(orderId: string, token: string): Observable<Blob> {
    return this.http.get(`${this.base}/reports/orders/${orderId}/pdf`, { headers: bearer(token), responseType: 'blob' });
  }

  submitLead(body: Record<string, unknown>): Observable<{ leadId: string }> {
    return this.http.post<{ leadId: string }>(`${this.base}/leads`, body);
  }

  /** Contact form: 202 = delivered to the operator's mailbox. */
  sendContact(body: { name: string; email: string; topic: string; order: string; message: string; locale: string; website: string }): Observable<void> {
    return this.http.post<void>(`${this.base}/contact`, body);
  }

  /** Double opt-in: 202 = confirmation e-mail on its way (also for an address already on the list). */
  newsletterSubscribe(body: { email: string; locale: string; source: string; consent: boolean; website: string }): Observable<void> {
    return this.http.post<void>(`${this.base}/newsletter`, body);
  }

  newsletterConfirm(token: string): Observable<void> {
    return this.http.post<void>(`${this.base}/newsletter/confirm`, { token });
  }

  newsletterUnsubscribe(token: string): Observable<void> {
    return this.http.post<void>(`${this.base}/newsletter/unsubscribe`, { token });
  }

  affiliates(origin: string, country: string, locale: string): Observable<AffiliateOffer[]> {
    return this.http.get<AffiliateOffer[]>(`${this.base}/affiliates`, { params: { origin, country, locale } });
  }
}

function bearer(token: string): HttpHeaders {
  return new HttpHeaders({ Authorization: `Bearer ${token}` });
}
