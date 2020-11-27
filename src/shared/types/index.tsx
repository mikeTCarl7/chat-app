export interface Me {
  userName: string;
  loginTime: number;
}

export interface Message {
  name: string;
  message: string;
}

export interface Room {
  name: string;
  id: number;
  users?: string[];
}

export interface RoomDetails extends Room {
  users: string[];
}

export interface PostedMessage extends Message {
  id: string;
}
