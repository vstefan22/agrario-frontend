import { FC, Fragment } from 'react';
import WarenkorbAnalysePlusListItem from './WarenkorbAnalysePlusListItem';
import { WarenkorbAnalysePlusType } from '../../types/warenkorb-analyse-plus-types';

type WarenkorbAnalysePlusListProps = {
    data: WarenkorbAnalysePlusType[];
};

const WarenkorbAnalysePlusList: FC<WarenkorbAnalysePlusListProps> = ({ data }) => {
    return (
        <Fragment>
            {data.map((warenkorb) => (
                <WarenkorbAnalysePlusListItem key={warenkorb.id} data={warenkorb} />
            ))}
        </Fragment>
    );
};

export default WarenkorbAnalysePlusList;
