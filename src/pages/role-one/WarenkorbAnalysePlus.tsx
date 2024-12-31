import Button from "../../components/common/Button";
import WarenkorbAnalysePlusList from "../../components/maine-flurstucke/WarenkorbAnalysePlusList";
import { warenkorbAnalysePlusData } from "../../../mockData";
import { useNavigate } from "react-router-dom";


const WarenkorbAnalysePlus = () => {
    const navigate = useNavigate();

    const handleAddParcel = () => {
        console.log("Parcel Handler");
    }

    const handleSendCode = () => {
        console.log("Send Gutschein-Code");
    }

    const handleReturnBack = () => {
        navigate("/meine-flurstucke");
    }


    return (
        <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
            <h1 className='text-[32px] font-bold text-black-muted'>
                Warenkorb Analyse PLUS
            </h1>
            <p className="text-[16px] text-gray-dark-100 mt-2">There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form.
            </p>
            <div className="flex justify-between mb-4">
                <h2 className="font-bold mt-4 text-[18px]">Sie haben folgende Flurstucke zur Prufung ausgewahlt</h2>
                <Button type='button'
                    variant='bluePrimary'
                    onClick={handleAddParcel}
                    className="w-[280px] h-[48px]">Weitere Flurstucke hinzufugen</Button>
            </div>



            <WarenkorbAnalysePlusList data={warenkorbAnalysePlusData} isEnable />


            <div className="flex justify-between my-8">
                <div className="mt-auto flex gap-6">
                    <Button type='button'
                        variant='blueSecondary'
                        onClick={handleReturnBack}
                        className="w-[280px] h-[48px]">Weitere Flurstucke hinzufugen</Button>
                    <Button type='button'
                        variant='bluePrimary'
                        onClick={handleAddParcel}
                        className="w-[280px] h-[48px]">Weitere Flurstucke hinzufugen</Button>
                </div>
                <div className="bg-white rounded-xl shadow-md px-6 py-4 text-right flex flex-col gap-4 text-gray-dark-200">
                    <div className="flex justify-end">
                        <p className="mr-1">Number of Items:</p>
                        <p className="font-semibold">3</p>
                    </div>
                    <div className="flex justify-end">
                        <p className="mr-1">Cost per Item:</p>
                        <p className="font-semibold">199,00 €</p>
                    </div>
                    <div className="flex justify-end">
                        <p className="mr-1">Sum of items:</p>
                        <p className="font-semibold">597,00 €</p>
                    </div>
                    <div className="flex justify-end">
                        <p className="mr-1">Tax in percent:</p>
                        <p className="font-semibold">19% MWSt</p>
                    </div>
                    <div className="flex justify-end">
                        <p className="mr-1">Tax amount:</p>
                        <p className="font-semibold">113,34 €</p>
                    </div>
                    <div className="flex justify-end text-[14px]">
                        <p className="mr-1">Subtotal:</p>
                        <p className="font-semibold">711,34 €</p>
                    </div>

                    <div className="flex justify-end items-center max-[746px]:flex-col max-[746px]:items-end">
                        <h3 className="mr-6">Rabattcode einisen</h3>
                        <div className="flex">
                            <input type="text" placeholder="Gutschein-Code" className="border-[1px] border-r-0 py-1 px-2 rounded-l-md border-gray-medium/60" />
                            <Button type='button'
                                variant='bluePrimary'
                                onClick={handleSendCode}
                                className="w-[94px] h-[24px] text-[16px]">Confirm</Button>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <p className="mr-1">Total:</p>
                        <p className="font-semibold">711,34 €</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WarenkorbAnalysePlus;