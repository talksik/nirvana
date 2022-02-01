import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello no!", { structuredData: true });
  response.send("Hello from woahhhhhh!");
});

import { agoraToken } from "./agora";
exports.agoraToken = agoraToken;

import { inviteUserToTeam } from "./notifications";
exports.inviteUserToTeam = inviteUserToTeam;

import { manageUserIndex } from "./search";
exports.manageUserIndex = manageUserIndex;
