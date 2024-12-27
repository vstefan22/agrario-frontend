import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import ProtectedLayout from './layout/ProtectedLayout';
import NewRegister from './components/auth/NewRegister';
import Register from './components/auth/Register';
import NeuesFlurstuck from './pages/NeuesFlurstuck';
import MeineFlurstucke from './pages/MeineFlurstucke';
import MeineAngebote from './pages/MeineAngebote';
import EinenFreundEinladen from './pages/EinenFreundEinladen';
import FragenHilfe from './pages/FragenHilfe';
import Profile from './pages/Profile';

const App = () => {
  return (
    <Router>
      <div className='app-container'>
        <Layout>
          <Routes>
            <Route path='/new-register' element={<NewRegister />} />
            <Route path='/register' element={<Register />} />
            <Route
              path='*'
              element={
                <ProtectedLayout>
                  <Routes>
                    <Route path='/profile' element={<Profile />} />
                    <Route
                      path='/neues-flurstuck'
                      element={<NeuesFlurstuck />}
                    />
                    <Route
                      path='/meine-flurstucke'
                      element={<MeineFlurstucke />}
                    />
                    <Route path='/meine-angebote' element={<MeineAngebote />} />
                    <Route
                      path='/einen-freund-einladen'
                      element={<EinenFreundEinladen />}
                    />
                    <Route path='/fragen-hilfe' element={<FragenHilfe />} />
                  </Routes>
                </ProtectedLayout>
              }
            />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
};

export default App;
