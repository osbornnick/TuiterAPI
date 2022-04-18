import User from "../users/User";

export default interface Snippet {
    code: string;
    title: string;
    author: User;
    created: Date;
    forkedFrom?: Snippet;
}
