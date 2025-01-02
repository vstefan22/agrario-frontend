import { FC, Fragment } from 'react';
import OfferListItem from './OfferListItem';
import { ThankYouMarketingType } from '../../types/thank-you-marketing-types';

type OfferListProps = {
  data: ThankYouMarketingType[];
};

const OfferList: FC<OfferListProps> = ({ data }) => {
  return (
    <Fragment>
      {data.map((myOffer) => (
        <OfferListItem key={myOffer.id} data={myOffer} />
      ))}
    </Fragment>
  );
};

export default OfferList;
