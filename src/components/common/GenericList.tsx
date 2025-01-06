import { Fragment } from 'react';

interface GenericListProps<T> {
  data: T[];
  renderItem: (item: T) => JSX.Element;
}

function GenericList<T>({ data, renderItem }: GenericListProps<T>) {
  return (
    <Fragment>
      {data.map((item, index) => (
        <Fragment key={index}>{renderItem(item)}</Fragment>
      ))}
    </Fragment>
  );
}

export default GenericList;
