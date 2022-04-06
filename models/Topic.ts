import Tuit from "./Tuit";

export default class Topic {
    private topic: string = "";
}

export class Tuit2Topic {
    private tuit: Tuit | null = null;
    private topic: Topic | null = null;
}
