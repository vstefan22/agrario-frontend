import DynamicTable from '../../components/common/DynamicTable';
import ShowDetailsImage from '../../components/show-details/ShowDetailsImage';
import ShowDetailsCard from '../../components/show-details/ShowDetailsCard';
import DynamicTableSection from '../../components/show-details/DynamicTableSection';
import { PLOT_DETAILS_V8_COLUMNS } from '../../constants/table-data';
import germanyImg from '../../assets/images/germany-country.png';
import woodsImg from '../../assets/images/woods.png';
import mountainsImg from '../../assets/images/mountains.png';
import { showDetailsData } from '../../../detailsData';

type ShowDetailsDeveloperType = {
  isAuction?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

const ShowDetailsDeveloper = ({
  isAuction = false,
  data,
}: ShowDetailsDeveloperType) => {
  return (
    <div className='bg-gray-100 min-h-screen flex flex-col'>
      <div className='flex flex-col justify-center bg-white rounded-[16px] shadow-[6px_6px_54px_0px_#0000000D] p-8'>
        <div className='flex justify-around'>
          <ShowDetailsImage src={germanyImg} />
          <ShowDetailsImage src={woodsImg} />
          <ShowDetailsImage src={mountainsImg} />
          <ShowDetailsImage src={mountainsImg} />
        </div>

        <div className='flex justify-center my-12'>
          <DynamicTable data={data} columns={PLOT_DETAILS_V8_COLUMNS} />
        </div>

        <div className='flex flex-col'>
          <div className='flex justify-around border-[1px] border-gray-medium/60 p-8 rounded-lg'>
            <div className='flex flex-col items-center'>
              <h1 className='text-[24px] text-black-muted mb-6 w-[400px] text-center'>
                Vorteile für Eigentümer bei Verpachtung
              </h1>
              <div className='flex gap-6'>
                <ShowDetailsCard
                  number={15700}
                  description='Mögliche Pachteinahmen pro Jahr'
                  symbol='€'
                  formatted
                />
                <ShowDetailsCard
                  number={157000}
                  description='Summierte Einnahmen über Vertragslaufzeit von 25 Jahren'
                  symbol='€'
                  formatted
                />
              </div>
            </div>
            <div className='flex flex-col items-center'>
              <h1 className='text-[24px] text-black-muted mb-6 w-[400px] text-center'>
                Vorteile für Standortgemeinde bei Verpachtung
              </h1>
              <div className='flex gap-6'>
                <ShowDetailsCard
                  number={10000}
                  description='Jährliche Einnahmen für die Standortgemeinde aus staatlichen Subventionen und Erlösbeteiligungen'
                  symbol='€'
                  formatted
                />
                <ShowDetailsCard
                  number={250000}
                  description='Summierte Einnahmen für die Standortgemeinde aus staatlichen Subventionen und Erlösbeteiligungen'
                  symbol='€'
                  formatted
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col border-[1px] border-gray-medium/60 rounded-lg mt-8 p-8'>
            <div className='flex justify-center'>
              <h1 className='text-[24px] text-black-muted w-[526px] text-center'>
                Vorteile für Klima und Energiesicherheit Deutschlands
              </h1>
            </div>
            <div className='flex justify-evenly mt-6'>
              <ShowDetailsCard
                number={2578}
                description='Haushalte mit Grünstrom versorgt'
                customDivStyle='!min-h-[148px]'
              />
              <ShowDetailsCard
                number={200}
                description='CO2 Einsparungen pro Jahr'
                symbol='kg'
                customDivStyle='!min-h-[148px]'
              />
              <ShowDetailsCard
                number={5000}
                description='CO2 Einsparungen nach 25 Jahren'
                symbol='kg'
                customDivStyle='!min-h-[148px]'
              />
            </div>
          </div>
        </div>
      </div>

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
