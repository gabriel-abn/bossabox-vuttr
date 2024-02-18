import { IUserRepository } from "@application/repositories";

class UserRepository implements IUserRepository {
  users: { id: string; email: string; password: string }[];

  constructor() {
    this.users = [];
  }

  async save(user: {
    email: string;
    password: string;
  }): Promise<{ id: number }> {
    this.users.push({ id: String(this.users.length + 1), ...user });

    return { id: this.users.length };
  }

  async get(
    filter: Partial<{ email: string; id: string }>,
  ): Promise<{ email: string; password: string }> {
    const user = this.users.find((user) => {
      if (filter.email) {
        return user.email === filter.email;
      }

      if (filter.id) {
        return user.id === filter.id;
      }

      return false;
    });

    return user;
  }
}

export default new UserRepository();
