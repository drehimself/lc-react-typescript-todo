import React from 'react';
import { Todo } from '../Interfaces';

interface Props {
  todos: Todo[];
  completeTodo: (id: number) => void;
  markAsEditing: (id: number) => void;
  updateTodo: (
    event:
      | React.FocusEvent<HTMLInputElement, Element>
      | React.KeyboardEvent<HTMLInputElement>,
    id: number
  ) => void;
  cancelEdit: (
    event: React.KeyboardEvent<HTMLInputElement>,
    id: number
  ) => void;
  deleteTodo: (id: number) => void;
  remaining: () => number;
  completeAllTodos: () => void;
}

function TodoList(props: Props): JSX.Element {
  const {
    todos,
    completeTodo,
    markAsEditing,
    updateTodo,
    cancelEdit,
    deleteTodo,
    remaining,
    completeAllTodos,
  } = props;

  function renderTodoNotEditing(todo: Todo): JSX.Element {
    return (
      <span
        onDoubleClick={() => markAsEditing(todo.id)}
        className={`todo-item-label ${todo.isComplete ? 'line-through' : ''}`}
      >
        {todo.title}
      </span>
    );
  }

  function renderTodoEditing(todo: Todo): JSX.Element {
    return (
      <input
        type="text"
        onBlur={event => updateTodo(event, todo.id)}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            updateTodo(event, todo.id);
          } else if (event.key === 'Escape') {
            cancelEdit(event, todo.id);
          }
        }}
        className="todo-item-input"
        defaultValue={todo.title}
        autoFocus
      />
    );
  }

  return (
    <>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={todo.id} className="todo-item-container">
            <div className="todo-item">
              <input
                type="checkbox"
                onChange={() => completeTodo(todo.id)}
                checked={todo.isComplete ? true : false}
              />

              {!todo.isEditing
                ? renderTodoNotEditing(todo)
                : renderTodoEditing(todo)}
            </div>
            <button onClick={() => deleteTodo(todo.id)} className="x-button">
              <svg
                className="x-button-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>

      <div className="check-all-container">
        <div>
          <button onClick={completeAllTodos} className="button">
            Check All
          </button>
        </div>

        <span>{remaining()} items remaining</span>
      </div>
    </>
  );
}

export default TodoList;
