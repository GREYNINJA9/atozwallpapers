import { useEffect, useRef, useState } from 'preact/hooks';
import type { JSX } from 'preact';

type Need = 'Wallpaper' | 'Interior' | 'Both';

interface Props {
  endpoint: string;
  whatsappDigits: string;
  thankYouPath?: string;
  compact?: boolean;
  sourceLabel?: string;
}

interface Attrs {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  msclkid?: string;
  fbclid?: string;
  landing_page?: string;
  referrer?: string;
}

const INDIAN_MOBILE = /^(?:\+?91[\s-]?)?[6-9]\d{9}$/;

function digitsOnly(phone: string): string {
  return phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');
}

export default function LeadForm({
  endpoint,
  whatsappDigits,
  thankYouPath = '/thank-you/',
  compact = false,
  sourceLabel = 'website',
}: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [need, setNeed] = useState<Need>('Wallpaper');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [roomType, setRoomType] = useState('');
  const [areaSqFt, setAreaSqFt] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [fallback, setFallback] = useState<string | null>(null);
  const startedAt = useRef(Date.now());
  const [attrs, setAttrs] = useState<Attrs>({});

  useEffect(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem('atoz_attrs') || '{}') as Attrs;
      setAttrs(stored);
    } catch {
      /* ignore */
    }
  }, []);

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) next.name = 'Please enter your name';
    if (!INDIAN_MOBILE.test(phone.trim())) {
      next.phone = 'Enter a valid 10-digit Indian mobile (optional +91)';
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'Enter a valid email or leave blank';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function buildWhatsAppFallback(): string {
    const lines = [
      'Hi A to Z Wallpapers — form fallback enquiry:',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Need: ${need}`,
      email && `Email: ${email}`,
      location && `Location: ${location}`,
      roomType && `Room: ${roomType}`,
      areaSqFt && `Area: ${areaSqFt} sq ft`,
      budget && `Budget: ${budget}`,
      message && `Message: ${message}`,
    ].filter(Boolean);
    const text = encodeURIComponent(lines.join('\n'));
    return whatsappDigits ? `https://wa.me/${whatsappDigits}?text=${text}` : '#';
  }

  async function onSubmit(e: JSX.TargetedEvent<HTMLFormElement, Event>) {
    e.preventDefault();
    setFallback(null);
    if (!validate()) return;

    // Honeypot or too-fast submit
    if (honeypot.trim()) return;
    if (Date.now() - startedAt.current < 2500) {
      setErrors({ form: 'Please take a moment and try again.' });
      return;
    }

    const payload = {
      name: name.trim(),
      phone: digitsOnly(phone),
      email: email.trim() || '',
      need,
      location: location.trim(),
      roomType: roomType.trim(),
      areaSqFt: areaSqFt.trim(),
      budget: budget.trim(),
      message: message.trim(),
      source: sourceLabel,
      timestamp: new Date().toISOString(),
      ...attrs,
      page: typeof window !== 'undefined' ? window.location.href : '',
      company: honeypot, // honeypot field name expected by Apps Script
      formStartedAt: startedAt.current,
    };

    setSubmitting(true);

    const goThankYou = () => {
      window.atozTrack?.('form_submit', { need, source: sourceLabel });
      window.location.href = thankYouPath;
    };

    if (!endpoint) {
      setFallback(buildWhatsAppFallback());
      setSubmitting(false);
      setErrors({
        form: 'Online form is not connected yet. Use WhatsApp below so we do not lose your enquiry.',
      });
      return;
    }

    try {
      // text/plain avoids CORS preflight to Apps Script
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        mode: 'cors',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // Apps Script often returns opaque/ok text
      goThankYou();
    } catch {
      setFallback(buildWhatsAppFallback());
      setErrors({
        form: 'We could not reach the server. Tap WhatsApp to send your details instantly — we will still call you back.',
      });
      setSubmitting(false);
    }
  }

  const fieldClass =
    'mt-1.5 w-full rounded-lg border border-charcoal/15 bg-cream px-3 py-2.5 text-sm text-charcoal placeholder:text-charcoal-muted/60 focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30';
  const labelClass = 'block text-sm font-medium text-charcoal';

  return (
    <form class="relative space-y-4" onSubmit={onSubmit} noValidate>
      <div class={compact ? 'grid gap-4' : 'grid gap-4 sm:grid-cols-2'}>
        <div>
          <label for="lead-name" class={labelClass}>
            Name <span class="text-terracotta">*</span>
          </label>
          <input
            id="lead-name"
            name="name"
            autocomplete="name"
            class={fieldClass}
            value={name}
            onInput={(e) => setName((e.target as HTMLInputElement).value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'err-name' : undefined}
            required
          />
          {errors.name && (
            <p id="err-name" class="mt-1 text-sm text-terracotta" role="alert">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label for="lead-phone" class={labelClass}>
            Phone <span class="text-terracotta">*</span>
          </label>
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autocomplete="tel"
            placeholder="98XXXXXXXX or +91…"
            class={fieldClass}
            value={phone}
            onInput={(e) => setPhone((e.target as HTMLInputElement).value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'err-phone' : undefined}
            required
          />
          {errors.phone && (
            <p id="err-phone" class="mt-1 text-sm text-terracotta" role="alert">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div class={compact ? '' : 'grid gap-4 sm:grid-cols-2'}>
        <div>
          <label for="lead-email" class={labelClass}>
            Email <span class="font-normal text-charcoal-muted">(optional)</span>
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            autocomplete="email"
            class={fieldClass}
            value={email}
            onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'err-email' : undefined}
          />
          {errors.email && (
            <p id="err-email" class="mt-1 text-sm text-terracotta" role="alert">
              {errors.email}
            </p>
          )}
        </div>
        {!compact && (
          <div>
            <label for="lead-need" class={labelClass}>
              I need
            </label>
            <select
              id="lead-need"
              name="need"
              class={fieldClass}
              value={need}
              onChange={(e) => setNeed((e.target as HTMLSelectElement).value as Need)}
            >
              <option value="Wallpaper">Wallpaper</option>
              <option value="Interior">Interior</option>
              <option value="Both">Both</option>
            </select>
          </div>
        )}
      </div>

      {compact && (
        <div>
          <label for="lead-need-c" class={labelClass}>
            I need
          </label>
          <select
            id="lead-need-c"
            name="need"
            class={fieldClass}
            value={need}
            onChange={(e) => setNeed((e.target as HTMLSelectElement).value as Need)}
          >
            <option value="Wallpaper">Wallpaper</option>
            <option value="Interior">Interior</option>
            <option value="Both">Both</option>
          </select>
        </div>
      )}

      <div>
        <button
          type="button"
          class="text-sm font-medium text-terracotta underline-offset-2 hover:underline"
          aria-expanded={detailsOpen}
          onClick={() => setDetailsOpen(!detailsOpen)}
        >
          {detailsOpen ? 'Hide optional details' : 'Add optional details (location, room, budget)'}
        </button>
        {detailsOpen && (
          <div class="mt-3 grid gap-4 sm:grid-cols-2">
            <div>
              <label for="lead-location" class={labelClass}>
                Location / sector
              </label>
              <input
                id="lead-location"
                class={fieldClass}
                value={location}
                onInput={(e) => setLocation((e.target as HTMLInputElement).value)}
                placeholder="e.g. Sector 19, Faridabad"
              />
            </div>
            <div>
              <label for="lead-room" class={labelClass}>
                Room type
              </label>
              <input
                id="lead-room"
                class={fieldClass}
                value={roomType}
                onInput={(e) => setRoomType((e.target as HTMLInputElement).value)}
                placeholder="Living / Bedroom / Kids…"
              />
            </div>
            <div>
              <label for="lead-area" class={labelClass}>
                Area (sq ft)
              </label>
              <input
                id="lead-area"
                class={fieldClass}
                inputMode="numeric"
                value={areaSqFt}
                onInput={(e) => setAreaSqFt((e.target as HTMLInputElement).value)}
              />
            </div>
            <div>
              <label for="lead-budget" class={labelClass}>
                Budget
              </label>
              <input
                id="lead-budget"
                class={fieldClass}
                value={budget}
                onInput={(e) => setBudget((e.target as HTMLInputElement).value)}
                placeholder="Optional range"
              />
            </div>
            <div class="sm:col-span-2">
              <label for="lead-message" class={labelClass}>
                Message
              </label>
              <textarea
                id="lead-message"
                class={`${fieldClass} min-h-[88px]`}
                value={message}
                onInput={(e) => setMessage((e.target as HTMLTextAreaElement).value)}
                rows={3}
              />
            </div>
          </div>
        )}
      </div>

      {/* Honeypot — hidden from users */}
      <div class="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Company
          <input
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onInput={(e) => setHoneypot((e.target as HTMLInputElement).value)}
          />
        </label>
      </div>

      {errors.form && (
        <p class="rounded-lg border border-terracotta/30 bg-terracotta/5 px-3 py-2 text-sm text-charcoal" role="alert">
          {errors.form}
        </p>
      )}

      {fallback && whatsappDigits && (
        <a
          href={fallback}
          class="btn-primary w-full"
          target="_blank"
          rel="noopener noreferrer"
          data-track="whatsapp_click"
          data-track-location="form_fallback"
        >
          Send details on WhatsApp
        </a>
      )}

      <button type="submit" class="btn-primary w-full disabled:opacity-60" disabled={submitting}>
        {submitting ? 'Sending…' : 'Book Free Consultation'}
      </button>
      <p class="text-center text-xs text-charcoal-muted">We reply within one business day. Free Consultation Book Karein.</p>
    </form>
  );
}

declare global {
  interface Window {
    atozTrack?: (event: string, payload?: Record<string, unknown>) => void;
  }
}
