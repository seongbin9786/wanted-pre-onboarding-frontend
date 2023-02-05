import type * as CSS from 'csstype';

interface ButtonProps {
  id?: string;
  name: string;
  handleClick: () => void;
}

const ButtonStyle: CSS.Properties = {
  color: '#666',
  fontSize: '16px',
  backgroundColor: '#eee',
  border: '2px solid #ddd',
  borderRadius: '8px',
  padding: '4px 8px',
  cursor: 'pointer',
  minWidth: '52px',
};

export function Button({ id, name, handleClick }: ButtonProps) {
  return (
    <button id={id} data-testid={id} onClick={handleClick} style={ButtonStyle}>
      {name}
    </button>
  );
}
