import { BrowserRouter } from 'react-router-dom';

const BrowserRouterWrapper = ({ children }: { children: React.ReactNode }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default BrowserRouterWrapper;
