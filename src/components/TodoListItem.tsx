import { useState } from 'react';

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
    <div style={{ display: 'flex', gap: 16, height: 48, alignItems: 'center' }}>
      <label style={{ width: 240, display: 'flex', gap: 4 }}>
        <input
          type="checkbox"
          name="checked"
          defaultChecked={checked}
          onChange={handleCheck}
        />
        {modifyMode ? (
          <input
            data-testid="modify-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        ) : (
          <span>{name}</span>
        )}
      </label>

      {modifyMode ? (
        <>
          <button data-testid="submit-button" onClick={commitModified}>
            제출
          </button>
          <button
            data-testid="cancel-button"
            onClick={() => setModifyMode(false)}
          >
            취소
          </button>
        </>
      ) : (
        <>
          <button
            data-testid="modify-button"
            onClick={() => setModifyMode(true)}
          >
            수정
          </button>
          <button data-testid="delete-button" onClick={handleDelete}>
            삭제
          </button>
        </>
      )}
    </div>
  );
}
