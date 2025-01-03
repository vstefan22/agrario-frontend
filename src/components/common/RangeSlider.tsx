import { Range, getTrackBackground } from 'react-range';
import { useState } from 'react';

interface rangeSliderTypes {
  title?: string;
  details?: string;
}

const RangeSlider = ({ title, details }: rangeSliderTypes) => {
  const [values, setValues] = useState([0.2, 200]);
  const STEP = 0.1;
  const MIN = 0;
  const MAX = 250;

  return (
    <div className='w-full h-[100px] px-4 text-[15px] flex flex-col rounded-[6px] mt-4'>
      <p className='text-[14px] text-black-muted mb-4 font-bold'>{title}</p>
      <div className='relative mt-4'>
        <Range
          step={STEP}
          min={MIN}
          max={MAX}
          values={values}
          onChange={(values) => setValues(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '5px',
                width: '100%',
                background: getTrackBackground({
                  values,
                  colors: ['#ccc', '#206F6A', '#ccc'],
                  min: MIN,
                  max: MAX,
                }),
                borderRadius: '4px',
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props, index }) => (
            <div
              {...props}
              className='relative flex items-center justify-center'
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-21px',
                  fontSize: '9px',
                  background: '#206F6A',
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  whiteSpace: 'nowrap',
                }}
              >
                {values[index]} ha
              </div>

              <div
                style={{
                  height: '18px',
                  width: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  border: '3px solid #7B9FF2',
                  boxShadow: '0px 2px 6px rgba(0,0,0,0.2)',
                }}
              ></div>
            </div>
          )}
        />
      </div>
      <p className='mt-3 text-[10px] text-gray-500'>{details}</p>
    </div>
  );
};

export default RangeSlider;
