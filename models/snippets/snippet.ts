import User from "../users/User"
import Tuit from "../tuits/Tuit"

export default interface Snippet {
    code: string,
    author: User,
    created: Date,
    tuit?: Tuit
    //want parent information for forking?
    //parentSnippet?: Tuit,
    //parentAuthor?: User
}