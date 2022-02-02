import algoliaSearch, { SearchClient } from "algoliasearch";

var searchClient: SearchClient = null;

if (
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID &&
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
) {
  searchClient = algoliaSearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
  );

  console.log("set up algolia search successfully");
} else {
  console.error("unable to set up aloglia");
}

export const usersIndex = searchClient.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_USERS_INDEX_NAME || ""
);

export default searchClient;
