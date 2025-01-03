import './Header.scss';

export const Header = () => {
  return (
    <header className="todoapp__header">
      <h1 className="title">TODO</h1>
      <form className="new-todo">
        <div className="new-todo__checkbox">
          <label className="checkbox">
            <input type="checkbox" checked={false} className="checkbox__input" />
            <span className="checkbox__inner"></span>
          </label>
        </div>
        <input
          type="text"
          data-testid="new-todo__input"
          className="new-todo__input"
          placeholder="Create a new todo..."
        />
      </form>
    </header>
  );
};
