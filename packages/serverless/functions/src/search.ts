import * as functions from "firebase-functions";
const config = functions.config().env;

import algoliasearch from "algoliasearch";

const client = algoliasearch(config.ALGOLIA_APP_ID, config.ALGOLIA_API_KEY);

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
    return usersIndex.saveObject({ objectId, ...document });
  });
