import { useState } from 'react';
import Accordion from '../../components/common/Accordion';
import { QUESTION_HELP_LANDOWNER_DATA } from '../../constants/questions-help';
import questionsHelpImg from '../../assets/images/sheeps.jpg';

function QuestionsHelpLandowner() {
  const [opened, setOpened] = useState<boolean[]>(
    QUESTION_HELP_LANDOWNER_DATA.map(() => false)
  );

  const toggleQuestionsHelp = (index: number) => {
    setOpened((prev) => {
      const updatedOpened = [...prev];
      updatedOpened[index] = !updatedOpened[index];
      return updatedOpened;
    });
  };

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col px-7 pt-4'>
      <h1 className='text-[32px] font-bold text-black-muted mb-6'>
        Fragen & Hilfe
      </h1>
      <div className='mb-6'>
        <img
          src={questionsHelpImg}
          alt='Fragen Hilfe Img'
          className='w-full h-[280px] object-cover rounded-t-3xl'
        />
      </div>

      <div className='gap-[24px]'>
        {QUESTION_HELP_LANDOWNER_DATA.map((item, index) => (
          <Accordion
            key={index}
            item={item}
            opened={opened}
            toggleButton={toggleQuestionsHelp}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default QuestionsHelpLandowner;
