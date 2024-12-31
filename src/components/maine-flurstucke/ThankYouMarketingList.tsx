import { FC, Fragment } from 'react';
import ThankYouMarketingListItem from './ThankYouMarketingListItem';
import { FlurstuckType } from '../../types/flurstuck-types';

type FlurstuckListProps = {
  data: FlurstuckType[];
};

const ThankYouMarketingList: FC<FlurstuckListProps> = ({ data }) => {
  return (
    <Fragment>
      {data.map((tym) => (
        <ThankYouMarketingListItem key={tym.id} data={tym} />
      ))}
    </Fragment>
  );
};

export default ThankYouMarketingList;