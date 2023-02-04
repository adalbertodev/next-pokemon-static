import { User } from "./User";

export interface UserRepository {
	searchAll: () => Promise<User[]>;
}
