import classNames from 'classnames';
import { useAppSelector } from '../../store';
import './TodoFilter.scss';
import { useDispatch } from 'react-redux';
import { filterSlice } from '../../store/features/filter';
import { todosSlice } from '../../store/features/todos';

export const TodoFilter = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector((state) => state.todos);
  const activeTodos = todos.filter((todo) => !todo.completed);
  const { status } = useAppSelector((state) => state.filter);
  const completedTodos = todos.filter((todo) => todo.completed);

  const clickAll = () => {
    dispatch(filterSlice.actions.setStatus('all'));
  };

  const clickActive = () => {
    dispatch(filterSlice.actions.setStatus('active'));
  };

  const clickCompleted = () => {
    dispatch(filterSlice.actions.setStatus('completed'));
  };

  const clearCompleted = () => {
    completedTodos.forEach((todo) => {
      dispatch(todosSlice.actions.deleteTodo({ id: todo.id }));
    });
  };

  return (
    <div className="todo__filter">
      <div className="filter__active">{activeTodos.length} items left</div>
      <div className="filter__buttons">
        <span
          className={classNames('filter__button', { active: status === 'all' })}
          onClick={clickAll}>
          All
        </span>
        <span
          className={classNames('filter__button', { active: status === 'active' })}
          onClick={clickActive}>
          Active
        </span>
        <span
          className={classNames('filter__button', { active: status === 'completed' })}
          onClick={clickCompleted}>
          Completed
        </span>
      </div>
      <div className="filter__button filter__clear-all">
        <span onClick={clearCompleted}>Clear Completed</span>
      </div>
    </div>
  );
};
