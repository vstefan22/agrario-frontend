import { useState } from 'react';
import Accordion from '../components/common/Accordion';
import questionsHelpImg from '../assets/images/questions-help.png';
import { questionsHelpData } from '../../mockData';

function QuestionsHelp() {
  const [opened, setOpened] = useState<boolean[]>(
    questionsHelpData.map(() => false)
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
        {questionsHelpData.map((item, index) => (
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

export default QuestionsHelp;
