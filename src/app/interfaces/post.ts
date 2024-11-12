import { ICategory } from './category';
import { IUser } from './user';

export interface IPost {
  id: number;
  title: string;
  content: string;
  date?: Date;
  user: IUser;
  category: ICategory;
}
