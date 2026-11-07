import { ApplicationRef, Component, DestroyRef, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PageContext } from './core/routing/page-context';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class App {
  constructor() {
    inject(PageContext).start(inject(DestroyRef));
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      // first page rendered with its translations: lets the entry splash in index.html fade out
      void inject(ApplicationRef).whenStable().then(() => document.dispatchEvent(new Event('app-ready')));
    }
  }
}
