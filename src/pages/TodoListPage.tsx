import type * as CSS from 'csstype';

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoApi, TodoListItemData } from '../apis/TodoApis';
import { TodoCreateForm } from '../components/TodoCreateForm';
import { TodoListItem } from '../components/TodoListItem';
import { LoginContext } from '../contexts/LoginContext';

const RootContainerStyle: CSS.Properties = {
  border: '1px black solid',
  display: 'flex',
  flexDirection: 'column',
  padding: '16px 24px',
  alignItems: 'center',
  margin: 'auto',
};

const ListContainer: CSS.Properties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  rowGap: '16px',
  listStyleType: 'none',
  padding: '0px',
};

const DividerStyle: CSS.Properties = {
  width: '100%',
  margin: '16px 0px 8px 0px',
  border: '1px',
  borderTop: '1px solid #eee',
};

const ListItemStyle: CSS.Properties = {
  fontSize: '20px',
  lineHeight: '2',
  display: 'flex',
  gap: '8px',
};

const MarkerStyle: CSS.Properties = {
  display: 'flex',
  alignItems: 'center',
};

function Empty() {
  return (
    <div>
      <h1>할 일 목록이 없어요. 하나 만들어보세요!</h1>
    </div>
  );
}

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

  if (!loggedIn || !loaded) {
    return null;
  }

  return (
    <div style={RootContainerStyle}>
      <h1>남은 할일 목록!</h1>
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
