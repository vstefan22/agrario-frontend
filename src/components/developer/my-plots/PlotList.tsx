import { FC, Fragment } from 'react';
import PlotListItem from '../my-plots/PlotListItem';
import { PlotType } from '../../../types/plot-types';

type PlotListProps = {
  data: PlotType[];
};

const PlotList: FC<PlotListProps> = ({ data }) => {
  return (
    <Fragment>
      {data.map((plot) => (
        <PlotListItem key={plot.id} data={plot} />
      ))}
    </Fragment>
  );
};

export default PlotList;
