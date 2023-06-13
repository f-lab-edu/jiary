import { AxiosResponse } from 'axios';
import instance from './index.ts';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const fetchTodo = async (): Promise<AxiosResponse<Todo>> =>
  await instance.get('todos/1');
