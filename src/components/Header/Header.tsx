import { useState } from 'react';
import './Header.scss';
import { useDispatch } from 'react-redux';
import { todosSlice } from '../../store/features/todos';

export const Header = () => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleAddTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const todo = {
      id: +Math.random().toFixed(3).slice(2),
      title: title.trim(),
      completed: false
    };

    dispatch(todosSlice.actions.addTodo(todo));

    setTitle('');
  };

  return (
    <header className="todoapp__header">
      <h1 className="title">TODO</h1>
      <form onSubmit={onSubmit} className="new-todo">
        <div className="new-todo__checkbox">
          <label className="checkbox">
            <input type="checkbox" checked={false} readOnly className="checkbox__input" />
            <span className="checkbox__inner"></span>
          </label>
        </div>
        <input
          type="text"
          data-testid="new-todo__input"
          className="new-todo__input"
          placeholder="Create a new todo..."
          value={title}
          onChange={handleAddTitle}
        />
      </form>
    </header>
  );
};
