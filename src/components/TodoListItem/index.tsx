import React, { useState } from 'react';
import {
  CANCEL_BUTTON_TITLE,
  MODIFY_BUTTON_TITLE,
  REMOVE_BUTTON_TITLE,
  SUBMIT_BUTTON_TITLE,
} from '../../constants/UIMessageConstants';
import { Button } from '../Button';
import {
  CheckboxStyle,
  ContainerStyle,
  LabelStyle,
  ModifyInputStyle,
  NameStyle,
} from './style';

interface TodoListItemProps {
  id: number;
  name: string;
  checked: boolean;
  handleFinishToggle: (id: number) => () => void;
  handleTitleChange: (id: number, name: string) => Promise<void>;
  handleDelete: (id: number) => () => void;
}

function UnPureTodoListItem({
  id,
  name,
  checked,
  handleFinishToggle,
  handleTitleChange,
  handleDelete,
}: TodoListItemProps) {
  const [modifyMode, setModifyMode] = useState(false);
  const [input, setInput] = useState(name);
  const commitModified = async () => {
    await handleTitleChange(id, input);
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
          onChange={handleFinishToggle(id)}
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
          <Button
            id="submit-button"
            name={SUBMIT_BUTTON_TITLE}
            handleClick={commitModified}
          />
          <Button
            id="cancel-button"
            name={CANCEL_BUTTON_TITLE}
            handleClick={() => setModifyMode(false)}
          />
        </>
      ) : (
        <>
          <Button
            id="modify-button"
            name={MODIFY_BUTTON_TITLE}
            handleClick={() => setModifyMode(true)}
          />
          <Button
            id="delete-button"
            name={REMOVE_BUTTON_TITLE}
            handleClick={handleDelete(id)}
          />
        </>
      )}
    </li>
  );
}

export const TodoListItem = React.memo(UnPureTodoListItem);
