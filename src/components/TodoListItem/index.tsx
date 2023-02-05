import { useState } from 'react';
import { Button } from '../Button';
import {
  CheckboxStyle,
  ContainerStyle,
  LabelStyle,
  ModifyInputStyle,
  NameStyle,
} from './style';

interface TodoListItemProps {
  name: string;
  checked: boolean;
  handleCheck: () => void;
  handleSubmit: (name: string) => void;
  handleDelete: () => void;
}

export function TodoListItem({
  name,
  checked,
  handleCheck,
  handleSubmit,
  handleDelete,
}: TodoListItemProps) {
  const [modifyMode, setModifyMode] = useState(false);
  const [input, setInput] = useState(name);
  const commitModified = async () => {
    await handleSubmit(input);
    setModifyMode(false);
  };

  return (
    <li style={ContainerStyle}>
      <label style={LabelStyle}>
        <input
          style={CheckboxStyle}
          type="checkbox"
          name="checked"
          defaultChecked={checked}
          onChange={handleCheck}
        />
        {modifyMode ? (
          <input
            style={ModifyInputStyle}
            data-testid="modify-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        ) : (
          <span style={NameStyle}>{name}</span>
        )}
      </label>

      {modifyMode ? (
        <>
          <Button id="submit-button" name="제출" handleClick={commitModified} />
          <Button
            id="cancel-button"
            name="취소"
            handleClick={() => setModifyMode(false)}
          />
        </>
      ) : (
        <>
          <Button
            id="modify-button"
            name="수정"
            handleClick={() => setModifyMode(true)}
          />
          <Button id="delete-button" name="삭제" handleClick={handleDelete} />
        </>
      )}
    </li>
  );
}
