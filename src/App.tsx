import React from 'react';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { useAppSelector } from './store';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import { DndProvider, TouchTransition, MouseTransition } from 'react-dnd-multi-backend';
import { Footer } from './components/Footer/Footer';
import { TOUCH_DRUGGING_DELAY } from './constants';

export const HTML5toTouch = {
  backends: [
    {
      id: 'html5',
      backend: HTML5Backend,
      transition: MouseTransition
    },
    {
      id: 'touch',
      backend: TouchBackend,
      options: { enableMouseEvents: true, delayTouchStart: TOUCH_DRUGGING_DELAY },
      preview: true,
      transition: TouchTransition
    }
  ]
};

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
        <DndProvider options={HTML5toTouch}>
          <TodoList />
        </DndProvider>

        {todos.length > 0 && <TodoFilter />}
        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
