import {Request, Response} from "express";

export default interface SnippetControllerI {
    findAllSnippets (req: Request, res: Response): void;
    findSnippetsByUser (req: Request, res: Response): void;
    createSnippet (req: Request, res: Response): void;
    editSnippet (req: Request, res: Response): void;
    deleteSnippet (req: Request, res: Response): void;
    shareSnippet (req: Request, res: Response): void;
}