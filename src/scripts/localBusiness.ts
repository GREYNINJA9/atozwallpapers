import { site, fullAddress } from '../data/site';
import { getImageUrl } from '../data/imageAssets';

export function localBusinessJsonLd() {
  const sameAs = [
    site.social.instagram,
    site.social.facebook,
    site.social.youtube,
    site.social.pinterest,
    site.google.businessProfileUrl,
  ].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${site.url}/#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    image: getImageUrl('og-default.jpg'),
    telephone: site.phone.e164 || undefined,
    email: site.email || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${site.address.street}, ${site.address.locality}`,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    openingHoursSpecification: site.hours.schema.map((h) => {
      // Simple Mo-Sa 10:00-19:00 parser
      const match = h.match(/^([A-Za-z]+)-([A-Za-z]+)\s+(\d{2}:\d{2})-(\d{2}:\d{2})$/);
      if (!match) return { '@type': 'OpeningHoursSpecification', description: h };
      const dayMap: Record<string, string> = {
        Mo: 'Monday',
        Tu: 'Tuesday',
        We: 'Wednesday',
        Th: 'Thursday',
        Fr: 'Friday',
        Sa: 'Saturday',
        Su: 'Sunday',
      };
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: Object.keys(dayMap)
          .slice(
            Object.keys(dayMap).indexOf(match[1]),
            Object.keys(dayMap).indexOf(match[2]) + 1,
          )
          .map((d) => dayMap[d]),
        opens: match[3],
        closes: match[4],
      };
    }),
    areaServed: [
      { '@type': 'City', name: site.serviceArea.primary },
      ...site.serviceArea.areas.map((a) => ({
        '@type': 'Place',
        name: `${a}, Faridabad`,
      })),
      { '@type': 'AdministrativeArea', name: site.serviceArea.nearby },
    ],
    priceRange: '₹₹', // TODO-CONFIRM
    sameAs: sameAs.length ? sameAs : undefined,
    hasMap: site.google.mapsPlaceUrl || undefined,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}

export function articleJsonLd(opts: {
  title: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    image: getImageUrl(opts.image),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified || opts.datePublished,
    author: {
      '@type': 'Organization',
      name: site.name,
    },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: {
        '@type': 'ImageObject',
        url: `${site.url}/favicon.svg`,
      },
    },
    mainEntityOfPage: `${site.url}${opts.path}`,
  };
}

export function serviceJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': ['Service', 'Product'],
    name: opts.name,
    description: opts.description,
    url: `${site.url}${opts.path}`,
    image: opts.image ? getImageUrl(opts.image) : undefined,
    provider: { '@id': `${site.url}/#business` },
    brand: { '@type': 'Brand', name: site.name },
    areaServed: {
      '@type': 'City',
      name: 'Faridabad',
    },
  };
}

/** Debug helper — not used in markup */
export function napLine() {
  return fullAddress();
}
