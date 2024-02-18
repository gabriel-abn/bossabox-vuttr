export interface IUserRepository {
  save(user: { email: string; password: string }): Promise<{ id: number }>;
  get(
    filter: Partial<{ email: string; id: string }>,
  ): Promise<{ email: string; password: string }>;
}
