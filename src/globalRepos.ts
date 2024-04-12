import {UserService} from "./services/userService";
import {IUserService} from "./interfaces/UserService";

const UsersRepo: IUserService = new UserService();

export {UsersRepo};