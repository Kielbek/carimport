import { Component, computed, input } from '@angular/core';

/** One block of article text: a paragraph, or a list built from consecutive lines starting with "• ". */
type Block = { list: false; text: string } | { list: true; items: string[] };

/**
 * Renders translated article text: paragraphs separated by new lines, and lines starting with "• " as a bullet list -
 * so long guide sections stay plain strings in the translation files.
 */
@Component({
  selector: 'app-article-text',
  template: `
    @for (b of blocks(); track $index) {
      @if (b.list) {
        <ul class="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed text-fg/85">
          @for (i of b.items; track $index) { <li>{{ i }}</li> }
        </ul>
      } @else {
        <p class="mt-3 leading-relaxed text-fg/85">{{ b.text }}</p>
      }
    }
  `,
})
export class ArticleText {
  readonly text = input.required<string>();

  protected readonly blocks = computed(() => {
    const out: Block[] = [];
    for (const line of this.text().split('\n').map((l) => l.trim()).filter(Boolean)) {
      const last = out[out.length - 1];
      if (line.startsWith('• ')) {
        if (last?.list) {
          last.items.push(line.slice(2));
        } else {
          out.push({ list: true, items: [line.slice(2)] });
        }
      } else {
        out.push({ list: false, text: line });
      }
    }
    return out;
  });
}
