import Snippet from "../models/snippets/snippet";

export default interface SnippetDaoI {
    findAllSnippets(): Promise<Snippet[]>;
    findSnippetsByUser(uid: string): Promise<Snippet[]>;
    createSnippet(uid: string, code: Snippet): Promise<Snippet>;
    editSnippet(sid: string, code: Snippet): Promise<any>;
    deleteSnippet(sid: string): Promise<any>;
    findSnippet(sid: string): Promise<any>;
}
