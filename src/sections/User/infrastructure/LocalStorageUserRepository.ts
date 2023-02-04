import { User, UserRepository } from "../domain";

export class LocalStorageUserRepository implements UserRepository {
	searchAll = (): Promise<User[]> => {
		return Promise.all([]);
	};
}
