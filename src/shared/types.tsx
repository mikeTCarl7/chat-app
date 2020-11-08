export interface Room {
    name: string;
    id: number;
    users?: string[];
 }

 export interface Message {
    name: string;
    message: string;
    reaction?: any;
}
 
 export interface PostedMessage extends Message {
    id: string;
}
