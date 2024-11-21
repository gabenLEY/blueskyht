import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get the session
  const session = await getSession({ req });

  // If no session exists, redirect to the homepage
  if (!session) {
    return res.redirect(302, "/");  // 302 is the HTTP status code for redirect
  }

  // If the session exists, continue with your logic (you can send a success response)
  res.status(200).json({ message: "Session exists", session });
}