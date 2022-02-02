import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const config = functions.config().env.algolia;

import algoliasearch from "algoliasearch";

const client = algoliasearch(config.ALGOLIA_APP_ID, config.ALGOLIA_API_KEY);

// setting up indices
const USERS_INDEX_NAME: string = config.ALGOLIA_USERS_INDEX_NAME;
const usersIndex = client.initIndex(USERS_INDEX_NAME);

export const manageUserIndex = functions.firestore
  .document("/users/{userId}")
  .onWrite((change, context) => {
    // Get an object with the current document value.
    // If the document does not exist, it has been deleted.
    const objectId = change.before.id;
    const document = change.after.exists ? change.after.data() : null;

    // delete the index if the user is deleted
    if (!document) {
      return usersIndex.deleteObject(objectId);
    }

    // otherwise, just update the index with new user information
    return usersIndex.saveObject({ objectID: objectId, ...document });
  });

// TODO: protect this endpoint to avoid infiltratros if they know the endpoint name
export const updateUsersIndexWithAllUsers = functions.https.onRequest(
  async (request, response) => {
    const snapshot = await admin.firestore().collection("users").get();

    var users: {}[] = [];

    snapshot.forEach((doc) => {
      const currUser = doc.data();
      users.push({ objectID: doc.id, ...currUser });
    });

    await usersIndex.saveObjects(users);

    response.send("Completed index all users!");
  }
);
