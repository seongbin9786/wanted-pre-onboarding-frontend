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
      name="아이디"
      value={value}
      type="text"
      handleChange={handleChange}
    />
  );
}
