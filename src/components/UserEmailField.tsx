import { ID_INPUT_TITLE } from '../constants/UIMessageConstants';
import { UserAbstractField } from './AbstractUserField';

interface UserEmailFieldProps {
  id: string;
  value: string;
  handleChange: (newValue: string) => void;
}

export function UserEmailField({
  id,
  value,
  handleChange,
}: UserEmailFieldProps) {
  return (
    <UserAbstractField
      id={id}
      name={ID_INPUT_TITLE}
      value={value}
      type="text"
      handleChange={handleChange}
    />
  );
}
