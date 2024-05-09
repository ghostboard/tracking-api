export default function (slug: String): boolean {
  return slug && slug.startsWith('/p/');
}
