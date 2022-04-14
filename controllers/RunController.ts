import { Request, Response, Express } from "express";
import axios from "axios";

export default class RunController {
    private static runController: RunController | null = null;
    private url: string = "";
    private key: string = "";
    public valid: boolean;

    public static getInstance = (app: Express): RunController => {
        if (RunController.runController === null) {
            RunController.runController = new RunController();
            if (RunController.runController.valid)
                app.post("/api/run", RunController.runController.runSnippet);
        }
        return RunController.runController;
    };

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
