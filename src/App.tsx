import React from 'react';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { useAppSelector } from './store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
        <DndProvider backend={HTML5Backend}>
          <TodoList />
        </DndProvider>

        {todos.length > 0 && <TodoFilter />}
      </div>
    </div>
  );
};
