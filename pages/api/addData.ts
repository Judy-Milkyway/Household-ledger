// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Data } from "@/db";
import auth from "@/middleware/auth";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  auth(req, res, async () => {
    const { key, role, moneytype, type, date, money } = req.body;
    const userid = req.user.username
    console.log(req.user)

    if (!key || !role || !moneytype || !type || !date || !money) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const newData = await Data.create({
        key,
        role,
        moneytype,
        type,
        date,
        money,
        userid,
      });
      res.status(201).json(newData);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to create data", details: error.message });
    }
  });
}
