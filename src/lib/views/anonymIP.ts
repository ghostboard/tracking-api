export default function(ip: String=''): string {
    return `${ip.substring(0, ip.lastIndexOf(".") + 1)}0`;
}