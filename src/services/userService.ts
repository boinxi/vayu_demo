import {User} from "../types/user";
import {query} from "../storage/db";

export class UserService {
    async getUsers(): Promise<User[]> {
        return await query<User>('SELECT * FROM users');
    }

    async getUsersPaginated(offset: number, limit: number): Promise<User[]> {
        return await query<User>('SELECT * FROM users OFFSET $1 LIMIT $2', [offset, limit]);
    }

    async getUsersByName(name: string): Promise<User[]> {
        return await query<User>('SELECT * FROM users WHERE name = $1', [name]);
    }

}