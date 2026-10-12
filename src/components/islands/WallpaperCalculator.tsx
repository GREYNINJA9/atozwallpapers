import { useMemo, useState } from 'preact/hooks';

interface Props {
  defaultCoverage?: number;
  wastageMin?: number;
  wastageMax?: number;
  priceMin?: number | null;
  priceMax?: number | null;
  whatsappDigits?: string;
}

export default function WallpaperCalculator({
  defaultCoverage = 57,
  wastageMin = 10,
  wastageMax = 15,
  priceMin = null,
  priceMax = null,
  whatsappDigits = '',
}: Props) {
  const [width, setWidth] = useState('12');
  const [height, setHeight] = useState('10');
  const [doors, setDoors] = useState('20');
  const [windows, setWindows] = useState('15');
  const [coverage, setCoverage] = useState(String(defaultCoverage));
  const [wastage, setWastage] = useState(String(wastageMin));

  const result = useMemo(() => {
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    const d = parseFloat(doors) || 0;
    const win = parseFloat(windows) || 0;
    const cov = parseFloat(coverage) || defaultCoverage;
    const waste = parseFloat(wastage) || wastageMin;

    const wallArea = Math.max(0, w * h - d - win);
    const withWaste = wallArea * (1 + waste / 100);
    const rolls = cov > 0 ? Math.ceil(withWaste / cov) : 0;
    const costMin = priceMin != null ? rolls * priceMin : null;
    const costMax = priceMax != null ? rolls * priceMax : null;

    return { wallArea, withWaste, rolls, costMin, costMax };
  }, [width, height, doors, windows, coverage, wastage, defaultCoverage, wastageMin, priceMin, priceMax]);

  function trackEstimate() {
    window.atozTrack?.('estimate_calculated', {
      rolls: result.rolls,
      wallArea: result.wallArea,
    });
  }

  const waMessage = encodeURIComponent(
    [
      'Hi A to Z Wallpapers — wallpaper estimate from website calculator:',
      `Wall: ${width} × ${height} ft`,
      `Doors/windows subtracted: ${doors} / ${windows} sq ft`,
      `Net area ≈ ${result.wallArea.toFixed(1)} sq ft (+${wastage}% wastage)`,
      `Rolls needed (≈${coverage} sq ft/roll): ${result.rolls}`,
      'Please share an exact quote for Faridabad.',
    ].join('\n'),
  );

  const field =
    'mt-1.5 w-full rounded-lg border border-charcoal/15 bg-cream px-3 py-2.5 text-sm focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30';

  return (
    <div class="grid gap-8 lg:grid-cols-2">
      <div class="space-y-4 rounded-lg border border-charcoal/10 bg-cream p-5 shadow-soft">
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="text-sm font-medium" for="calc-w">
              Wall width (ft)
            </label>
            <input id="calc-w" class={field} inputMode="decimal" value={width} onInput={(e) => setWidth((e.target as HTMLInputElement).value)} />
          </div>
          <div>
            <label class="text-sm font-medium" for="calc-h">
              Wall height (ft)
            </label>
            <input id="calc-h" class={field} inputMode="decimal" value={height} onInput={(e) => setHeight((e.target as HTMLInputElement).value)} />
          </div>
          <div>
            <label class="text-sm font-medium" for="calc-doors">
              Doors area (sq ft)
            </label>
            <input id="calc-doors" class={field} inputMode="decimal" value={doors} onInput={(e) => setDoors((e.target as HTMLInputElement).value)} />
          </div>
          <div>
            <label class="text-sm font-medium" for="calc-windows">
              Windows area (sq ft)
            </label>
            <input id="calc-windows" class={field} inputMode="decimal" value={windows} onInput={(e) => setWindows((e.target as HTMLInputElement).value)} />
          </div>
          <div>
            <label class="text-sm font-medium" for="calc-cov">
              Roll coverage (sq ft)
            </label>
            <input id="calc-cov" class={field} inputMode="decimal" value={coverage} onInput={(e) => setCoverage((e.target as HTMLInputElement).value)} />
          </div>
          <div>
            <label class="text-sm font-medium" for="calc-waste">
              Wastage % ({wastageMin}–{wastageMax} typical)
            </label>
            <input id="calc-waste" class={field} inputMode="decimal" value={wastage} onInput={(e) => setWastage((e.target as HTMLInputElement).value)} />
          </div>
        </div>
        <button type="button" class="btn-secondary w-full" onClick={trackEstimate}>
          Recalculate / log estimate
        </button>
      </div>

      <div class="rounded-lg border border-charcoal/10 bg-charcoal p-6 text-cream">
        <p class="text-sm text-cream/70">Indicative estimate</p>
        <p class="mt-2 font-heading text-4xl font-semibold">{result.rolls} rolls</p>
        <ul class="mt-4 space-y-2 text-sm text-cream/80">
          <li>Net wall area: {result.wallArea.toFixed(1)} sq ft</li>
          <li>With wastage: {result.withWaste.toFixed(1)} sq ft</li>
          <li>Coverage used: {coverage} sq ft / roll</li>
        </ul>
        {result.costMin != null && result.costMax != null ? (
          <p class="mt-4 text-lg">
            Indicative material: ₹{result.costMin.toLocaleString('en-IN')} – ₹{result.costMax.toLocaleString('en-IN')}
          </p>
        ) : (
          <p class="mt-4 text-sm text-cream/70">
            Material cost range: TODO-CONFIRM prices with owner before showing ₹ amounts.
          </p>
        )}
        <div class="mt-6 flex flex-col gap-3">
          {whatsappDigits ? (
            <a
              class="btn bg-[#25D366] text-white hover:opacity-90"
              href={`https://wa.me/${whatsappDigits}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_click"
              data-track-location="calculator"
              onClick={trackEstimate}
            >
              Send this estimate to WhatsApp
            </a>
          ) : (
            <p class="text-sm text-cream/60">WhatsApp number TODO-CONFIRM in site.ts</p>
          )}
          <a class="btn border border-cream/25 text-cream hover:bg-cream/10" href="/contact/" data-track="consultation_cta_click" data-track-location="calculator">
            Get an exact quote
          </a>
        </div>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    atozTrack?: (event: string, payload?: Record<string, unknown>) => void;
  }
}
