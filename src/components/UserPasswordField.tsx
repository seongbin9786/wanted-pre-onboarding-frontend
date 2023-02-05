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
      name="비밀번호"
      value={value}
      type="password"
      handleChange={handleChange}
    />
  );
}
