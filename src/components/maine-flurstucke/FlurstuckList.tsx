import { FC, Fragment } from 'react';
import FlurstuckListItem from './FlurstuckListItem';
import { FlurstuckType } from '../../types/flurstuck-types';

type FlurstuckListProps = {
  data: FlurstuckType[];
};

const FlurstuckList: FC<FlurstuckListProps> = ({ data }) => {
  return (
    <Fragment>
      {data.map((flurstuck) => (
        <FlurstuckListItem key={flurstuck.id} data={flurstuck} />
      ))}
    </Fragment>
  );
};

export default FlurstuckList;
