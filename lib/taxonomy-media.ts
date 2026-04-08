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
 exhibittypes: "exhibit-types"
};

const TYPE_DIR_CANDIDATES: Record<string, string[]> = {
 services: ["media/generated/services", "media/recovered/services", "media/planned/services", "images/services", "images", "media"],
 locations: ["media/generated/locations", "media/recovered/locations", "media/planned/locations", "images/locations", "images", "media"],
 venues: ["media/generated/venues", "media/recovered/venues", "media/planned/venues", "images/venues", "art/venues", "images", "media"],
 eventtypes: ["media/generated/event-types", "media/recovered/eventTypes", "media/planned/event-types", "images/event-types", "images", "media"],
 boothtypes: ["media/generated/booth-types", "media/recovered/boothTypes", "media/planned/booth-types", "images/booth-types", "images", "media"],
 industries: ["media/generated/industries", "media/recovered/industries", "media/planned/industries", "images/industries", "images", "media"],
 capabilities: ["media/generated/capabilities", "media/recovered/capabilities", "media/planned/capabilities", "images/capabilities", "images", "media"],
 rentals: ["media/generated/rentals", "media/recovered/rentals", "media/planned/rentals", "images/rentals", "images", "media"],
 exhibittypes: ["media/generated/exhibit-types", "media/recovered/exhibit-types", "media/planned/exhibit-types", "images/exhibit-types", "images", "media"]
};

function slugify(value: string) {
 return value
 .toLowerCase()
 .replace(/[^a-z0-9]+/g, "-")
 .replace(/^-+|-+$/g, "");
}

export function getRecoveredTaxonomyMediaUrl(kind: string, slug: string) {
 const normalizedKind = slugify(kind).replace(/-/g, "");
 const typePrefix = TYPE_PREFIX[normalizedKind];
 const directoryCandidates = TYPE_DIR_CANDIDATES[normalizedKind];

 if (!typePrefix || !directoryCandidates?.length) {
 return null;
 }

 for (const relativeDirectory of directoryCandidates) {
 const directory = path.join(process.cwd(), "public", relativeDirectory);
 if (!fs.existsSync(directory)) {
 continue;
 }

 const match = fs
 .readdirSync(directory)
 .find((name) => name.startsWith(`${typePrefix}-${slugify(slug)}-`) && /\.(webp|png|jpg|jpeg|svg)$/i.test(name));

 if (match) {
 return `/${relativeDirectory}/${match}`;
 }
 }

 return null;
}
