import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/auth";
import { Session } from "next-auth";

export async function backSession(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) : Promise<Session | null> {
  if (!authOptions) {
    throw new Error("Auth options could not be determined. Ensure `authOptions` is exported correctly.");
  }

  return getServerSession(...args, authOptions);
}
