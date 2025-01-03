import { useAppSelector } from '../../store';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = () => {
  const todos = useAppSelector((state) => state.todos);
  const status = useAppSelector((state) => state.filter.status);

  let filterTodos = [...todos];

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
  return (
    <div className="todo__list">
      {filterTodos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </div>
  );
};
