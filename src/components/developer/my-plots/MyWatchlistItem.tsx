import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DynamicTable from '../../common/DynamicTable';
import Button from '../../common/Button';
import ItemImage from '../../common/ItemImage';
import useRegisteredPlots from '../../../hooks/registered-plot-hook';
import useRegisteredPlotStore from '../../../store/registered-plot-store';
import { RegisteredPlotDetailsType } from '../../../types/plot-types';
import { PLOT_SEARCH_COLUMNS } from '../../../constants/table-data';
import delIcon from '../../../assets/images/del.png';
import parcelPlaceholder from '../../../assets/images/parcel-placeholder.webp';
import { showRestrictions } from '../../../utils/helper-functions';
import useAuthStore from '../../../store/auth-store';

type MyWatchlistItemProps = {
  data: RegisteredPlotDetailsType;
};

const MyWatchlistItem: FC<MyWatchlistItemProps> = ({ data }) => {
  const navigate = useNavigate();
  const { deletePlotFromWatchlist, getRegisteredPlotDetails } =
    useRegisteredPlots();
  const {
    removeMyRegisteredPlot,
    removeRegisteredPlotFromMyList,
    setRegisteredPlot,
  } = useRegisteredPlotStore();
  const { user } = useAuthStore();

  const handleDeletePlot = async () => {
    const plotId = data.parcel.id.toString();
    try {
      await deletePlotFromWatchlist(plotId);
      removeMyRegisteredPlot(plotId);
      removeRegisteredPlotFromMyList(plotId);
      toast.success(
        'Das Flurstück wurde erfolgreich aus der Beobachtungsliste entfernt'
      );
    } catch (err) {
      console.error(err);
      toast.error('Das Flurstück wurde nicht erfolgreich gelöscht');
    }
  };

  const handleViewDetails = async () => {
    try {
      const plotDetails = await getRegisteredPlotDetails(
        data.parcel.id.toString()
      );
      setRegisteredPlot(plotDetails);
      navigate('/developer/registered-plots/parcel-details');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className='w-full bg-white rounded-[18px] p-4 mb-6'
      style={{
        boxShadow: '6px 6px 54px 0px #0000000D',
        minHeight: '250px',
      }}
    >
      <div className='flex w-full py-2 space-x-8'>
        <ItemImage id={data.parcel.id.toString()} image={parcelPlaceholder} />
        <div className='flex flex-col justify-center w-full gap-y-8'>
          <div className='flex justify-between'>
            <DynamicTable
              data={data.parcel}
              columns={PLOT_SEARCH_COLUMNS}
              blurKeys={
                user?.tier === 'FREE'
                  ? [
                      'zipcode',
                      'municipality_name',
                      'communal_district',
                      'cadastral_area',
                      'cadastral_parcel',
                    ]
                  : []
              }
            />
            <button onClick={handleDeletePlot}>
              <div className='border-[1.12px] border-gray-blue-light rounded-[50%] p-[11px] flex'>
                <img src={delIcon} alt='Delete Icon' className='min-w-[14px]' />
              </div>
            </button>
          </div>
          <div className='flex justify-between'>
            <div>{showRestrictions(data)}</div>
            <Button
              type='button'
              variant='bluePrimary'
              className='w-[200px]'
              onClick={handleViewDetails}
            >
              Detail ansehen
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWatchlistItem;
