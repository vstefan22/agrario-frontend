import { FC, Fragment } from 'react';
import MyWatchlistListItem from './MyWatchlistListItem';
import { PlotSearchType } from '../../../types/plot-search-types';

type PlotSearchListProps = {
  data: PlotSearchType[];
};

const MyWatchlistList: FC<PlotSearchListProps> = ({ data }) => {
  return (
    <Fragment>
      {data.map((plot) => (
        <MyWatchlistListItem key={plot.id} data={plot} />
      ))}
    </Fragment>
  );
};

export default MyWatchlistList;
