import { FC, Fragment } from 'react';
import DetailsListItem from './DetailsListItem';
import { DetailsType } from '../../types/details-types';

type DetailsListProps = {
  data: DetailsType[];
};

const DetailsList: FC<DetailsListProps> = ({ data }) => {
  return (
    <Fragment>
      {data.map((details) => (
        <DetailsListItem key={details.id} data={details} />
      ))}
    </Fragment>
  );
};

export default DetailsList;
