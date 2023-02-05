import { useEffect, useState } from 'react';
import { TodoApi, TodoListItemData } from '../apis/TodoApis';
import { TodoListItem } from '../components/TodoListItem';

interface TodoListPageProps {
  todoApi: TodoApi;
  loggedIn: boolean;
}

/*
  TODO: List, Create 컴포넌트로 빼고, Page는 공유 상태만 관리하기로
*/
export function TodoListPage({ todoApi, loggedIn }: TodoListPageProps) {
  const [loaded, setLoaded] = useState(false);
  const [todos, setTodos] = useState<TodoListItemData[]>([]);
  const [createInput, setCreateInput] = useState('');
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
  const addNewTodo = (newItem: TodoListItemData) => {
    setTodos([...todos, newItem]);
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
        return;
      }

      const todos = await todoApi.fetchTodos();
      setTodos(todos);
      setLoaded(true);
    })();
  }, [todoApi, loggedIn]);

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
          {todos.map((todo) => (
            <li key={todo.id}>
              <TodoListItem
                name={todo.todo}
                checked={todo.isCompleted}
                handleCheck={handleCheckChange(todo.id)}
                handleSubmit={handleSubmit(todo.id)}
                handleDelete={handleDelete(todo.id)}
              />
            </li>
          ))}
        </ol>
      )}
      {/* 이걸 따로 빼면 뭐가 힘들까? */}
      <h2>Add new Todo!</h2>
      <input
        data-testid="new-todo-input"
        value={createInput}
        onChange={(e) => setCreateInput(e.target.value)}
      />
      <button
        data-testid="new-todo-and-button"
        onClick={async () => {
          const createdTodo = await todoApi.createTodo(createInput);
          addNewTodo(createdTodo);
          setCreateInput('');
        }}
      >
        추가
      </button>
    </div>
  );
}
