import { environment } from "src/environments/environment";

const base_url = environment.games_service_base_url;

export class UrlConfig {

    public static getGamesUrl:string = base_url + "/games";
    public static getGameUrl:string = base_url + "/games/";

    public static loginUrl:string = base_url + "/users/login";
    public static addUserUrl:string = base_url + "/users";
    
}



