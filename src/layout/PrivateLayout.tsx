import Sidebar from '../components/navigation/Sidebar';

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col h-screen'>
      <div className='flex flex-1 overflow-hidden'>
        <div className='w-[230px] bg-white shadow-md h-full'>
          <Sidebar />
        </div>
        <main className='flex-1 overflow-auto'>{children}</main>
      </div>
    </div>
  );
};

export default PrivateLayout;
