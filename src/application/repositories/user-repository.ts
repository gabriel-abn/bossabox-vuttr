export interface IUserRepository {
  save(user: { email: string; password: string }): Promise<{ id: number }>;
  get(email?: string): Promise<{ id: string; email: string; password: string }>;
}
