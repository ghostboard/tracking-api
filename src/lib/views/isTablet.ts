export default function(useragent: String=''): boolean {
    const match = useragent.match(/(tablet|ipad|playbook|silk)|(android(?!.*mobile))/i);
    return !!(match && match.length >= 1);
}