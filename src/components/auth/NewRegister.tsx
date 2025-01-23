import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Checkbox from '../../components/common/Checkbox';
import Button from '../common/Button';
import farmerImg from '../../assets/images/farmer.webp';
import businessImg from '../../assets/images/business.webp';

export default function NewRegister() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleSubmit = () => {
    if (selectedRole === 'landowner') {
      navigate('/register/landowner');
    }
    if (selectedRole === 'developer') {
      navigate('/register/developer');
    }
  };

  return (
    <div className='bg-primary h-full flex flex-col items-center justify-center px-4'>
      <h1 className='text-[46px] font-bold mb-8 text-white'>
        Neue Registrierung
      </h1>

      <div className='w-full max-w-[900px] grid grid-cols-1 md:grid-cols-2 gap-1 mb-8 justify-items-center'>
        <div
          className={`w-[400px] h-full border-2 rounded-lg p-6 flex flex-col items-center justify-start cursor-pointer ${
            selectedRole === 'landowner'
              ? 'bg-white/15 border-[rgba(255,255,255,0.5)]'
              : 'bg-white/10 border-[rgba(255,255,255,0.06)]'
          } hover:bg-[rgba(255,255,255,0.15)] transition-all`}
          onClick={() => handleRoleSelect('landowner')}
          role='button'
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleRoleSelect('landowner');
            }
          }}
          aria-pressed={selectedRole === 'landowner'}
        >
          <h2 className='text-[24px] text-white font-bold mb-4'>
            Grundeigentümer
          </h2>

          <img
            src={farmerImg}
            alt='farmer image'
            className='rounded-md mb-4 h-[224px] w-[340px]'
          />

          <Checkbox
            label='Ich bin Eigentümer/Verwalter von Grundstücken'
            checked={selectedRole === 'landowner'}
            readOnly
            labelClassName='justify-center'
          />

          <p className='text-sm text-white mt-4 text-center w-full'>
            z.B Privateigentümer, Landwirte, Kommunen, Stiftungen
          </p>
        </div>

        <div
          className={`w-[400px] h-full border-2 rounded-lg p-6 flex flex-col items-center justify-start cursor-pointer ${
            selectedRole === 'developer'
              ? 'bg-white/15 border-[rgba(255,255,255,0.5)]'
              : 'bg-white/10 border-[rgba(255,255,255,0.06)]'
          } hover:bg-[rgba(255,255,255,0.15)] transition-all`}
          onClick={() => handleRoleSelect('developer')}
          role='button'
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleRoleSelect('developer');
            }
          }}
          aria-pressed={selectedRole === 'developer'}
        >
          <h2 className='text-[24px] text-white font-bold mb-4'>
            Projektentwickler
          </h2>

          <img
            src={businessImg}
            alt='business image'
            className='rounded-md mb-4 h-[224px] w-[340px]'
          />

          <Checkbox
            label='Ich suche geeignete Grundstücke'
            checked={selectedRole === 'developer'}
            readOnly
            labelClassName='justify-center'
          />

          <p className='text-sm text-white mt-4 text-center w-full'>
            z.B Projektentwickler, Energieunternehmen, Ökologische Aufwertungen
          </p>
        </div>
      </div>

      <div className='flex justify-center space-x-4'>
        <Button type='button' variant='secondary' onClick={() => navigate('/')}>
          Abbrechen
        </Button>

        <Button
          type='button'
          variant='primary'
          disabled={!selectedRole}
          onClick={handleSubmit}
        >
          {'Weiter'}
        </Button>
      </div>
    </div>
  );
}
