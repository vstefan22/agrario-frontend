import { FC } from 'react';
import DynamicTable from '../../common/DynamicTable';
import ItemImage from '../../common/ItemImage';
import { PLOT_DETAILS_COLUMNS } from '../../../constants/table-data';
import { OfferType } from '../../../types/offer-types';
import active from '../../../assets/images/vermarktung-aktiv.png';
import inactive from '../../../assets/images/vermarktung-in-vorbereitung.png';
import imagePlaceholder from '../../../assets/images/image-placeholder.png';

type DetailsItemProps = {
  data: OfferType;
};

const DetailsItem: FC<DetailsItemProps> = ({ data }) => {
  return (
    <div
      className='w-full bg-white rounded-[18px] p-4 mb-6'
      style={{
        boxShadow: '6px 6px 54px 0px #0000000D',
        minHeight: '250px',
      }}
    >
      <div className='flex justify-between py-2 space-x-4'>
        {data.parcels.length > 0 && (
          <ItemImage image={imagePlaceholder} id={data.parcels[0].id} />
        )}
        <div className='flex flex-col'>
          {data.parcels.length > 0 && (
            <DynamicTable
              data={data.parcels[0]}
              columns={PLOT_DETAILS_COLUMNS}
            />
          )}
          <div className='flex justify-between items-center pt-5 gap-3 mt-auto'>
            <div>
              {(() => {
                const { criteria } = data;
                const restrictions = [];
                if (!criteria?.no_usage_restriction) {
                  if (!criteria?.wind_energy_restriction) {
                    restrictions.push('Wind');
                  }
                  if (!criteria?.solar_energy_restriction) {
                    restrictions.push('Freiflächensolar');
                  }
                  if (!criteria?.energy_storage_restriction) {
                    restrictions.push('Energie');
                  }
                  if (!criteria?.eco_enhancements_restriction) {
                    restrictions.push('Biodiversität');
                  }
                } else {
                  restrictions.push(
                    'Wind, Freiflächensolar, Energie, Biodiversität'
                  );
                }
                if (restrictions.length > 0) {
                  return (
                    <>
                      <h1 className='text-black-muted text-[14px]'>
                        {restrictions.join(', ')}
                      </h1>
                      <p className='text-gray-dark-100 text-[10px] opacity-[70%]'>
                        Potentiell geeignet
                      </p>
                    </>
                  );
                }
                return null;
              })()}
            </div>
            {data.parcels.length > 0 && (
              <img
                src={data.parcels[0].analyse_plus ? active : inactive}
                alt={'image-active/inactive'}
                className='mr-4 h-[22px] object-cover'
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsItem;
