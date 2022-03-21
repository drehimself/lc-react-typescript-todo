import { useState } from 'react';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { Todo } from '../Interfaces';
import '../reset.css';
import '../App.css';

function App(): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: 'Finish React Series',
      isComplete: false,
      isEditing: false,
    },
    {
      id: 2,
      title: 'Go Grocery',
      isComplete: true,
      isEditing: false,
    },
    {
      id: 3,
      title: 'Take over world',
      isComplete: false,
      isEditing: false,
    },
  ]);

  const [idForTodo, setIdForTodo] = useState<number>(4);

  function addTodo(todoTitle: string): void {
    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todoTitle,
        isComplete: false,
        isEditing: false,
      },
    ]);

    setIdForTodo((prevIdForTodo: number) => prevIdForTodo + 1);
  }

  function deleteTodo(id: number): void {
    setTodos([...todos].filter((todo: Todo) => todo.id !== id));
  }

  function completeTodo(id: number): void {
    const updatedTodos: Todo[] = todos.map((todo: Todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function markAsEditing(id: number): void {
    const updatedTodos: Todo[] = todos.map((todo: Todo) => {
      if (todo.id === id) {
        todo.isEditing = true;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function updateTodo(
    event:
      | React.FocusEvent<HTMLInputElement, Element>
      | React.KeyboardEvent<HTMLInputElement>,
    id: number
  ): void {
    const updatedTodos: Todo[] = todos.map((todo: Todo) => {
      if (todo.id === id) {
        if (event.currentTarget.value.trim().length === 0) {
          todo.isEditing = false;
          return todo;
        }
        todo.title = event.currentTarget.value;
        todo.isEditing = false;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function cancelEdit(
    event: React.KeyboardEvent<HTMLInputElement>,
    id: number
  ): void {
    const updatedTodos: Todo[] = todos.map((todo: Todo) => {
      if (todo.id === id) {
        todo.isEditing = false;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function completeAllTodos(): void {
    const updatedTodos: Todo[] = todos.map((todo: Todo) => {
      todo.isComplete = true;

      return todo;
    });

    setTodos(updatedTodos);
  }

  function remaining(): number {
    return todos.filter((todo: Todo) => !todo.isComplete).length;
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />

        {todos.length > 0 ? (
          <TodoList
            todos={todos}
            completeTodo={completeTodo}
            markAsEditing={markAsEditing}
            updateTodo={updateTodo}
            cancelEdit={cancelEdit}
            deleteTodo={deleteTodo}
            remaining={remaining}
            completeAllTodos={completeAllTodos}
          />
        ) : (
          <NoTodos />
        )}
      </div>
    </div>
  );
}

export default App;
