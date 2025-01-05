import { FC, Fragment } from 'react';
import PlotSearchListItem from './PlotSearchListItem';
import { PlotSearchType } from '../../types/plot-search-types';

type PlotSearchListProps = {
  data: PlotSearchType[];
};

const PlotSearchList: FC<PlotSearchListProps> = ({ data }) => {
  return (
    <Fragment>
      {data.map((plot) => (
        <PlotSearchListItem key={plot.id} data={plot} />
      ))}
    </Fragment>
  );
};

export default PlotSearchList;
