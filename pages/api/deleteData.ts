// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Data } from "@/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { key } = req.body;

  if (!key) {
    return res.status(400).json({ error: "Missing required field: key" });
  }

  try {
    const result = await Data.destroy({ where: { key } });
    if (result === 0) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete data", details: error.message });
  }
}
