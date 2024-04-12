import {User} from "../types/user";
import {query, transactionQuery} from "../storage/db";
import {IUserService} from "../interfaces/UserService";

export class UserService implements IUserService {
    async getUsersPaginated(offset: number, limit: number): Promise<User[]> {
        return await query<User>('SELECT * FROM users OFFSET $1 LIMIT $2', [offset, limit]);
    }

    async getUsersByName(name: string): Promise<User[]> {
        return await query<User>('SELECT * FROM users WHERE name = $1', [name]);
    }

    async getUsersByMail(mail: string): Promise<User | null> {
        const result = await query<User>('SELECT * FROM users WHERE email = $1', [mail]);
        return result.length ? result[0] : null;
    }

    async updateStatuses(updates: { id: number, status: string }[]): Promise<User[]> {
        /**
         * Due to time constraints, we're using promise.all...
         * To handle scale more effectively, consider using batch processing:
         * Update multiple users in a single query Bulk/ Batch updates to reduce database load.
         * (https://medium.com/@akhouri/bulk-insert-and-update-in-postgresql-e7e3bc863a14)
         * additionally, consider using a transaction to ensure all updates are successful or none are
         * (https://node-postgres.com/features/transactions)
         **/
        const queryText = 'UPDATE users SET status = $1 WHERE id = $2 returning *';
        const promises = updates.map(update => query(queryText, [update.status, update.id]));
        const result = await Promise.all(promises);
        return result.map(res => res[0] as User);
    }

    async setGroupToNull(userId: number): Promise<User | null> {
        const previousGroupQuery = 'SELECT group_id FROM users WHERE id = $1';
        const clearGroupQuery = 'UPDATE users SET group_id = NULL WHERE id = $1 RETURNING *';
        const updateGroupStatusQuery = 'UPDATE groups SET status = \'empty\' WHERE id = $1 AND NOT EXISTS (SELECT id FROM users WHERE group_id = $1)'

        const previousGroupRes = await query<{ group_id: number }>(previousGroupQuery, [userId]);

        const previousGroup = previousGroupRes[0].group_id;

        const result = await transactionQuery([
            {text: clearGroupQuery, values: [userId]},
            {text: updateGroupStatusQuery, values: [previousGroup]}
        ]);

        return result.length ? (result[0] as User) : null;
    }
}