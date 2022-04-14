/**
 * @file Controller RESTful Web service API for running snippets
 */
import { Request, Response, Express } from "express";
import axios from "axios";

/**
 * @class RunController implements RESTful Web service API for running code snippets.
 * Defines the following HTTP endpoints:
 * <ul>
 *  <li>
 *      POST /api/run to run a code snippet defined in the body of the request
 *  </li>
 * </ul>
 * @property {RunController} runController Singleton controller implementation
 * @property {boolean} valid Indicates whether the enpoints defined in this controller are registered
 */
export default class RunController {
    private static runController: RunController | null = null;
    private url: string = "";
    private key: string = "";
    public valid: boolean;

    /**
     * Creates a singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service API
     * @returns {RunController} RunController singleton
     */
    public static getInstance = (app: Express): RunController => {
        if (RunController.runController === null) {
            RunController.runController = new RunController();
            if (RunController.runController.valid)
                app.post("/api/run", RunController.runController.runSnippet);
        }
        return RunController.runController;
    };

    /**
     * Private constructor. Checks for necessary environment variables, sets valid state
     * @returns RunController with env variables registered
     */
    private constructor() {
        if (
            typeof process.env.JUDGE0_URL === "undefined" ||
            typeof process.env.JUDGE0_KEY === "undefined"
        ) {
            console.log(
                "missing judge0 api information, not registering run controller"
            );
            this.valid = false;
            return;
        }
        this.valid = true;
        this.url = process.env.JUDGE0_URL;
        this.key = process.env.JUDGE0_KEY;
    }

    /**
     * Submit a code snippet, and retrieve its result.
     * @param {Request} req Represents request from client, including the source_code and language_id in the body
     * @param {Response} res Represents response to client, including the body formatted as JSON arrays containing output information
     */
    runSnippet = async (req: Request, res: Response) => {
        let token;
        await axios
            .post(`${this.url}/submissions`, req.body, {
                headers: { "X-RapidAPI-Key": this.key },
            })
            .then((response) => {
                token = response.data.token;
            })
            .catch((err) => res.send(err));

        axios
            .get(`${this.url}/submissions/${token}`, {
                headers: {
                    "X-RapidAPI-Key": this.key,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => res.send(response.data))
            .catch((err) => res.send(err));
    };
}
