export interface IConfig {
    firebaseAppName: string;
    firebaseStorageBucketName: string;
    firebaseServerKey: any;
    firebaseNotificationUrl: string;
}
// declare var ENV: string;
export class BaseConfig {
    _current: IConfig;
    ENV: string
    get current(): IConfig {
        return this._current;
    };
    constructor() {
        this.ENV = "dev";
        let firebaseAppName = "Spread",
            firebaseStorageBucketName = `gs://${firebaseAppName}.appspot.com`,
            firebaseNotificationUrl = 'https://fcm.googleapis.com/fcm/send',
            serveryKey = "AAAAoLddCpo:APA91bEy10Csa8tmr61CEgiELFASQx0KNLiUA8nce2yss_Ry9AP5NoXnQXhch9sS0gzOeybVcNrjIGusrHxMv6BIsNYw6bAyWZOl_P419VnXN2aEgRikPcsN1nolRci3LQ9b40VceuJS"
        this._current = {
            firebaseAppName: firebaseAppName,
            firebaseStorageBucketName: firebaseStorageBucketName,
            firebaseServerKey: serveryKey,
            firebaseNotificationUrl: firebaseNotificationUrl,
        };
    }
}