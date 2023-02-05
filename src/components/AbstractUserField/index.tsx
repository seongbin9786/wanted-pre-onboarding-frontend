import { CotainerStyle, InputStyle, LabelStyle } from './style';

interface UserAbstractFieldProps {
  id: string;
  name: string;
  value: string;
  type: 'text' | 'password';
  handleChange: (newValue: string) => void;
}

export function UserAbstractField({
  id,
  name,
  value,
  type,
  handleChange,
}: UserAbstractFieldProps) {
  return (
    <div style={CotainerStyle}>
      <label htmlFor={id} style={LabelStyle}>
        {name}
      </label>
      <input
        id={id}
        data-testid={id}
        type={type}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        style={InputStyle}
      />
    </div>
  );
}
