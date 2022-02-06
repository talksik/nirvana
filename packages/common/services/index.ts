import CloudStorageService from "./cloudStorageService";
import ConversationService from "./conversationService";
import UserService from "./userService";

export const conversationService = new ConversationService();

export const userService = new UserService();

export const cloudStorageService = new CloudStorageService();
