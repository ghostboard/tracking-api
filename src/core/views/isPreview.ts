export default function (slug: string): boolean {
  return !!(slug && slug.startsWith('/p/'));
}
