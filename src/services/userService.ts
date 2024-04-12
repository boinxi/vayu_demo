import {User} from "../types/user";
import {query} from "../storage/db";

export class UserService {
    async getUsers(): Promise<User[]> {
        return await query('SELECT * FROM users');
    }
}