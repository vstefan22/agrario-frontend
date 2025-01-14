import Button from '../common/Button';
import CheckCircleImg from '../../assets/images/check-circle.png';
import infoIcon from '../../assets/images/info.png';

type FeatureType = {
  text: string;
  info?: boolean;
};

type PackageCardProps = {
  title: string;
  price: number | string;
  plan?: string;
  description?: string;
  features: FeatureType[];
  buttonText: string;
  isActive?: boolean;
  onClick: () => void;
  activePlan?: boolean;
};

const PackageCard: React.FC<PackageCardProps> = ({
  title,
  price,
  plan,
  description,
  features,
  buttonText,
  isActive = false,
  onClick,
  activePlan = false,
}) => {
  const addClass = typeof price === 'string' ? 'mb-3' : '';

  return (
    <div className='border-[1px] rounded-md p-6 shadow-md h-max w-[284px] border-gray-medium'>
      <p className='text-[14px] text-blue-muted'>{title}</p>

      <div className='flex items-end my-5'>
        <p
          className={`text-[48px] font-semibold text-blue-muted leading-[44px] ${addClass}`}
        >
          {typeof price === 'number' ? `€${price}` : price}
        </p>
        <p className='text-[12px] mb-4 ml-4 text-gray-light-300'>{plan}</p>
      </div>

      <p className='text-gray-light-300 mt-4 text-[12px]'>{description}</p>
      <hr className='my-6 border-gray-medium' />

      <ul className='space-y-[0.9rem] text-gray-700'>
        {features.map((feature, index) => (
          <li key={index} className='flex items-center gap-2'>
            <span>
              <img
                src={CheckCircleImg}
                alt='Check Circle'
                className='w-[16px] h-[16px]'
              />
            </span>
            <span className='text-blue-muted text-[12px] flex items-center'>
              {feature.text}{' '}
              {feature.info && (
                <span>
                  <img
                    src={infoIcon}
                    alt='Info Icon'
                    className='w-[12px] h-[12px] ml-[0.4rem] cursor-pointer'
                  />
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>

      {isActive ? (
        <Button
          type='button'
          variant='bluePrimary'
          className='mt-8'
          onClick={onClick}
          disabled={activePlan}
        >
          {buttonText}
        </Button>
      ) : (
        <Button
          type='button'
          variant='blueSecondary'
          className='mt-8 !text-blue-muted'
          onClick={onClick}
          disabled={activePlan}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default PackageCard;
