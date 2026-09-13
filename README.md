# RAD DESIGNZ

Portfolio site for RAD DESIGNZ — branding, logo design, creative direction and packaging.

Built with [Astro](https://astro.build). Content is managed through
[Decap CMS](https://decapcms.org) at `/admin`, which commits directly to this repository.

## Structure

```
src/
  content/projects/   one markdown file per project
  pages/              index, work, about, contact, work/[slug]
  layouts/            Base.astro
  components/         Nav, Footer, ProjectCard
  styles/global.css   design tokens and all styling
public/
  admin/              Decap CMS panel and config
  uploads/            project images
  logo/               brand assets
```

## Local development

```
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

## Design tokens

Defined at the top of `src/styles/global.css`.

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#0B0B0F` | page background |
| `--surface` | `#17171D` | panels |
| `--elevated` | `#26262F` | image placeholders |
| `--gray` | `#8E8E9C` | secondary text |
| `--violet` | `#4C1D95` | offset shadows, rules |
| `--purple` | `#A855F7` | primary brand colour |
| `--lavender` | `#D8B4FE` | links |
| `--pop` | `#FFE600` | accent, used sparingly |

## Images

Export as JPG, maximum 2000px on the long edge, under 500KB.
Keep print-resolution originals outside this repository.
