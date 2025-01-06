import Input from "../common/Input";
import Button from "../common/Button";

type SearchByAttributesProps = {
    formData: {
        municipal: string;
        gemarkung: string;
        flur: string;
        flurstuck: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    resetFields: () => void;
};

const SearchByAttributes = ({ formData, handleChange, handleSubmit, resetFields }: SearchByAttributesProps) => {
    return (
        <div
            className='w-full bg-white rounded-[18px] p-8'
            style={{ boxShadow: '6px 6px 54px 0px #0000000D' }}
        >
            <h2 className='text-black text-[40px] leading-[48px] mb-2'>
                Search by Parcel Attributes
            </h2>
            <p className='text-gray-dark-100 text-[20px] leading-[24px] font-normal mb-7'>
                Enter municipal, gemarkung, Flur, and Flurstück
            </p>

            <form
                onSubmit={handleSubmit}
                className='grid grid-cols-1 md:grid-cols-4 gap-6'
            >
                <div className='md:col-span-2'>
                    <Input
                        variant='profile'
                        label='Municipal'
                        required
                        id='municipal'
                        name='municipal'
                        placeholder='Enter Municipal'
                        value={formData.municipal}
                        onChange={handleChange}
                    />
                </div>
                <div className='md:col-span-2'>
                    <Input
                        variant='profile'
                        label='Gemarkung'
                        required
                        id='gemarkung'
                        name='gemarkung'
                        placeholder='Enter Gemarkung'
                        value={formData.gemarkung}
                        onChange={handleChange}
                    />
                </div>
                <div className='md:col-span-2'>
                    <Input
                        variant='profile'
                        label='Flur'
                        required
                        id='flur'
                        name='flur'
                        placeholder='Enter Flur'
                        value={formData.flur}
                        onChange={handleChange}
                    />
                </div>
                <div className='md:col-span-2'>
                    <Input
                        variant='profile'
                        label='Flurstück'
                        required
                        id='flurstuck'
                        name='flurstuck'
                        placeholder='Enter Flurstück'
                        value={formData.flurstuck}
                        onChange={handleChange}
                    />
                </div>

                <div className='md:col-span-4 flex justify-end space-x-4'>
                    <Button
                        variant='blueSecondary'
                        type='button'
                        onClick={() => resetFields()}
                    >
                        Abbrechen
                    </Button>

                    <Button variant='bluePrimary' type='submit'>
                        Search
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SearchByAttributes;