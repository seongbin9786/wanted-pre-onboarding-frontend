import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
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
  const todoApi = useMemo(
    () => new TodoApi(API_SERVER_URL, accessToken),
    [accessToken]
  );

  const handleAddNewTodo = useCallback(
    async (name: string) => {
      const createdTodo = await todoApi.createTodo(name);
      setTodos((todos) => [...todos, createdTodo]);
    },
    [todoApi]
  );

  const handleCheckChange = useCallback(
    (id: number) => async () => {
      const toChange = todos.find((todo) => todo.id === id);
      if (!toChange) {
        return;
      }
      toChange.isCompleted = !toChange.isCompleted;
      await todoApi.updateTodo(toChange);
      setTodos([...todos]);
    },
    [todoApi]
  );

  const handleSubmit = useCallback(
    (id: number) => async (name: string) => {
      const toChange = todos.find((todo) => todo.id === id);
      if (!toChange) {
        return;
      }
      toChange.todo = name;
      await todoApi.updateTodo(toChange);
      setTodos((todos) => [...todos]);
    },
    [todoApi]
  );

  const handleDelete = useCallback(
    (id: number) => async () => {
      await todoApi.deleteTodo(id);
      setTodos((todos) => todos.filter((todo) => todo.id !== id));
    },
    [todoApi]
  );

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
  }, [navigate, loggedIn, todoApi]);

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
          {todos.map(({ id, todo, isCompleted }, idx) => {
            return (
              <li style={ListItemStyle} key={id}>
                <span style={MarkerStyle}>{idx + 1}.</span>
                <TodoListItem
                  id={id}
                  name={todo}
                  checked={isCompleted}
                  handleCheck={handleCheckChange}
                  handleSubmit={handleSubmit}
                  handleDelete={handleDelete}
                />
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
