type TenderCriteriaTypes = {
  title: string;
  sonstiges: string;
  list: any;
};

const TenderCriteria = ({ title, sonstiges, list }: TenderCriteriaTypes) => {
  return (
    <div className='bg-white border-[1px] border-[#D9D9D9] p-6 rounded-2xl'>
      <h1 className='text-[32px] font-bold text-black-muted w-[80%] mb-4'>
        {title}
      </h1>

      <ul className='mb-6'>
        {/* {tenderCriteriaData.list.map((item, index) => (
          <li key={index} className='mb-4 flex items-center'>
            <img src={listIcon} alt='icon' />
            <span className='text-gray-dark-100 ml-2'>{item}</span>
          </li>
        ))} */}
        {list}
      </ul>

      <p className='font-semibold text-black-muted mb-1'>Sonstiges:</p>
      {/* <p className='text-gray-dark-100'>{tenderCriteriaData.sonstiges}</p> */}
      <p className='text-gray-dark-100'>{sonstiges}</p>
    </div>
  );
};

export default TenderCriteria;
