import Snippet from "../models/snippets/snippet"
import Tuit from "../models/tuits/Tuit"

export default interface SnippetDaoI {
    findAllSnippets (): Promise<Snippet[]>;
    findSnippetsByUser (uid: string): Promise<Snippet[]>;
    createSnippet (uid: string, code: Snippet): Promise<Snippet>;
    editSnippet (sid: string, code: Snippet): Promise<any>;
    deleteSnippet (sid: string): Promise<any>;
    //shareSnippet (uid: string, sid: string): Promise<Tuit>;
}