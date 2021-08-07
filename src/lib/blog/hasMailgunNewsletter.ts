export default function(generator: String=''): boolean {
    let rawVersion = generator.replace("Ghost ", "").replace(".", "");
    if (rawVersion.length === 2) {
        rawVersion += '0';
    }
    const hasContentAPI = parseFloat(rawVersion) >= 310;
    return hasContentAPI;
}