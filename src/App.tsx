import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import ProtectedLayout from './layout/ProtectedLayout';
import NewRegister from './components/auth/NewRegister';
import Register from './components/auth/Register';
import NeuesFlurstuck from './pages/role-one/NeuesFlurstuck';
import MeineFlurstucke from './pages/role-one/MeineFlurstucke';
import MeineAngebote from './pages/role-one/MeineAngebote';
import EinenFreundEinladen from './pages/role-one/EinenFreundEinladen';
import FragenHilfe from './pages/role-one/FragenHilfe';
import Profile from './pages/role-one/Profile';
import PasswordChange from './components/profile/PasswordChange';
import WarenkorbAnalysePlus from './pages/role-one/WarenkorbAnalysePlus';

const App = () => {
  return (
    <Router>
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
                    path='/profile/password-change'
                    element={<PasswordChange />}
                  />
                  <Route path='/neues-flurstuck' element={<NeuesFlurstuck />} />
                  <Route
                    path='/meine-flurstucke'
                    element={<MeineFlurstucke />}
                  />

                  <Route path='/meine-flurstucke/analyse-plus' element={<WarenkorbAnalysePlus />} />

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
    </Router>
  );
};

export default App;
