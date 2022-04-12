import User from "../users/User";

export default interface Snippet {
    code: string;
    author: User;
    created: Date;
    forkedFrom?: Snippet;
}
