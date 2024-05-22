import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/todos').then(response => {
            setTodos(response.data);
        });
    }, []);

    const addTodo = () => {
        axios.post('http://localhost:8080/api/todos', { title: input, completed: false })
            .then(response => {
                setTodos([...todos, response.data]);
                setInput('');
            });
    };

    const deleteTodo = id => {
        axios.delete(`http://localhost:8080/api/todos/${id}`).then(() => {
            setTodos(todos.filter(todo => todo.id !== id));
        });
    };

    return (
        <div>
            <input value={input} onChange={e => setInput(e.target.value)} />
            <button onClick={addTodo}>Add Todo</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>{todo.title} <button onClick={() => deleteTodo(todo.id)}>Delete</button></li>
                ))}
            </ul>
        </div>
    );
}

export default App;
