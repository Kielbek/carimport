# Carglo – kalkulator kosztów importu pojazdów do UE

SaaS do wyceny importu aut z USA, Kanady, Japonii, ZEA i UK do dowolnego kraju UE: opłaty aukcyjne, transport,
wartość celna CIF, cło (TARIC), akcyza, VAT importowy zależny od portu odprawy, rejestracja.

| Katalog     | Stos                                                                  |
|-------------|-----------------------------------------------------------------------|
| `backend/`  | Spring Boot 3.5, Java 21, PostgreSQL + Flyway, Stripe, OpenHTMLtoPDF  |
| `frontend/` | Angular 21 (standalone, Signals, zoneless, prerender/SSG), Tailwind 4, ngx-translate, Chart.js, Lucide, flag-icons |
| `docs/`     | [Architektura](docs/ARCHITECTURE.md) – model danych, silnik, frontend, i18n, płatności; [strona główna](docs/assets/home-dark.png), [kalkulator – wynik](docs/assets/calculator-result.png), [motyw jasny](docs/assets/home-light.png), [mapa tras](docs/assets/import-map.png), [przykładowy raport PDF](docs/assets/sample-report-pl.pdf) |

## Uruchomienie lokalne

```bash
# 1. baza + API
cd backend && mvn package && cd ..
docker compose up -d            # Postgres :5432, API :8080 (Flyway tworzy schemat i dane przykładowe)

# 2. frontend
cd frontend && npm install && npm start   # http://localhost:4200 → przekierowanie na /pl, /en, /de lub /uk
npx ng build                              # dist/frontend/browser: statyczny serwis (12 prerenderowanych stron) na CDN

# 3. płatności (opcjonalnie) – przekazywanie webhooków Stripe na localhost
stripe listen --forward-to localhost:8080/api/v1/webhooks/stripe   # wypisze STRIPE_WEBHOOK_SECRET
```

Kursy walut pobiera `FxSyncJob` z API NBP w dni robocze ok. 12:20 i 23:20 (Europe/Warsaw).

## Produkcja

```bash
cp .env.example .env        # uzupełnij: hasło bazy, domena, dane firmy, klucze Stripe, SMTP, geokoder/router
docker compose -f docker-compose.prod.yml --env-file .env up -d --build
```

Trzy kontenery: PostgreSQL, API (`backend/Dockerfile`) i nginx ze statyczną stroną, który przekazuje `/api` do API
(`frontend/Dockerfile`, `frontend/nginx.conf` – cache, nagłówki bezpieczeństwa, CSP). TLS terminuje warstwa przed nim
(Caddy, Traefik, load balancer, Cloudflare). CI (`.github/workflows/ci.yml`) uruchamia testy backendu, sprawdza
kompletność tłumaczeń, buduje stronę i oba obrazy przy każdym pushu.

### Logi

Każde żądanie API dostaje identyfikator (`X-Request-Id`, nadawany przez nginx). Widać go w logu nginx (`rid=…`),
w każdej linii API (`INFO [id]`) i w nagłówku odpowiedzi, a przy błędzie 500 także w treści odpowiedzi
(`requestId`). Jeden `grep` pokazuje więc całą historię żądania.

```bash
docker compose -f docker-compose.prod.yml logs -f api           # API na żywo
docker compose -f docker-compose.prod.yml logs -f web           # nginx (dostęp do strony)
docker compose -f docker-compose.prod.yml logs api | grep ERROR # tylko błędy
docker compose -f docker-compose.prod.yml exec api sh -c 'grep "Order " /data/logs/api.log'   # zamówienia i płatności
docker compose -f docker-compose.prod.yml exec api sh -c 'grep <request-id> /data/logs/api.log'
```

* **Dostęp** (logger `access`): metoda, ścieżka, status, czas, IP – bez parametrów zapytania (tam jest id sesji Stripe).
* **Zdarzenia**: wycena, zamówienie, płatność (kwota, sesja), wygaśnięcie, zwrot, zdarzenie Stripe, wygenerowanie PDF,
  wysyłka maila, zgłoszenie do firmy importowej. Bez imion, e-maili i telefonów.
* **Błędy**: nieobsłużony wyjątek → `ERROR Unhandled error` z pełnym stack trace.
* **Rotacja**: plik `/data/logs/api.log` (wolumen `logs`): 20 MB na plik, 14 dni, maks. 1 GB. Logi Dockera
  (`docker compose logs`): 5 × 20 MB na kontener.
* **Poziomy** w `.env`: `LOG_LEVEL=DEBUG` (kod aplikacji), `ACCESS_LOG_LEVEL=WARN` (tylko odpowiedzi 5xx).

### Przykładowe raporty i analityka

`frontend/public/samples/report-{lang}.pdf` to raporty pokazowe (ten sam samochód sprowadzany do kraju danego języka,
ze znakiem wodnym), linkowane przy przycisku zakupu. Po zmianie stawek lub szablonu wygeneruj je ponownie z działającą
bazą:

```bash
cd backend && mvn package -DskipTests
java -jar target/carimport-backend-0.1.0-SNAPSHOT.jar --spring.profiles.active=samples --samples.dir=../frontend/public/samples
```

Analityka konwersji (`core/analytics`) ładuje się dopiero po zgodzie na cookies analityczne. Włącza się ją w
`SITE.analytics` (`plausible` z domeną albo `ga4` z identyfikatorem G-…) i dopisuje host dostawcy do CSP w
`frontend/nginx.conf`. Zdarzenia: kroki kalkulatora, VIN, wycena, otwarcie płatności, przykładowy raport, start
płatności, zakup, zapytanie do partnera – bez danych osobowych i bez tokenu z adresu raportu.

## Testy

```bash
cd backend && mvn test     # silnik kalkulacji (kwoty liczone ręcznie), widok darmowy, render PDF w 4 językach
cd frontend && node tools/check-i18n.mjs && npx ng build
```

> Dane referencyjne w `V2__reference_data.sql` (stawki aukcji, fracht, VAT kolekcjonerski) to **realistyczne
> wartości przykładowe** – przed startem produkcyjnym muszą zostać zweryfikowane i dalej utrzymywane z panelu admina.
