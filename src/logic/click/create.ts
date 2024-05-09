import createService from '../../services/click/create';

export default async function create(
  blogId: string,
  origin: string,
  target: string,
  title: string,
  text: string,
  image: string,
  useragent: string,
  ip: string
): Promise<any> {
  return createService(
    blogId,
    origin,
    target,
    title,
    text,
    image,
    useragent,
    ip
  );
}
