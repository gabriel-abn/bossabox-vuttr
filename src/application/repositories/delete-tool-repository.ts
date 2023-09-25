export interface DeleteToolRepository {
  delete(id: string): Promise<boolean>;
}
