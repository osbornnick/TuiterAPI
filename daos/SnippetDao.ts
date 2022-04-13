/**
 * @file implements a DAO to manage the data operations of Snippet objects
 */
import SnippetModel from "../mongoose/snippets/SnippetModel";
import Snippet from "../models/snippets/snippet";
import SnippetDaoI from "../interfaces/SnippetDaoI";

/**
 * @class SnippetDao implements a DAO to manage the storage and access of Snippets
 * @property {SnippetDao} snippetDao private single instance of SnippetDao
 */

export default class SnippetDao implements SnippetDaoI {
    private static snippetDao: SnippetDao | null = null;
    public static getInstance = (): SnippetDao => {
        if(SnippetDao.snippetDao === null) {
            SnippetDao.snippetDao = new SnippetDao();
        }
        return SnippetDao.snippetDao;
    }
    private constructor() {}
    /**
     * retrieves a list of all snippet objects in the database
     * @returns an array of snippets
     */
    findAllSnippets = async (): Promise<Snippet[]> =>
        SnippetModel.find()
            .populate("author")
            .exec();
    /**
     * retrieves a list of snippets created by a specific user
     * @param uid the object ID of the user
     * @returns an array of snippets
     */
    findSnippetsByUser = async (uid: string): Promise<Snippet[]> =>
        SnippetModel.find({author: uid})
            .populate("author")
            .exec();
    /**
     * creates a snippet object with a given user as author
     * @param uid the object id of the snippet author
     * @param code the snippet code in the request body
     * @returns a snippet object
     */
    createSnippet = async (uid: string, code: Snippet): Promise<Snippet> =>
        SnippetModel.create({...code, author: uid});
    /**
     * updates the code of a snippet
     * @param sid the object ID of the snippet to be updated
     * @param code the updated snippet code
     * @returns the updated snippet
     */
    editSnippet = async (sid: string, code: Snippet): Promise<any> =>
        SnippetModel.updateOne(
            {_id: sid},
            {$set: code});
    /**
     * deletes a specific snippet from the database
     * @param sid the object ID of the snippet to be deleted
     * @returns a status on the success of the deletion operation
     */
    deleteSnippet = async (sid: string): Promise<any> =>
        SnippetModel.deleteOne({_id: sid});
}