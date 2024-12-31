import { FC, Fragment } from 'react';
import WarenkorbAnalysePlusListItem from './WarenkorbAnalysePlusListItem';
import { WarenkorbAnalysePlusType } from '../../types/warenkorb-analyse-plus-types';

type WarenkorbAnalysePlusListProps = {
    data: WarenkorbAnalysePlusType[];
    isEnable?: boolean;
};

const WarenkorbAnalysePlusList: FC<WarenkorbAnalysePlusListProps> = ({ data, isEnable }) => {
    return (
        <Fragment>
            {data.map((warenkorb) => (
                <WarenkorbAnalysePlusListItem key={warenkorb.id} data={warenkorb} isEnable={isEnable} />
            ))}
        </Fragment>
    );
};

export default WarenkorbAnalysePlusList;
