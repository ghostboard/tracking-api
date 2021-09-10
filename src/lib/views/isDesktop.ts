const regex = /Mobile|Tablet|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune|Playbook/i

export default function(useragent: string=''): boolean {    
    const isMobileOrTablet = regex.test(useragent)
    return !isMobileOrTablet
}