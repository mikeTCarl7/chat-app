export interface Me {
  userName: string;
  loginTime: number;
}

export interface MessageData {
  name: string;
  message: string;
  id: string;
}

export interface Room {
  name: string;
  id: number;
  users?: string[];
}

export interface RoomDetails extends Room {
  users: string[];
}

export interface PostedMessage extends MessageData {
  id: string;
}
