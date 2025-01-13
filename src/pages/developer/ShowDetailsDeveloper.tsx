import DynamicTableSection from '../../components/show-details/DynamicTableSection';
import { showDetailsData } from '../../../ShowDetailsMockData';

type ShowDetailsDeveloperType = {
  isAuction?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

const ShowDetailsDeveloper = ({
  isAuction = false,
  data,
}: ShowDetailsDeveloperType) => {
  console.log('analyse details data: ', data);
  return (
    <div className='bg-gray-100 min-h-screen flex flex-col'>
      <div className='flex flex-col justify-center bg-white rounded-[16px] shadow-[6px_6px_54px_0px_#0000000D] p-8 mt-8'>
        {isAuction
          ? showDetailsData.map((data, index) => (
              <DynamicTableSection
                key={index}
                title={data.title}
                description={data.description}
                columns={data.columns}
                data={data.data}
                image={data.image}
              />
            ))
          : showDetailsData.map((data, index) => (
              <DynamicTableSection
                key={index}
                title={data.title}
                description={data.description}
                columns={data.columns}
                data={data.data}
                image={data.image}
                blurKeys={['Gemeinde', 'Gemarkung', 'Flur', 'Flurstuck']}
              />
            ))}
      </div>
    </div>
  );
};

export default ShowDetailsDeveloper;
