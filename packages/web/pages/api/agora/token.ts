import { NextApiRequest, NextApiResponse } from "next";
// import { adminApp } from "../../../services/firebaseAdminService";
import { getAuth } from "firebase/auth";
import firebaseAdminAll, { credential } from "firebase-admin";

// todo do this here instead of cloud functions or just leave as is
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.cookies);
  console.log(req.body);

  if (!req.cookies.auth) {
    res.status(401).send({ reason: "not authorized" });
    return;
  }

  // if (!verifiedToken) {
  //   res.status(401).send({ reason: "auth token not valid" });
  //   return;
  // }

  res.status(200).json({ name: "John Doe" });
}
