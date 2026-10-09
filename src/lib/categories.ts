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
