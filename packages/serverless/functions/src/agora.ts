import * as functions from "firebase-functions";

export const agoraToken = functions.https.onCall((data, context) => {
  console.log(data);

  console.log("user's id: " + context.auth?.uid);
  const channelName: string = data.channelName;

  let token = getAgoraToken(channelName);

  return { token };
});

import { RtcTokenBuilder, RtcRole } from "agora-access-token";

function getAgoraToken(channelName: string) {
  // Rtc Examples
  const appID = "c8dfd65deb5c4741bd564085627139d0";
  const appCertificate = "aa57b809934b4efcb407cf30089d9f25";
  const uid = 0; // no need to use this as we have authenticated this user
  const role = RtcRole.PUBLISHER;

  const expirationTimeInSeconds = 3600;

  const currentTimestamp = Math.floor(Date.now() / 1000);

  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

  // Build token with uid
  const tokenA = RtcTokenBuilder.buildTokenWithUid(
    appID,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );
  console.log("Token With Integer Number Uid: " + tokenA);

  return tokenA;
}
