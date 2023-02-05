import type * as CSS from 'csstype';

import { useState } from 'react';
import { Button } from './Button';

export interface CreateFormProps {
  onAddNewTodo: (name: string) => void;
}

const ContainerStyle: CSS.Properties = {
  display: 'flex',
  flexDirection: 'row',
  gap: '16px',
  width: '100%',
};

const ModifyInputStyle: CSS.Properties = {
  fontSize: '18px',
  lineHeight: '1.5',
  padding: '4px 8px',
  width: '100%',
};

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
