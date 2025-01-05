import { useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';
import './TodoItem.scss';
import { todosSlice } from '../../store/features/todos';
import classNames from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { SHAKING_DELAY, TOUCH_DRUGGING_DELAY } from '../../constants';

const ItemType = 'TODO';

type Props = {
  todo: Todo;
  index: number;
  moveTodo: (dragIndex: number, hoverIndex: number) => void;
};

export const TodoItem = ({ todo, index, moveTodo }: Props) => {
  const dispatch = useDispatch();
  const [isLongPress, setIsLongPress] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const ref = useRef<HTMLFormElement>(null);

  const deleteTodo = useCallback(() => {
    dispatch(todosSlice.actions.deleteTodo({ id: todo.id }));
  }, [dispatch, todo.id]);

  const handlePressStart = useCallback(() => {
    pressTimer.current = setTimeout(() => {
      setIsLongPress(true);
      setIsShaking(true);
    }, TOUCH_DRUGGING_DELAY);
  }, []);

  const handlePressEnd = useCallback(() => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
    }
    setIsLongPress(false);
  }, []);

  useEffect(() => {
    if (isShaking) {
      const timer = setTimeout(() => {
        setIsShaking(false);
      }, SHAKING_DELAY);

      return () => clearTimeout(timer);
    }
  }, [isShaking]);

  useEffect(() => {
    return () => {
      if (pressTimer.current) {
        clearTimeout(pressTimer.current);
      }
    };
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveTodo(item.index, index);
        item.index = index;
      }
    },
    drop: () => {
      setIsShaking(true);
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

  const toggleCompeted = useCallback(
    (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (isDragging) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      dispatch(todosSlice.actions.toggleCompleted({ id: todo.id }));
    },
    [dispatch, todo.id, isDragging]
  );

  return (
    <form
      ref={ref}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      className={classNames('todo', {
        completed: todo.completed,
        'todo--dragging': isDragging || isLongPress,
        'todo--shaking': isShaking
      })}>
      <div className="todo__checkbox" onClick={toggleCompeted} onTouchEnd={toggleCompeted}>
        <label className="checkbox">
          <input type="checkbox" checked={todo.completed} className="checkbox__input" readOnly />
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
