import { FC, Fragment } from 'react';
import MyOfferListItem from './MyOffersListItem';
import { ThankYouMarketingType } from '../../types/thank-you-marketing-types';

type MyOfferListProps = {
    data: ThankYouMarketingType[];
};

const MyOfferList: FC<MyOfferListProps> = ({ data }) => {
    return (
        <Fragment>
            {data.map((myOffer) => (
                <MyOfferListItem key={myOffer.id} data={myOffer} />
            ))}
        </Fragment>
    );
};

export default MyOfferList;
