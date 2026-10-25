import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AffiliateOffer,
  CalculationRequest,
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

  preview(request: CalculationRequest): Observable<PublicQuoteView> {
    return this.http.post<PublicQuoteView>(`${this.base}/quotes/preview`, request);
  }

  createQuote(request: CalculationRequest): Observable<PublicQuoteView> {
    return this.http.post<PublicQuoteView>(`${this.base}/quotes`, request);
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

  affiliates(origin: string, country: string, locale: string): Observable<AffiliateOffer[]> {
    return this.http.get<AffiliateOffer[]>(`${this.base}/affiliates`, { params: { origin, country, locale } });
  }
}

function bearer(token: string): HttpHeaders {
  return new HttpHeaders({ Authorization: `Bearer ${token}` });
}
