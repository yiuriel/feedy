/**
 * Converts a string to a URL-friendly slug
 * @param str The string to convert to a slug
 * @returns A URL-friendly slug
 */
export function generateSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove all non-word chars
    .replace(/[\s_-]+/g, '-') // Replace spaces and _ with -
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing -
}

/**
 * Generates a unique slug for an organization
 * @param baseSlug The initial slug to start with
 * @param isSlugTaken Function that checks if a slug is already taken
 * @returns A unique slug
 */
export async function generateUniqueSlug(
  baseSlug: string,
  isSlugTaken: (slug: string) => Promise<boolean>,
): Promise<string> {
  let slug = generateSlug(baseSlug);
  let counter = 1;

  while (await isSlugTaken(slug)) {
    if (counter > 20) {
      throw new Error('Unable to generate a unique slug after 20 attempts');
    }

    slug = `${generateSlug(baseSlug)}-${counter}`;
    counter++;
  }

  return slug;
}
