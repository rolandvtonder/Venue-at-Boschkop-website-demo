/**
 * Turns the original Facebook photos in /media into web-sized WebP files in
 * /public/media, and writes src/media.json (each image's size, so the page
 * can reserve space and never jump while photos load).
 *
 * Add a photo: drop the original into /media, add a line to PHOTOS below
 * (and to the gallery list in src/content.ts), then run `npm run media`.
 *
 * `cut` trims a fraction off the bottom (to remove the text banners the
 * Facebook posts carry). `half` takes the top or bottom of a two-photo
 * collage.
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const SRC = 'media';
const OUT = 'public/media';
const SIZES = [800, 1600];

const PHOTOS = [
  ['717632122', 'rustic-hall-buffet', {cut: 0.08}],
  ['718164447', 'hall-birthday-setup', {cut: 0.08}],
  ['732453423', 'garden-path', {half: 'top'}],
  ['732453423', 'lawn-under-trees', {half: 'bottom', cut: 0.04}],
  ['733448679', 'evening-lawn-party', {half: 'top'}],
  ['733448679', 'evening-tree-lights', {half: 'bottom', cut: 0.1}],
  ['733674063', 'boma-braai-fires', {cut: 0.06}],
  ['758488740', 'hen-and-chicks', {}],
  ['758944050', 'pastel-party-tables', {half: 'top'}],
  ['758944050', 'pastel-party-castle', {half: 'bottom', cut: 0.04}],
  ['758964649', 'peacock', {cut: 0.1}],
  ['759547558', 'thatch-umbrella', {cut: 0.37}],
  ['759942024', 'donkeys', {half: 'top'}],
  ['759942024', 'rabbits', {half: 'bottom', cut: 0.04}],
  ['775416718', 'feeding-the-donkeys', {}],
  ['775567424', 'pony-ride', {}],
  ['776253039', 'train-ride', {}],
  ['776610214', 'farmyard-lawn', {}],
  ['789845418', 'train-carriages', {cut: 0.27}],
  ['790269035', 'kiosk', {cut: 0.1}],
  ['790591043', 'jumping-castle-trees', {cut: 0.3}],
  ['790591053', 'soft-play-slide', {cut: 0.24}],
  ['790683929', 'balloon-arch', {cut: 0.4}],
  ['791145007', 'bouncy-giraffe', {cut: 0.27}],
  ['791335189', 'jumping-castle', {cut: 0.25}],
  ['791974950', 'pony-grazing', {cut: 0.25}],
  ['792090215', 'donkeys-at-the-fence', {cut: 0.25}],
  ['795431292', 'birthday-centrepiece', {}],
  ['795485773', 'evening-string-lights', {}],
  ['796831852', 'long-tables-on-the-lawn', {}],
  ['798785079', 'princess-party-table', {}],
  ['798785087', 'party-bags-table', {}],
  ['798785089', 'costume-pony-ride', {}],
  ['798797711', 'pony-cart', {}],
  ['799142858', 'kiddies-tables', {}],
  ['799170332', 'pink-carpet-arch', {}],
  ['818961968', 'evening-buffet', {}],
  ['819336169', 'pond-at-dusk', {}],
  ['819524395', 'evening-celebration', {}],
  ['819602077', 'lawn-day-setup', {}],
  ['825271447', 'boma-area', {cut: 0.25}],
  ['825279490', 'waterslide', {}],
  ['825279517', 'inflatable-obstacle', {}],
];

const find = (id) => fs.readdirSync(SRC).find((f) => f.startsWith(id));

fs.mkdirSync(OUT, {recursive: true});
const manifest = {};

for (const [id, name, {cut = 0, half}] of PHOTOS) {
  const file = find(id);
  if (!file) throw new Error(`No photo in ${SRC}/ starting with ${id}`);
  const base = sharp(path.join(SRC, file)).rotate();
  const {width, height} = await base.metadata();
  let top = 0;
  let h = height;
  if (half) {
    h = Math.floor(height / 2) - 4;
    top = half === 'top' ? 0 : height - h;
  }
  h = Math.floor(h * (1 - cut));
  const crop = {left: 0, top, width, height: h};

  for (const w of SIZES) {
    const tw = Math.min(w, width);
    await sharp(path.join(SRC, file)).rotate().extract(crop).resize({width: tw}).webp({quality: 74}).toFile(`${OUT}/${name}-${w}.webp`);
  }
  manifest[name] = {w: width, h};
  console.log(name.padEnd(26), `${width}×${h}`);
}

// Logo: lime script on black → lime (and ink) on transparent, using the
// green channel as the alpha mask so the anti-aliased edges stay smooth.
const LIME = {r: 0xa5, g: 0xcd, b: 0x3b};
const INK = {r: 0x0c, g: 0x0e, b: 0x09};
const logo = path.join(SRC, 'logo.jpg');
const alpha = await sharp(logo).extractChannel('green').linear(255 / 200, -12).toBuffer();
const {width: lw, height: lh} = await sharp(logo).metadata();
for (const [tone, rgb] of [['lime', LIME], ['ink', INK]]) {
  const solid = await sharp({create: {width: lw, height: lh, channels: 3, background: rgb}}).png().toBuffer();
  const png = await sharp(solid).joinChannel(alpha).png().toBuffer();
  await sharp(png).trim({threshold: 10}).resize({width: 720}).png({compressionLevel: 9}).toFile(`${OUT}/logo-${tone}.png`);
}
const trimmed = await sharp(`${OUT}/logo-lime.png`).metadata();
manifest.logo = {w: trimmed.width, h: trimmed.height};

// Favicon and social card.
const sprig = await sharp(logo).extract({left: 1560, top: 500, width: 300, height: 700}).resize({height: 56}).toBuffer();
await sharp({create: {width: 64, height: 64, channels: 3, background: INK}})
  .composite([{input: sprig, gravity: 'center'}])
  .png()
  .toFile('public/favicon.png');
await sharp(logo).resize(1200, 630, {fit: 'contain', background: '#000'}).jpeg({quality: 80}).toFile(`${OUT}/social-card.jpg`);

fs.writeFileSync('src/media.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n${Object.keys(manifest).length} images → ${OUT}/, sizes → src/media.json`);
