export interface RoomInterface {
  names: string;
  room: string;
}

export interface MessageInterface extends RoomInterface {
  time: string;
  message: string;
}
