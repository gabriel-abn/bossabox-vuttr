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
    email?: string,
  ): Promise<{ id: string; email: string; password: string }> {
    const user = this.users.find((user) => {
      if (email) {
        return user.email === email;
      }

      return false;
    });

    return user;
  }
}

export default new UserRepository();
