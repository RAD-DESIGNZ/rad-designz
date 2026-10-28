/**
 * Some exported images carry a thin light line (1–3 px) along one or more
 * edges. This finds such lines and paints them over with the image's own
 * colour just inside the edge, then swaps the image for the cleaned copy.
 * Images without stray edge lines are left untouched.
 */
const DEPTH = 3;      // how many outer pixel lines can count as a stray line
const LIGHTER = 25;   // how much lighter than the inside a line must be

export function cleanEdges(img: HTMLImageElement): void {
  if (img.dataset.edges) return;
  img.dataset.edges = 'checked';
  const w = img.naturalWidth, h = img.naturalHeight;
  if (!w || !h || w < 16 || h < 16) return;

  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return;
  ctx.drawImage(img, 0, 0);
  let data: ImageData;
  try { data = ctx.getImageData(0, 0, w, h); } catch { return; }
  const d = data.data;

  const lum = (i: number) => (d[i] + d[i + 1] + d[i + 2]) / 3;
  const row = (y: number) => { let s = 0; for (let x = 0; x < w; x++) s += lum((y * w + x) * 4); return s / w; };
  const col = (x: number) => { let s = 0; for (let y = 0; y < h; y++) s += lum((y * w + x) * 4); return s / h; };
  const depth = (line: (i: number) => number) => {
    const inside = line(DEPTH);
    let k = 0;
    for (let i = 0; i < DEPTH; i++) if (line(i) - inside > LIGHTER) k = i + 1;
    return k;
  };

  const top = depth(y => row(y));
  const bottom = depth(y => row(h - 1 - y));
  const left = depth(x => col(x));
  const right = depth(x => col(w - 1 - x));
  if (!top && !bottom && !left && !right) return;

  const copyRow = (from: number, to: number) => d.copyWithin(to * w * 4, from * w * 4, (from + 1) * w * 4);
  const copyCol = (from: number, to: number) => {
    for (let y = 0; y < h; y++) {
      const a = (y * w + from) * 4, b = (y * w + to) * 4;
      d[b] = d[a]; d[b + 1] = d[a + 1]; d[b + 2] = d[a + 2]; d[b + 3] = d[a + 3];
    }
  };
  for (let y = 0; y < top; y++) copyRow(top, y);
  for (let y = 0; y < bottom; y++) copyRow(h - 1 - bottom, h - 1 - y);
  for (let x = 0; x < left; x++) copyCol(left, x);
  for (let x = 0; x < right; x++) copyCol(w - 1 - right, w - 1 - x);
  ctx.putImageData(data, 0, 0);

  canvas.toBlob((blob) => {
    if (!blob) return;
    img.dataset.edges = 'cleaned';
    img.src = URL.createObjectURL(blob);
  }, 'image/webp', 0.95);
}

/** Clean an image now if it has loaded, otherwise as soon as it does. */
export function cleanWhenLoaded(img: HTMLImageElement): void {
  if (img.complete && img.naturalWidth) cleanEdges(img);
  else img.addEventListener('load', () => cleanEdges(img), { once: true });
}
