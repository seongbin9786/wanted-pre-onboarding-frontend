import { PASSWORD_INPUT_TITLE } from '../constants/UIMessageConstants';
import { UserAbstractField } from './AbstractUserField';

interface UserPasswordFieldProps {
  id: string;
  value: string;
  handleChange: (newValue: string) => void;
}

export function UserPasswordField({
  id,
  value,
  handleChange,
}: UserPasswordFieldProps) {
  return (
    <UserAbstractField
      id={id}
      name={PASSWORD_INPUT_TITLE}
      value={value}
      type="password"
      handleChange={handleChange}
    />
  );
}
