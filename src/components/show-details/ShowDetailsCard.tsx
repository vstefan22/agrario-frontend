type ShowDetailsCardTypes = {
  number: number;
  description: string;
  symbol?: string;
  formatted?: boolean;
  customDivStyle?: string;
};

const ShowDetailsCard = ({
  number,
  description,
  symbol = '',
  formatted = false,
  customDivStyle,
}: ShowDetailsCardTypes) => {
  const formattedNumber = new Intl.NumberFormat('de-DE').format(number);

  return (
    <div
      className={`${customDivStyle} border-[1px] border-gray-medium/60 flex flex-col items-center w-[240px] px-3 pt-6 min-h-[212px] rounded-md`}
    >
      <h1 className='text-black-muted text-[24px] mb-3'>
        {formatted ? formattedNumber : number} {symbol}
      </h1>
      <p className='text-gray-dark-100 text-[16px] w-full text-center'>
        {description}
      </p>
    </div>
  );
};

export default ShowDetailsCard;
