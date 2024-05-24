// src/TodoApp.js
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import TodoItem from './TodoItem';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { setCount } from './counterSlice';
import Redux from './Redux';
import { Link } from 'react-router-dom';

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<{ id: string; text: string; completed: boolean }[]>([]);
  const [inputText, setInputText] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost:5000/todos')
      .then(response => response.json())
      .then(data => {
        setTodos(data);
        dispatch(setCount(data.length));
      });
  }, [dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      const newTodo = {
        id: uuidv4(),
        text: inputText,
        completed: false,
      };
      fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      })
      .then(() => {
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        dispatch(setCount(updatedTodos.length));
        setInputText('');
      });
    }
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    const updatedTodo = updatedTodos.find(todo => todo.id === id);

    fetch(`http://localhost:5000/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodo),
    })
    .then(() => setTodos(updatedTodos));
  };

  const removeTodo = (id: string) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
      dispatch(setCount(updatedTodos.length));
    });
  };

  return (
    <>
    <Link to="/credits">
      <Button>Twórca</Button></Link>

    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Todo Lista</h1>
      <Redux />
      <div className="flex mb-4 mt-20 space-x-5">
        <input
          type="text"
          className="border text-black border-gray-300 rounded px-4 py-2 mr-2 flex-grow"
          placeholder="Co dziś robimy"
          value={inputText}
          onChange={handleInputChange}
        />
        <Button onClick={handleAddTodo}>
          Dodaj zadanie
        </Button>
      </div>
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
          />
        ))}
      </ul>
    </div>
    </>
  );
};

export default TodoApp;
