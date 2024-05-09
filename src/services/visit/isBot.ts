import { isbot } from 'isbot';

export default function (useragent: string): boolean {
  return isbot(useragent);
}
