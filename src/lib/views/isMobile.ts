export default function (useragent: String = ''): boolean {
  const match = useragent.match(
    /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i
  );
  return !!(match && match.length >= 1);
}
