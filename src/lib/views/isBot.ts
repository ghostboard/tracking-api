import isbot from "isbot";
import views from "../../config/views"

isbot.extend(views.bot.extendWith);

export default function(useragent: String): boolean {
    return isbot(useragent);
}