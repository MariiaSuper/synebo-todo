import { useDispatch } from 'react-redux';
import { useDragLayer } from 'react-dnd';
import { useAppSelector } from '../../store';
import { TodoItem } from '../TodoItem/TodoItem';
import { todosSlice } from '../../store/features/todos';
import classNames from 'classnames';

export const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector((state) => state.todos);
  const status = useAppSelector((state) => state.filter.status);

  let filterTodos = todos;

  switch (status) {
    case 'active':
      filterTodos = filterTodos.filter((todo) => !todo.completed);
      break;
    case 'completed':
      filterTodos = filterTodos.filter((todo) => todo.completed);
      break;
    default:
      break;
  }

  const moveTodo = (dragIndex: number, hoverIndex: number) => {
    const updatedTodos = [...todos];
    const [movedItem] = updatedTodos.splice(dragIndex, 1);
    updatedTodos.splice(hoverIndex, 0, movedItem);
    dispatch(todosSlice.actions.setTodos(updatedTodos));
  };

  const { isDragging } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging()
  }));

  return (
    <div className={classNames('todo__list', { dragging: isDragging })}>
      {filterTodos.map((todo, index) => (
        <TodoItem key={todo.id} index={index} todo={todo} moveTodo={moveTodo} />
      ))}
    </div>
  );
};
