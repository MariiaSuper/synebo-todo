import { useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';
import './TodoItem.scss';
import { todosSlice } from '../../store/features/todos';
import classNames from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoItem = ({ todo }: Props) => {
  const dispatch = useDispatch();

  const deleteOneTodo = () => {
    dispatch(todosSlice.actions.deleteTodo({ id: todo.id }));
  };

  const toggleCompeted = () => {
    dispatch(todosSlice.actions.toggleCompleted({ id: todo.id }));
  };

  return (
    <form className={classNames('todo', { completed: todo.completed })}>
      <div className="todo__checkbox">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={todo.completed}
            className="checkbox__input"
            onChange={toggleCompeted}
          />
          <span className="checkbox__inner"></span>
        </label>
      </div>
      <input type="text" readOnly className="todo__input" value={todo.title} />

      <button type="button" className="todo__remove" onClick={deleteOneTodo}>
        ×
      </button>
    </form>
  );
};
