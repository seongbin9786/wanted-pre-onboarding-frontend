import { useState } from 'react';
import { ADD_BUTTON_TITLE } from '../../constants/UIMessageConstants';
import { Button } from '../Button';
import { ContainerStyle, ModifyInputStyle } from './style';

export interface CreateFormProps {
  onAddNewTodo: (name: string) => void;
}

/**
 * Todo를 생성하는 폼
 * - 입력 필드와 작성 버튼을 포함
 */
export function TodoCreateForm({ onAddNewTodo: addNewTodo }: CreateFormProps) {
  const [createInput, setCreateInput] = useState('');

  const handleButtonClick = async () => {
    addNewTodo(createInput);
    setCreateInput('');
  };

  return (
    <div style={ContainerStyle}>
      <input
        data-testid="new-todo-input"
        style={ModifyInputStyle}
        value={createInput}
        onChange={(e) => setCreateInput(e.target.value)}
      />
      <Button
        id="new-todo-add-button"
        name={ADD_BUTTON_TITLE}
        handleClick={handleButtonClick}
      />
    </div>
  );
}
