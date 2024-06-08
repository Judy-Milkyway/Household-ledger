// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Data } from "@/db";
import auth from "@/middleware/auth";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  auth(req, res, async () => {
    try {
      const user =  req.user
      const data = await Data.findAll({
        where:{
          userid:user.username
        }
      });
      res.status(200).json({ message: "Data search successfully", data });
    } catch (error) {
      res
        .status(200)
        .json({ error: "Failed to insert data", details: error.message ,data:[]});
    }
  });
}
