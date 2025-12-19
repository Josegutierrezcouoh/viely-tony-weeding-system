import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    const currentVersion = `1.4.1`;

    return res.status(200).json(currentVersion);
}