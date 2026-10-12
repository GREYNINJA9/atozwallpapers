import { useState } from 'preact/hooks';

interface Item {
  question: string;
  answer: string;
}

interface Props {
  items: Item[];
}

export default function FaqAccordion({ items }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div class="divide-y divide-charcoal/10 rounded-lg border border-charcoal/10 bg-cream">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        const btnId = `faq-btn-${i}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={btnId}
                type="button"
                class="flex min-h-11 w-full items-center justify-between gap-4 px-4 py-3 text-left text-base font-medium text-charcoal hover:bg-cream-dark/50"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.question}</span>
                <span class="text-terracotta" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              class="px-4 pb-4 text-sm leading-relaxed text-charcoal-muted"
            >
              {isOpen && <p>{item.answer}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
