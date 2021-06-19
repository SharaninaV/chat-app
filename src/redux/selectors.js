export const getOperatorID = (state) => state.auth.email
export const getFetchedDialogs = (state) => state.fetchDialogs.fetchedDialogs
export const isSearchingMessages = (state) => state.searchInMessages.searchMessagesNeeded
export const foundMessages = (state) => state.searchInMessages.messagesFound
export const isSearchingInUsers = (state) => state.searchInUsers.isUserSearching
export const usersFound = (state) => state.searchInUsers.usersFound
