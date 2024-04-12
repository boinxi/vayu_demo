import {User} from "../types/user";

export interface IUserService {
    getUsersPaginated(offset: number, limit: number): Promise<User[]>;
    getUsersByName(name: string): Promise<User[]>;
    getUsersByMail(mail: string): Promise<User | null>;
    updateStatuses(updates: { id: number, status: string }[]): Promise<User[]>;
    setGroupToNull(userId: number): Promise<User | null>;
}