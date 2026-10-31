// Single source of truth for project disciplines.
// Add a new discipline here and it appears everywhere: schema, filters,
// project cards and project pages. Also add it to public/admin/config.yml.

export const CATEGORIES = [
  { value: 'branding',           label: 'Brand identity' },
  { value: 'logo',               label: 'Logo' },
  { value: 'packaging',          label: 'Packaging' },
  { value: 'creative-direction', label: 'Creative direction' },
  { value: 'print',              label: 'Print design' },
  { value: 'ui-ux',              label: 'UI/UX design' },
  { value: 'visual',             label: 'Visual design' },
  { value: 'illustration',       label: 'Illustration' },
  { value: 'web',                label: 'Web design' },
  { value: 'social-media',       label: 'Social media design' },
  { value: 'editorial',          label: 'Editorial design' }
] as const;

export const CATEGORY_VALUES = CATEGORIES.map(c => c.value) as [string, ...string[]];

const LABELS: Record<string, string> = Object.fromEntries(
  CATEGORIES.map(c => [c.value, c.label])
);

export function labelFor(value: string): string {
  return LABELS[value] ?? value;
}

/** Order a set of category values the same way they appear in CATEGORIES. */
export function sortCategories(values: string[]): string[] {
  const order = CATEGORIES.map(c => c.value as string);
  return [...values].sort((a, b) => order.indexOf(a) - order.indexOf(b));
}

// The five disciplines used by the Projects filter and the purple card subtitle.
// Each project belongs to exactly one (field `discipline`). The detailed list
// above stays as tags on the project page.
export const DISCIPLINES = [
  { value: 'branding',      label: 'Brand identity' },
  { value: 'logo',          label: 'Logo' },
  { value: 'packaging',     label: 'Packaging' },
  { value: 'ui-web',        label: 'UI/UX & web' },
  { value: 'visual-social', label: 'Visual & social media' }
] as const;

export const DISCIPLINE_VALUES = DISCIPLINES.map(d => d.value) as [string, ...string[]];

const DISCIPLINE_LABELS: Record<string, string> = Object.fromEntries(
  DISCIPLINES.map(d => [d.value, d.label])
);

// Fallback for a project without `discipline`: derived from its first tag.
const FROM_TAG: Record<string, string> = {
  'branding': 'branding', 'creative-direction': 'branding',
  'logo': 'logo', 'packaging': 'packaging',
  'ui-ux': 'ui-web', 'web': 'ui-web'
};

export function disciplineOf(data: { discipline?: string; category: string[] }): string {
  return data.discipline ?? FROM_TAG[data.category[0]] ?? 'visual-social';
}

export function disciplineLabel(value: string): string {
  return DISCIPLINE_LABELS[value] ?? value;
}
