import { database } from "../../../store/firestore";
import { collection, addDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { Experiment } from "../../../store/participant";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        try {
            const experimentData: Experiment = req.body;
            const { id } = await database
                .collection("experimentData")
                .add(experimentData);
            res.status(200).json({ id });
        } catch (e: any) {
            res.status(400).end();
        }
    }
};
