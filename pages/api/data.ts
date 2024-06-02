// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Data } from "@/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await Data.findAll();
    res.status(200).json({ message: "Data search successfully", data });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to insert data", details: error.message });
  }
}
