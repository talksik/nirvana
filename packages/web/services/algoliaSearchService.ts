import algoliaSearch, { SearchClient } from "algoliasearch";

const searchClient: SearchClient = algoliaSearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

console.log("set up algolia search successfully");

export const usersIndex = searchClient.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_USERS_INDEX_NAME || ""
);

export default searchClient;
