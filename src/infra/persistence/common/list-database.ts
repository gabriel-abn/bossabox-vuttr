export interface IListDatabase {
  getList(list: string): Promise<string[]>;
  addToList(list: string, ...item: string[]): Promise<void>;
  removeFromList(list: string, item: string): Promise<void>;
  exists(list: string, item: string): Promise<boolean>;
  clearList(list: string): Promise<void>;
}
