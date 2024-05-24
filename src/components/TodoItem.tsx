import React from 'react';
import Redux from './Redux';

interface TodoItemProps {
  todo: {
    id: string;
    text: string;
    completed: boolean;
  };
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, removeTodo }) => {
  const handleToggleTodo = () => {
    toggleTodo(todo.id);
  };

  const handleRemoveTodo = () => {
    removeTodo(todo.id);
  };

  return (
    <>
    <li className="flex items-center justify-between p-4 text-white">
      <div className="flex">
        <span
          className={`ml-2 p-2 ${todo.completed ? 'line-through text-red-500' : ''}`}
          style={{ color: todo.completed ? 'red' : 'white', textDecoration: todo.completed ? 'line-through' : 'none' }}
        >
          {todo.text}
        </span>
        <button
          className={`ml-2 p-2 bg-blue-500 text-white rounded ${todo.completed ? 'hidden' : 'block'}`}
          onClick={handleToggleTodo}
        >
          Zrobione 
        </button>
        <button
          className="ml-2 p-2 bg-red-500 text-white rounded"
          onClick={handleRemoveTodo}
        >
          Usuń
        </button>
      </div>
    </li>
    
    </>
  );
};

export default TodoItem;
