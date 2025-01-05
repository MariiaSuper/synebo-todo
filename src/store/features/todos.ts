import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (_, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);

      return state;
    },
    deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
    deleteTodos: (state, action: PayloadAction<string[]>) => {
      return state.filter((item) => !action.payload.includes(item.id));
    },
    toggleCompleted: (state, action: PayloadAction<{ id: string }>) => {
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, completed: !item.completed };
        }

        return item;
      });
    }
  }
});
