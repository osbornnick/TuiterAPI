/**
 * @file implements a controller for RESTful web service API for Snippets
 */
import SnippetDao from "../daos/SnippetDao";
import Snippet from "../models/snippets/snippet";
import { Express, Request, Response } from "express";
import SnippetControllerI from "../interfaces/SnippetControllerI";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

/**
 * @class SnippetController implements RESTful API for snippets with the following endpoints:
 * <ul>
 *  <li>GET /api/snippets to retrieve all snippets in database</li>
 *  <li>GET /api/users/:uid/snippets to retrieve all snippets created by a user</li>
 *  <li>POST /api/users/:uid/snippets to create a snippet object for a given user</li>
 *  <li>PUT /api/snippets/:sid to update the code of a snippet object</li>
 *  <li>DELETE /api/snippets/:sid to remove a particular snippet instance</li>
 * </ul>
 * @property {SnippetDao} snippetDao singleton DAO for snippet CRUD operations
 * @property {SnippetController} snippetController singleton controller from snippet
 * web service API
 */
export default class SnippetController implements SnippetControllerI {
    private static snippetDao: SnippetDao = SnippetDao.getInstance();
    private static snippetController: SnippetController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare web service API
     * @returns SnippetController
     */
    public static getInstance = (app: Express): SnippetController => {
        if (SnippetController.snippetController === null) {
            SnippetController.snippetController = new SnippetController();
            app.get("/api/snippets", SnippetController.snippetController.findAllSnippets);
            app.get("/api/users/:uid/snippets", SnippetController.snippetController.findSnippetsByUser);
            app.post("/api/users/:uid/snippets", SnippetController.snippetController.createSnippet);
            app.put("/api/snippets/:sid", SnippetController.snippetController.editSnippet);
            app.delete("/api/snippets/:sid", SnippetController.snippetController.deleteSnippet);

            //test functions
            app.post("/api/users/:uid/snippets/test", SnippetController.snippetController.createSnippetById);
        }
        return SnippetController.snippetController;
    };
    private constructor() {}

    /**
     * Retrieves a list of all snippet objects in the database
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client that includes an array of JSON-formatted
     * snippet objects
     */
    findAllSnippets = (req: Request, res: Response) =>
        SnippetController.snippetDao
            .findAllSnippets()
            .then((snippets: Snippet[]) => res.json(snippets));
    
    /**
     * Retrieves a list of all snippet objects for the active user profile
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client that includes an array of JSON-formatted
     * snippet objects
     */
    findSnippetsByUser = (req: Request, res: Response) => {
        let userId =
            // @ts-ignore
            req.params.uid === "me" && req.session["profile"]
                ? // @ts-ignore
                  req.session["profile"]._id
                : req.params.uid;

        if (userId === "me") {
            res.sendStatus(404);
            return;
        }
        SnippetController.snippetDao
            .findSnippetsByUser(userId)
            .then((snippets: Snippet[]) => res.json(snippets));
    };

    /**
     * Creates a snippet assocaited with the active user
     * @param {Request} req Represents request from client, including the user ID and snippet in the
     * body of the request
     * @param {Response} res Represents response to client that includes the snippet object
     * in JSON format
     */
    createSnippet = (req: Request, res: Response) => {
        let userId =
            // @ts-ignore
            req.params.uid === "me" &&
            // @ts-ignore
            req.session["profile"] &&
            // @ts-ignore
            req.session["profile"]._id
                ? // @ts-ignore
                  req.session["profile"]._id
                : req.params.uid;
        if (userId === "me") {
            res.sendStatus(404);
            return;
        }
        SnippetController.snippetDao
            .createSnippet(userId, req.body)
            .then((snippet: Snippet) => res.json(snippet));
    };

    /**
     * Edits the code of a specified snippet
     * @param {Request} req Represents request from client, including the snippet ID and the updated
     * snippet in the request
     * @param {Response} res Represents response to client that includes the status of the update
     * operation
     */
    editSnippet = (req: Request, res: Response) =>
        SnippetController.snippetDao
            .editSnippet(req.params.sid, req.body)
            .then((status) => res.send(status));
    
    /**
     * deletes a specified snippet
     * @param {Request} req Represents request from client, including the snippet ID
     * @param {Response} res Represents response to client that includes the status of the
     * delete operation
     */
    deleteSnippet = (req: Request, res: Response) =>
        SnippetController.snippetDao
            .deleteSnippet(req.params.sid)
            .then((status) => res.send(status));

    /**
     * Test function to bypass the need to login to create snippet. For admin/testing purpsoes only
     * @param {Request} req includes ID of the user and the snippet in the request body
     * @param {Response} res the snippet in JSON format
     */
    createSnippetById = (req: Request, res: Response) => {
        SnippetController.snippetDao
            .createSnippet(req.params.uid, req.body)
            .then((snippet: Snippet) => res.json(snippet));
    }
}