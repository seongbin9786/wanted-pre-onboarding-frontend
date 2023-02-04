import { useEffect, useState } from "react";
import { TodoListItem } from "../components/TodoListItem";
import { BackendErrorResponse } from "../server";

interface TodoListItemData {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

async function fetchTodos(accessToken: string): Promise<TodoListItemData[]> {
  const response = await fetch(
    "https://pre-onboarding-selection-task.shop/todos",
    {
      method: "get",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
  if (!response.ok) {
    const body = (await response.json()) as BackendErrorResponse;
    alert(body.message);
    throw new Error("Backend Error!");
  }
  // TODO: any인데 Typing하기
  return response.json();
}

// TODO: 반환된 accessToken을 저장, 중복된 코드 컴포넌트화
async function createTodo(
  accessToken: string,
  name: string
): Promise<TodoListItemData> {
  const response = await fetch(
    "https://pre-onboarding-selection-task.shop/todos",
    {
      method: "post",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: name,
      }),
    }
  );
  console.log(response);
  if (!response.ok) {
    const body = (await response.json()) as BackendErrorResponse;
    alert(body.message);
    throw new Error("Backend Error!");
  }
  // TODO: any인데 Typing하기
  return response.json();
}

// TODO: 반환된 accessToken을 저장, 중복된 코드 컴포넌트화
async function updateTodo(
  accessToken: string,
  toUpdate: TodoListItemData
): Promise<TodoListItemData> {
  const response = await fetch(
    `https://pre-onboarding-selection-task.shop/todos/${toUpdate.id}`,
    {
      method: "put",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: toUpdate.todo,
        isCompleted: toUpdate.isCompleted,
      }),
    }
  );
  console.log(response);
  if (!response.ok) {
    const body = (await response.json()) as BackendErrorResponse;
    alert(body.message);
    throw new Error("Backend Error!");
  }
  // TODO: any인데 Typing하기
  return response.json();
}

// TODO: 반환된 accessToken을 저장, 중복된 코드 컴포넌트화
async function deleteTodo(accessToken: string, id: number): Promise<void> {
  const response = await fetch(
    `https://pre-onboarding-selection-task.shop/todos/${id}`,
    {
      method: "delete",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
  if (!response.ok) {
    const body = (await response.json()) as BackendErrorResponse;
    alert(body.message);
    throw new Error("Backend Error!");
  }
}

interface TodoListPageProps {
  loggedIn: boolean;
  accessToken: string;
}

/*
  TODO: List, Create 컴포넌트로 빼고, Page는 공유 상태만 관리하기로
*/
export function TodoListPage({ loggedIn, accessToken }: TodoListPageProps) {
  const [loaded, setLoaded] = useState(false);
  const [todos, setTodos] = useState<TodoListItemData[]>([]);
  const [createInput, setCreateInput] = useState("");
  const handleCheckChange = (id: number) => async () => {
    // 이렇게 처리해도 될까? 모르겠네
    const toChange = todos.find((todo) => todo.id === id);
    if (!toChange) {
      return;
    }
    toChange.isCompleted = !toChange.isCompleted;
    await updateTodo(accessToken, toChange);
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
    await updateTodo(accessToken, toChange);
    setTodos([...todos]);
  };
  const handleDelete = (id: number) => async () => {
    await deleteTodo(accessToken, id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 최초 로딩
  useEffect(() => {
    (async function () {
      if (!loggedIn) {
        return;
      }

      const todos = await fetchTodos(accessToken);
      setTodos(todos);
      setLoaded(true);
    })();
  }, [loggedIn, accessToken]);

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
        <ol style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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
          const createdTodo = await createTodo(accessToken, createInput);
          addNewTodo(createdTodo);
          setCreateInput("");
        }}
      >
        추가
      </button>
    </div>
  );
}
