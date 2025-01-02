import DetailsList from '../../components/meine-angebote/DetailsList';
import { detailsData } from '../../../mockData';
import DatePicker from '../../components/common/DatePicker';
import { useState } from 'react';
import Select from '../../components/common/Select';
import { defaultOptions } from '../../types/select-options';
import Checkbox from '../../components/common/Checkbox';
import TextArea from '../../components/common/TextArea';
import UploadFile from '../../components/common/UploadFile';
import Button from '../../components/common/Button';


const initialFormData = {
    availableDate: null as Date | null,
    select1: null as string | null,
    select2: null as string | null,
    select3: null as string | null,
}

const Details = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState<Record<string, string>>({});


    const handleDateChange = (date: Date | null) => {
        setFormData((prev) => ({
            ...prev,
            availableDate: date,
        }));
        if (errors.availableDate) {
            setErrors((prev) => ({
                ...prev,
                availableDate: '',
            }));
        }
    };

    const handleOnEdit = () => {
        console.log('edit clicked.');
    };

    const handleSelectChange = () => {
        console.log("select clicked.")
    }


    return (
        <div className='bg-gray-lightest min-h-screen flex flex-col px-7 p-4'>
            <h1 className='text-[32px] font-bold text-black-muted mb-4'>Detailansicht Angebot</h1>
            <DetailsList data={detailsData} />

            <h1 className='text-black-muted text-[32px] mt-8'>Ihre Kriterien</h1>
            <p className='text-gray-dark-100 w-[40%]'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
            <div className='mt-8 grid grid-cols-2 gap-y-12 w-[70%]'>
                <DatePicker
                    label='Grundstück verfügbarab'
                    required
                    value={formData.availableDate}
                    onChange={handleDateChange}
                    placeholder='DD/MM/YY'
                    onEdit={handleOnEdit}
                />
                {errors.availableDate && (
                    <span className='text-red-500 text-sm'>
                        {errors.availableDate}
                    </span>
                )}
                <Select
                    name='select1'
                    label='Sind Sie offen für Verpachtung oder für Verkauf'
                    required
                    onEdit={handleOnEdit}
                    onChange={handleSelectChange}
                    options={defaultOptions}
                    value="" // need to work on this
                />
                <Select
                    name='select2'
                    label='Regionalität des Projektentwicklers*'
                    required
                    onEdit={handleOnEdit}
                    onChange={handleSelectChange}
                    options={defaultOptions}
                    value="" // need to work on this
                />
                <Select
                    name='select3'
                    label='Sind Sie offen für Verpachtung oder für Verkauf*'
                    required
                    onEdit={handleOnEdit}
                    onChange={handleSelectChange}
                    options={defaultOptions}
                    value="" // need to work on this
                />
            </div>

            <div className='mt-8 text-primary text-[16px] space-y-6'>
                <p>Wollen Sie einzelne Nutzungsmöglichkeiten für Ihr Grundstück ausschließen?</p>
                <div className='grid grid-cols-2 gap-y-4 w-[60%]'>
                    <Checkbox
                        label='Keine Auschluss von Nutzungsmöglichkeiten'
                        variant='primary' />
                    <Checkbox
                        label='Keine Nutzung von Windenergie'
                        variant='primary' />
                    <Checkbox
                        label='Keine Nutzung von Solarenergie'
                        variant='primary' />
                    <Checkbox
                        label='Keine Nutzung von Energiespeicher'
                        variant='primary' />
                    <Checkbox
                        label='Keine Nutzung für ökologische Aufwertungen'
                        variant='primary' />
                </div>
            </div>


            <div className='mt-8 space-y-6'>
                <p className='text-black-muted text-[16px] w-[524px]'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
                <TextArea
                    placeholder="Ihre Nachricht an uns"
                // should add functionallity
                />
                <UploadFile />

                <Checkbox
                    label='Ja, ich bestätige Eigentümer des Grundstückes oder von den Eigentümern beauftragt oder mandatiert zu sein .'
                    variant='primary'
                    labelClassName='w-full'
                />
                <Checkbox
                    label='Ja, ich akzeptiere die Datenschutzbedingungen'
                    variant='primary' />
                <Checkbox
                    label='Ja, ich akzeptiere die AGBs'
                    variant='primary' />
                <Checkbox
                    label='Ja, ich.......'
                    variant='primary' />
            </div>

            <div className='flex gap-x-6 mt-8 ml-auto'>
                <Button
                    variant='blueSecondary'>Abbrechen</Button>
                <Button
                    variant='blueSecondary'
                    className='w-[306px]'>Vermarktungsanfrage absenden</Button>
                <Button
                    variant='bluePrimary'
                    className='w-[306px]'>Vermarktungsanfrage zurückziehen</Button>
            </div>
        </div>
    );
}

export default Details;