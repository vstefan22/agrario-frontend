import { FC, Fragment } from 'react';
import ThankYouMarketingListItem from '../my-plots/ThankYouMarketingListItem';
import { PlotType } from '../../../types/plot-types';

type PlotListProps = {
  data: PlotType[];
};

const ThankYouMarketingList: FC<PlotListProps> = ({ data }) => {
  return (
    <Fragment>
      {data.map((tym) => (
        <ThankYouMarketingListItem key={tym.id} data={tym} />
      ))}
    </Fragment>
  );
};

export default ThankYouMarketingList;
