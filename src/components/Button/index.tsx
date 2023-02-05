import { ButtonStyle } from './style';

interface ButtonProps {
  id?: string;
  name: string;
  handleClick: () => void;
}

export function Button({ id, name, handleClick }: ButtonProps) {
  return (
    <button id={id} data-testid={id} onClick={handleClick} style={ButtonStyle}>
      {name}
    </button>
  );
}
