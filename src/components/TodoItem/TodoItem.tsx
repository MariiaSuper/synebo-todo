import { Todo } from '../../types/Todo';
import './TodoItem.scss';

type Props = {
  todo: Todo;
};

export const TodoItem = ({ todo }: Props) => {
  return (
    <form className="todo">
      <div className="todo__checkbox">
        <label className="checkbox">
          <input type="checkbox" checked={false} className="checkbox__input" />
          <span className="checkbox__inner"></span>
        </label>
      </div>
      <input type="text" readOnly className="todo__input" value={todo.title} />
    </form>
  );
};
