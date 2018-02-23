import * as ApplicationSettings from "application-settings";

export class CacheManager {

    public static get(key: string): any {
        return ApplicationSettings.getString(key);
    }
    public static set(key, value) {
        ApplicationSettings.setString(key, value);
    }
    public static remove(key) {
        ApplicationSettings.remove(key);
    }
    public static clear() {
        ApplicationSettings.clear();
    }
}