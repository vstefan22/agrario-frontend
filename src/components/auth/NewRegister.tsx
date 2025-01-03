import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import Checkbox from '../../components/common/Checkbox';
import Button from '../common/Button';

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
          className={`w-[400px] h-[370px] border-2 rounded-lg p-6 flex flex-col items-center justify-start cursor-pointer ${
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
          <h2 className='text-[24px] text-white font-bold mb-4'>Role - 1</h2>

          <div className='w-[120px] h-[120px] rounded-full bg-[rgba(255,255,255,0.3)] flex items-center justify-center mb-6'>
            <FaUserAlt
              className='text-white'
              style={{ width: '70px', height: '70px' }}
            />
          </div>

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
          className={`w-[400px] h-[370px] border-2 rounded-lg p-6 flex flex-col items-center justify-start cursor-pointer ${
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
          <h2 className='text-[24px] text-white font-bold mb-4'>Role - 2</h2>

          <div className='w-[120px] h-[120px] rounded-full bg-[rgba(255,255,255,0.3)] flex items-center justify-center mb-6'>
            <FaUserAlt
              className='text-white'
              style={{ width: '70px', height: '70px' }}
            />
          </div>

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
