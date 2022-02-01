export default class ConversationData {
  // want all of the contents of a conversation in one place for the frontend
  // need all of the content items in the conversation for the past week
  // can be audio clip or link for now
  //    if user wants more data, click button to fetch further back
  // see if this convo is a priority one
  // all users in the conversation: userId's perhaps, but the actual user we can get from the relevantUsersCache map
}

// one map: all relevant users, a map we build based on where the user visits

// one map: conversation id -> conversationData as above to get everything relevant
// fetch only all convos in last 90 days
// search for any other ones in the search bar

// filter selector to get live convos
// filter selector to get all priority convos
// filter selector to get all later convos
// filter selector to get all done convos

// filter selector to get a map of default "inbox" conversations:
// go through all conversations in the conversation map and place in right category
/**
 * {
 *    "Today": [if latest message was today],
 *    "Last 7 Days": [if convo last message was > day - 7],
 *    "earlier this month": [...not in above two, but still > day - 30],
 *    "mm yyyy": [create these if convo is older than the last threshold]
 * }
 */

//
