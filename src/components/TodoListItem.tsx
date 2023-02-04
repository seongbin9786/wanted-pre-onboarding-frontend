interface TodoListItemProps {
  name: string;
  checked: boolean;
  handleCheck: () => void;
}

export function TodoListItem({
  name,
  checked,
  handleCheck,
}: TodoListItemProps) {
  return (
    <label style={{ display: "block" }}>
      <input
        type="checkbox"
        name="checked"
        defaultChecked={checked}
        onChange={handleCheck}
      />
      <span>{name}</span>
    </label>
  );
}
