import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoApi, TodoListItemData } from '../../apis/TodoApis';
import { TodoCreateForm } from '../../components/TodoCreateForm';
import { TodoListItem } from '../../components/TodoListItem';
import { TODOLIST_TITLE } from '../../constants/UIMessageConstants';
import { LoginContext } from '../../contexts/LoginContext';
import {
  DividerStyle,
  Empty,
  ListContainer,
  ListItemStyle,
  MarkerStyle,
  RootContainerStyle,
} from './style';

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
    const toChange = todos.find((todo) => todo.id === id);
    if (!toChange) {
      return;
    }
    toChange.isCompleted = !toChange.isCompleted;
    await todoApi.updateTodo(toChange);
    setTodos([...todos]);
  };

  const handleSubmit = (id: number) => async (name: string) => {
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

  if (!loggedIn || !loaded) {
    return null;
  }

  return (
    <div style={RootContainerStyle}>
      <h1>{TODOLIST_TITLE}</h1>
      <TodoCreateForm onAddNewTodo={handleAddNewTodo} />
      <hr style={DividerStyle} />
      {todos.length === 0 ? (
        <Empty />
      ) : (
        <ol style={ListContainer}>
          {todos.map(({ id, todo, isCompleted }, idx) => (
            <li style={ListItemStyle} key={id}>
              <span style={MarkerStyle}>{idx + 1}.</span>
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
    </div>
  );
}
