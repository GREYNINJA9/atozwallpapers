import { useId, useRef, useState } from 'preact/hooks';

interface Props {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
}

export default function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt = 'Before — PLACEHOLDER: replace with real project photo',
  afterAlt = 'After — PLACEHOLDER: replace with real project photo',
}: Props) {
  const [pos, setPos] = useState(50);
  const id = useId();
  const dragging = useRef(false);
  const container = useRef<HTMLDivElement>(null);

  function setFromClientX(clientX: number) {
    const el = container.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }

  return (
    <div
      ref={container}
      class="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-cream-dark select-none"
      onMouseDown={(e) => {
        dragging.current = true;
        setFromClientX(e.clientX);
      }}
      onMouseMove={(e) => {
        if (dragging.current) setFromClientX(e.clientX);
      }}
      onMouseUp={() => {
        dragging.current = false;
      }}
      onMouseLeave={() => {
        dragging.current = false;
      }}
      onTouchStart={(e) => setFromClientX(e.touches[0].clientX)}
      onTouchMove={(e) => setFromClientX(e.touches[0].clientX)}
    >
      <img src={afterSrc} alt={afterAlt} class="absolute inset-0 h-full w-full object-cover" width={1200} height={900} loading="lazy" />
      <div class="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={beforeSrc}
          alt={beforeAlt}
          class="absolute inset-0 h-full max-w-none object-cover"
          style={{ width: container.current ? `${container.current.clientWidth}px` : '100%' }}
          width={1200}
          height={900}
          loading="lazy"
        />
      </div>
      <div
        class="absolute inset-y-0 z-10 w-0.5 bg-cream shadow-soft"
        style={{ left: `${pos}%` }}
        aria-hidden="true"
      >
        <div class="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-charcoal/10 bg-cream text-charcoal shadow-soft">
          ⇆
        </div>
      </div>
      <label class="sr-only" for={id}>
        Compare before and after
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={pos}
        class="absolute inset-0 z-20 cursor-ew-resize opacity-0"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onInput={(e) => setPos(Number((e.target as HTMLInputElement).value))}
      />
      <span class="absolute top-3 left-3 rounded bg-charcoal/70 px-2 py-1 text-xs text-cream">Before</span>
      <span class="absolute top-3 right-3 rounded bg-charcoal/70 px-2 py-1 text-xs text-cream">After</span>
    </div>
  );
}
