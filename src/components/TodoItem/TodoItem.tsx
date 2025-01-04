import { useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';
import './TodoItem.scss';
import { todosSlice } from '../../store/features/todos';
import classNames from 'classnames';
import { useCallback, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemType = 'TODO';

type Props = {
  todo: Todo;
  index: number;
  moveTodo: (dragIndex: number, hoverIndex: number) => void;
};

export const TodoItem = ({ todo, index, moveTodo }: Props) => {
  const dispatch = useDispatch();

  const deleteTodo = useCallback(() => {
    dispatch(todosSlice.actions.deleteTodo({ id: todo.id }));
  }, [dispatch, todo.id]);

  const toggleCompeted = useCallback(() => {
    dispatch(todosSlice.actions.toggleCompleted({ id: todo.id }));
  }, [dispatch, todo.id]);

  const ref = useRef<HTMLFormElement>(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveTodo(item.index, index);
        item.index = index;
      }
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  drag(drop(ref));

  return (
    <form
      ref={ref}
      className={classNames('todo', { completed: todo.completed, 'todo--dragging': isDragging })}>
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

      <button type="button" className="todo__remove" onClick={deleteTodo}>
        ×
      </button>
    </form>
  );
};
