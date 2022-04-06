import Tuit from "./Tuit";

export default class Tag {
    private tag: string = "";
}

export class Tuit2Tag {
    private tag: Tag | null = null;
    private tuit: Tuit | null = null;
}
