import firebaseAdmin from "firebase-admin/app";

import serviceAccount from "../nirvana-for-business-firebase-adminsdk";

const adminApp = firebaseAdmin.initializeApp({
  credential: credential.cert({
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    projectId: serviceAccount.project_id,
  }),
});

console.log("initialized firebase admin");

export { adminApp };
