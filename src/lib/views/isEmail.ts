import CONFIG from '../../config/views'

export default function(referer: String=''): boolean {
    if (!referer) {
        return false;
    }
    let isEmail = false;
    CONFIG.referer.email.forEach((item:string) => {
        const includesIt = referer.includes(item);
        if (includesIt) {
            isEmail = true;
        }
    });
    return isEmail;
}