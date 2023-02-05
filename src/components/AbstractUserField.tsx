import type * as CSS from 'csstype';

interface UserAbstractFieldProps {
  id: string;
  name: string;
  value: string;
  type: 'text' | 'password';
  handleChange: (newValue: string) => void;
}

const CotainerStyle: CSS.Properties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

const LabelStyle: CSS.Properties = {
  display: 'block',
};

const InputStyle: CSS.Properties = {
  height: '24px',
  padding: '4px 8px',
  fontSize: '16px',
};

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
