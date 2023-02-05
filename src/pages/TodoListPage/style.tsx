import type * as CSS from 'csstype';

export function Empty() {
  return (
    <div>
      <h1>할 일 목록이 없어요. 하나 만들어보세요!</h1>
    </div>
  );
}

export const RootContainerStyle: CSS.Properties = {
  border: '1px black solid',
  display: 'flex',
  flexDirection: 'column',
  padding: '16px 24px',
  alignItems: 'center',
  margin: 'auto',
};

export const ListContainer: CSS.Properties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  rowGap: '16px',
  listStyleType: 'none',
  padding: '0px',
};

export const DividerStyle: CSS.Properties = {
  width: '100%',
  margin: '16px 0px 8px 0px',
  border: '1px',
  borderTop: '1px solid #eee',
};

export const ListItemStyle: CSS.Properties = {
  fontSize: '20px',
  lineHeight: '2',
  display: 'flex',
  gap: '8px',
};

export const MarkerStyle: CSS.Properties = {
  display: 'flex',
  alignItems: 'center',
};
