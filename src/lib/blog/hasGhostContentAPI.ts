export default function(generator: String=''): boolean {
    const isGhost = generator.includes('Ghost ');
    if (!isGhost) {
        // Gatsby or another headless UI use Content API
        return true;
    }
    let rawVersion = generator.replace("Ghost ", "").replace(".", "");
    if (rawVersion.length === 2) {
        rawVersion += '0';
    }
    const hasContentAPI = parseFloat(rawVersion) >= 210;
    return hasContentAPI;
}