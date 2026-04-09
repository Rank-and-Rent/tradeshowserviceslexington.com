import fs from "node:fs";
import path from "node:path";

const TYPE_PREFIX: Record<string, string> = {
  services: "services",
  locations: "locations",
  venues: "venues",
  eventtypes: "event-types",
  boothtypes: "booth-types",
  industries: "industries",
  capabilities: "capabilities",
  rentals: "rentals",
  exhibittypes: "exhibit-types",
};

function kebab(v: string) {
  return v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function camel(v: string) {
  return kebab(v).replace(/-([a-z])/g, (_: any, c: string) => c.toUpperCase());
}
function snake(v: string) {
  return kebab(v).replace(/-/g, "_");
}

function dirVariants(kind: string): string[] {
  const k = kebab(kind);
  const variants = Array.from(new Set([k, camel(k), snake(k)]));
  const bases = [
    "media/generated",
    "media/recovered",
    "media/planned",
    "media/required",
    "generated",
    "images",
    "art",
  ];
  const out: string[] = [];
  for (const b of bases) for (const v of variants) out.push(`${b}/${v}`);
  out.push("images", "media");
  return out;
}

const TYPE_DIR_CANDIDATES: Record<string, string[]> = {
  services: dirVariants("services"),
  locations: dirVariants("locations"),
  venues: [...dirVariants("venues"), "art/venues"],
  eventtypes: dirVariants("event-types"),
  boothtypes: dirVariants("booth-types"),
  industries: dirVariants("industries"),
  capabilities: dirVariants("capabilities"),
  rentals: dirVariants("rentals"),
  exhibittypes: dirVariants("exhibit-types"),
};

const IMG_RE = /\.(webp|png|jpg|jpeg|svg)$/i;

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/\.(webp|png|jpg|jpeg|svg)$/i, "").replace(/[^a-z0-9]+/g, "-");
}

function fileContainsSlug(fileNorm: string, slug: string): boolean {
  const s = kebab(slug);
  if (!s) return false;
  return (
    fileNorm === s ||
    fileNorm.startsWith(`${s}-`) ||
    fileNorm.endsWith(`-${s}`) ||
    fileNorm.includes(`-${s}-`)
  );
}

function scoreMatch(fileNorm: string, slug: string, prefix: string): number {
  const s = kebab(slug);
  // Prefer: prefix-slug-...  > slug-... > contains -slug- > ends -slug
  if (fileNorm.startsWith(`${prefix}-${s}-`) || fileNorm === `${prefix}-${s}`) return 100;
  if (fileNorm.startsWith(`${s}-`) || fileNorm === s) return 80;
  if (fileNorm.includes(`-${s}-`)) return 60;
  if (fileNorm.endsWith(`-${s}`)) return 50;
  return 0;
}

function pickBest(
  files: { rel: string; name: string }[],
  slug: string,
  prefix: string
): string | null {
  let best: { rel: string; score: number; lenDelta: number } | null = null;
  const s = kebab(slug);
  for (const f of files) {
    if (!IMG_RE.test(f.name)) continue;
    const norm = normalizeName(f.name);
    if (!fileContainsSlug(norm, s)) continue;
    const score = scoreMatch(norm, slug, prefix);
    if (score === 0) continue;
    const lenDelta = Math.abs(norm.length - s.length);
    if (
      !best ||
      score > best.score ||
      (score === best.score && lenDelta < best.lenDelta)
    ) {
      best = { rel: f.rel, score, lenDelta };
    }
  }
  return best ? best.rel : null;
}

function listDirShallow(abs: string): string[] {
  try {
    return fs.readdirSync(abs);
  } catch {
    return [];
  }
}

export function getRecoveredTaxonomyMediaUrl(kind: string, slug: string): string | null {
  const normalizedKind = kebab(kind).replace(/-/g, "");
  const typePrefix = TYPE_PREFIX[normalizedKind];
  const directoryCandidates = TYPE_DIR_CANDIDATES[normalizedKind];
  if (!typePrefix || !directoryCandidates?.length) return null;

  const s = kebab(slug);
  const publicRoot = path.join(process.cwd(), "public");

  for (const rel of directoryCandidates) {
    const abs = path.join(publicRoot, rel);
    if (!fs.existsSync(abs)) continue;
    const entries = listDirShallow(abs);
    if (!entries.length) continue;

    // 1) files at top level
    const topFiles = entries
      .filter((n) => {
        try {
          return fs.statSync(path.join(abs, n)).isFile();
        } catch {
          return false;
        }
      })
      .map((n) => ({ rel: `/${rel}/${n}`, name: n }));
    const topBest = pickBest(topFiles, slug, typePrefix);
    if (topBest) return topBest;

    // 2) subdirectories: prefer exact slug-named subdir
    const subdirs = entries.filter((n) => {
      try {
        return fs.statSync(path.join(abs, n)).isDirectory();
      } catch {
        return false;
      }
    });

    const slugDir =
      subdirs.find((d) => kebab(d) === s) ||
      subdirs.find((d) => kebab(d).includes(s));
    if (slugDir) {
      const subAbs = path.join(abs, slugDir);
      const subFiles = listDirShallow(subAbs)
        .filter((n) => IMG_RE.test(n))
        .map((n) => ({ rel: `/${rel}/${slugDir}/${n}`, name: n }));
      if (subFiles.length) {
        const best = pickBest(subFiles, slug, typePrefix);
        if (best) return best;
        // fallback: any image file in the slug dir
        return subFiles[0].rel;
      }
    }

    // 3) scan each subdir for files matching slug
    for (const d of subdirs) {
      const subAbs = path.join(abs, d);
      const subFiles = listDirShallow(subAbs)
        .filter((n) => IMG_RE.test(n))
        .map((n) => ({ rel: `/${rel}/${d}/${n}`, name: n }));
      const best = pickBest(subFiles, slug, typePrefix);
      if (best) return best;
    }
  }

  return null;
}
