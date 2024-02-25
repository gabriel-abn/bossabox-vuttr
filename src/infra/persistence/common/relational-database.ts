export interface IRelationalDatabase {
  query(query: string, values?: any[]): Promise<any[]>;
  execute(query: string, values?: any[]): Promise<boolean>;
}
