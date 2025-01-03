import React from 'react';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { useAppSelector } from './store';

export const App: React.FC = () => {
  const todos = useAppSelector((state) => state.todos);

  return (
    <div className="todoapp">
      <img
        src={`${process.env.PUBLIC_URL}/images/imageHeader.png`}
        className="todoapp__header-image"
      />

      <div className="todoapp__content">
        <Header />
        <TodoList />

        {todos.length > 0 && <TodoFilter />}
      </div>
    </div>
  );
};
