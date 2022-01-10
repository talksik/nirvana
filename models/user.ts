export class User {
    id: string;
    nickname: string;

}

export enum UserStatus {
    online = "online",
    offline = "offline",
    inCall = "in call",
    busy = "busy" 
}
