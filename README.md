# CarImport.eu – kalkulator kosztów importu pojazdów do UE

SaaS do wyceny importu aut z USA, Kanady, Japonii, ZEA i UK do dowolnego kraju UE: opłaty aukcyjne, transport,
wartość celna CIF, cło (TARIC), akcyza, VAT importowy zależny od portu odprawy, rejestracja.

| Katalog     | Stos                                                                  |
|-------------|-----------------------------------------------------------------------|
| `backend/`  | Spring Boot 3.5, Java 21, PostgreSQL + Flyway, Stripe, OpenHTMLtoPDF  |
| `frontend/` | Angular 21 (standalone, Signals, control flow, zoneless), Tailwind 4, ngx-translate, Chart.js |
| `docs/`     | [Architektura](docs/ARCHITECTURE.md) – model danych, silnik, frontend, i18n, płatności |

## Uruchomienie lokalne

```bash
# 1. baza + API
cd backend && mvn package && cd ..
docker compose up -d            # Postgres :5432, API :8080 (Flyway tworzy schemat i dane przykładowe)

# 2. frontend
cd frontend && npm install && npm start   # http://localhost:4200 → przekierowanie na /pl, /en, /de lub /uk

# 3. płatności (opcjonalnie) – przekazywanie webhooków Stripe na localhost
stripe listen --forward-to localhost:8080/api/v1/webhooks/stripe   # wypisze STRIPE_WEBHOOK_SECRET
```

Kursy walut pobiera `FxSyncJob` z API NBP w dni robocze ok. 12:20 i 23:20 (Europe/Warsaw).

## Testy

```bash
cd backend && mvn test     # silnik kalkulacji (kwoty liczone ręcznie), widok darmowy, render PDF w 4 językach
cd frontend && npx ng build
```

> Dane referencyjne w `V2__reference_data.sql` (stawki aukcji, fracht, VAT kolekcjonerski) to **realistyczne
> wartości przykładowe** – przed startem produkcyjnym muszą zostać zweryfikowane i dalej utrzymywane z panelu admina.
