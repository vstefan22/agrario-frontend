import imgPlaceholder from '../../assets/images/image-placeholder.png';

type ItemImageProps = {
  id: string;
  image?: string;
  className?: string;
};

function ItemImage({ id, image, className }: ItemImageProps) {
  return (
    <div
      className={`flex shadow-md w-[192px] border-gray-neutral rounded-xl flex-col justify-center items-center ${className}`}
    >
      {image && (
        <div className='mb-2 h-full w-full'>
          <img
            src={image || imgPlaceholder}
            width='100%'
            alt={'flurstuck image'}
            className='object-cover h-full rounded-tl-xl rounded-tr-xl'
          />
        </div>
      )}
      <div
        className={`${
          image ? 'flex items-center mb-3' : 'flex items-center flex-col'
        }`}
      >
        <h5 className='font-bold text-[16px] text-black-muted whitespace-nowrap mr-2'>
          {id || ''}
        </h5>
        <p className='text-[12px] text-gray-dark-100 font-400'>ID-Nummer</p>
      </div>
    </div>
  );
}

export default ItemImage;
