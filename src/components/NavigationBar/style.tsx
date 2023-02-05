import type * as CSS from 'csstype';

export const ContainerStyle: CSS.Properties = {
  display: 'flex',
  gap: '16px',
  border: '1px solid black',
  flexDirection: 'row-reverse',
  padding: '8px',
};

export const LinkStyle: CSS.Properties = {
  fontSize: '20px',
  lineHeight: '1.5',
  fontWeight: 'bold',
  color: '#666',
};

export const LogoutButtonStyle: CSS.Properties = {
  fontSize: '20px',
  lineHeight: '1.5',
  fontWeight: 'bold',
  background: 'none',
  border: 'none',
  textDecoration: 'underline',
  cursor: 'pointer',
  color: '#666',
};
