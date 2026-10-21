import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AffiliateOffer,
  CalculationRequest,
  DisplayCurrency,
  FullReport,
  OrderStatus,
  PortOption,
  PublicQuoteView,
  RouteOptions,
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

  routeOptions(origin: string, destination: string, euPort: string): Observable<RouteOptions> {
    return this.http.get<RouteOptions>(`${this.base}/reference/options`, { params: { origin, destination, euPort } });
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
  }): Observable<{ orderId: string; accessToken: string; checkoutUrl: string }> {
    return this.http.post<{ orderId: string; accessToken: string; checkoutUrl: string }>(
      `${this.base}/reports/checkout`,
      body,
    );
  }

  orderStatus(orderId: string, token: string): Observable<{ status: OrderStatus; downloadable: boolean }> {
    return this.http.get<{ status: OrderStatus; downloadable: boolean }>(`${this.base}/reports/orders/${orderId}`, {
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
