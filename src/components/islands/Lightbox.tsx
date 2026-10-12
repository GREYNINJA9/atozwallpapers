import { useEffect, useState } from 'preact/hooks';

interface Props {
  images: { src: string; alt: string }[];
  pageUrl?: string;
  siteOrigin?: string;
}

function absUrl(src: string, origin: string) {
  if (src.startsWith('http')) return src;
  return `${origin}${src}`;
}

export default function Lightbox({ images, pageUrl = '', siteOrigin = '' }: Props) {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIndex(null);
      if (e.key === 'ArrowRight') setIndex((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === 'ArrowLeft')
        setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    window.atozTrack?.('gallery_open', { index });
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [index, images.length]);

  return (
    <>
      <ul class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => (
          <li key={img.src + i}>
            <button
              type="button"
              class="group relative block w-full overflow-hidden rounded-lg focus-visible:outline-terracotta"
              onClick={() => setIndex(i)}
              aria-label={`Open image: ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                width={800}
                height={1000}
                loading="lazy"
                class="aspect-[2/3] w-full object-cover transition duration-500 group-hover:scale-[1.02] sm:aspect-[4/3]"
                data-pin-nopin="false"
              />
            </button>
            {pageUrl && siteOrigin && (
              <a
                class="mt-2 inline-flex min-h-11 items-center text-xs font-medium text-terracotta underline"
                href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(pageUrl)}&media=${encodeURIComponent(absUrl(img.src, siteOrigin))}&description=${encodeURIComponent(img.alt)}`}
                target="_blank"
                rel="noopener noreferrer"
                data-pin-do="buttonPin"
              >
                Save
              </a>
            )}
          </li>
        ))}
      </ul>

      {index !== null && (
        <div
          class="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
          onClick={() => setIndex(null)}
        >
          <button
            type="button"
            class="absolute top-4 right-4 min-h-11 min-w-11 rounded-lg bg-cream/10 px-3 text-cream"
            onClick={() => setIndex(null)}
          >
            Close
          </button>
          <button
            type="button"
            class="absolute left-2 min-h-11 rounded-lg bg-cream/10 px-3 text-cream sm:left-6"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
            }}
          >
            Prev
          </button>
          <img
            src={images[index].src}
            alt={images[index].alt}
            class="max-h-[85vh] max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            class="absolute right-2 min-h-11 rounded-lg bg-cream/10 px-3 text-cream sm:right-6"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i === null ? i : (i + 1) % images.length));
            }}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

declare global {
  interface Window {
    atozTrack?: (event: string, payload?: Record<string, unknown>) => void;
  }
}
