import { useState } from 'react';
import { Button } from '../Button';
import { ContainerStyle, ModifyInputStyle } from './style';

export interface CreateFormProps {
  onAddNewTodo: (name: string) => void;
}

export function TodoCreateForm({ onAddNewTodo: addNewTodo }: CreateFormProps) {
  const [createInput, setCreateInput] = useState('');

  return (
    <div style={ContainerStyle}>
      <input
        data-testid="new-todo-input"
        style={ModifyInputStyle}
        value={createInput}
        onChange={(e) => setCreateInput(e.target.value)}
      />
      <Button
        data-testid="new-todo-and-button"
        name="추가"
        handleClick={async () => {
          addNewTodo(createInput);
          setCreateInput('');
        }}
      />
    </div>
  );
}
