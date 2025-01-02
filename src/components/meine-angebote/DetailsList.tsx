import { FC, Fragment } from 'react';
import DetailsListItem from './DetailsListItem';
import { ThankYouMarketingType } from '../../types/thank-you-marketing-types';

type DetailsListProps = {
    data: ThankYouMarketingType[];
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
