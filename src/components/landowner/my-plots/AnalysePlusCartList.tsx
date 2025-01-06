import { FC, Fragment } from 'react';
import AnalysePlusCartListItem from '../my-plots/AnalysePlusCartListItem';
import { AnalysePlusCartType } from '../../../types/analyse-plus-cart-types';

type AnalysePlusCartListProps = {
  data: AnalysePlusCartType[];
  isEnable?: boolean;
};

const AnalysePlusCartList: FC<AnalysePlusCartListProps> = ({
  data,
  isEnable,
}) => {
  return (
    <Fragment>
      {data.map((warenkorb) => (
        <AnalysePlusCartListItem
          key={warenkorb.id}
          data={warenkorb}
          isEnable={isEnable}
        />
      ))}
    </Fragment>
  );
};

export default AnalysePlusCartList;
