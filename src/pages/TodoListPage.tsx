import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoApi, TodoListItemData } from '../apis/TodoApis';
import { TodoCreateForm } from '../components/TodoCreateForm';
import { TodoListItem } from '../components/TodoListItem';
import { LoginContext } from '../contexts/LoginContext';

const API_SERVER_URL = 'https://pre-onboarding-selection-task.shop';

export function TodoListPage() {
  const navigate = useNavigate();
  const { loggedIn, accessToken } = useContext(LoginContext);
  const [loaded, setLoaded] = useState(false);
  const [todos, setTodos] = useState<TodoListItemData[]>([]);
  const todoApi = new TodoApi(API_SERVER_URL, accessToken);

  const handleAddNewTodo = async (name: string) => {
    const createdTodo = await todoApi.createTodo(name);
    setTodos([...todos, createdTodo]);
  };

  const handleCheckChange = (id: number) => async () => {
    // 이렇게 처리해도 될까? 모르겠네
    const toChange = todos.find((todo) => todo.id === id);
    if (!toChange) {
      return;
    }
    toChange.isCompleted = !toChange.isCompleted;
    await todoApi.updateTodo(toChange);
    setTodos([...todos]);
  };

  const handleSubmit = (id: number) => async (name: string) => {
    // 이렇게 처리해도 될까? 모르겠네
    const toChange = todos.find((todo) => todo.id === id);
    if (!toChange) {
      return;
    }
    toChange.todo = name;
    await todoApi.updateTodo(toChange);
    setTodos([...todos]);
  };

  const handleDelete = (id: number) => async () => {
    await todoApi.deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 최초 로딩
  useEffect(() => {
    (async function () {
      if (!loggedIn) {
        navigate('/signin');
      }
      const todos = await todoApi.fetchTodos();
      setTodos(todos);
      setLoaded(true);
    })();
  }, []);

  if (!loggedIn) {
    return (
      <div>
        <h1>You're not logged in!</h1>
      </div>
    );
  }

  if (!loaded) {
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Your todos:</h1>
      {todos.length === 0 ? (
        <div>
          <h1>list is empty...</h1>
        </div>
      ) : (
        <ol style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {todos.map(({ id, todo, isCompleted }) => (
            <li key={id}>
              <TodoListItem
                name={todo}
                checked={isCompleted}
                handleCheck={handleCheckChange(id)}
                handleSubmit={handleSubmit(id)}
                handleDelete={handleDelete(id)}
              />
            </li>
          ))}
        </ol>
      )}
      <TodoCreateForm onAddNewTodo={handleAddNewTodo} />
    </div>
  );
}
