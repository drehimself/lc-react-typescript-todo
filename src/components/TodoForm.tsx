import React, { useState } from 'react';

interface Props {
  addTodo: (todoTitle: string) => void;
}

function TodoForm({ addTodo }: Props): JSX.Element {
  const [todoInput, setTodoInput] = useState('');

  function handleInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setTodoInput(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (todoInput.trim().length === 0) {
      return;
    }

    addTodo(todoInput);

    setTodoInput('');
  }

  return (
    <form action="#" onSubmit={handleSubmit}>
      <input
        type="text"
        value={todoInput}
        onChange={handleInput}
        className="todo-input"
        placeholder="What do you need to do?"
      />
    </form>
  );
}

export default TodoForm;
