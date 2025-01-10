const NotFound = () => {
  return (
    <div className='h-screen flex mt-10 items-center flex-col gap-y-2'>
      <h1 className='text-black-muted text-4xl'>404 - Page Not Found :(</h1>
      <p className='text-gray-light-300 text-xl'>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
