import { useState } from 'react';

export interface CreateFormProps {
  onAddNewTodo: (name: string) => void;
}

export function TodoCreateForm({ onAddNewTodo: addNewTodo }: CreateFormProps) {
  const [createInput, setCreateInput] = useState('');

  return (
    <>
      <h2>Add new Todo!</h2>
      <input
        data-testid="new-todo-input"
        value={createInput}
        onChange={(e) => setCreateInput(e.target.value)}
      />
      <button
        data-testid="new-todo-and-button"
        onClick={async () => {
          addNewTodo(createInput);
          setCreateInput('');
        }}
      >
        추가
      </button>
    </>
  );
}
