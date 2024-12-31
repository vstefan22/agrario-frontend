import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import ProtectedLayout from './layout/ProtectedLayout';
import NewRegister from './components/auth/NewRegister';
import Register from './pages/role-one/Register';
import Register2 from './pages/role-two/Register';
import NeuesFlurstuck from './pages/role-one/NeuesFlurstuck';
import MeineFlurstucke from './pages/role-one/MeineFlurstucke';
import FlurstuckDetails from './pages/role-one/FlurstuckDetails';
import EinenFreundEinladen from './pages/role-one/EinenFreundEinladen';
import OfferPreparation from './pages/role-one/OfferPreparation';
import FragenHilfe from './pages/role-one/FragenHilfe';
import Profile from './pages/role-one/Profile';
import PasswordChange from './components/profile/PasswordChange';
import WarenkorbAnalysePlus from './pages/role-one/WarenkorbAnalysePlus';
import VielenDankfurIhreBestellung from './pages/role-one/VielenDankFurIhreBestellung';
import ThankYouMarketing from './pages/role-one/ThankYouMarketing';
import MyOffers from './pages/role-one/MyOffers';


const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/new-register' element={<NewRegister />} />
          <Route path='/register' element={<Register />} />
          <Route path='/register2' element={<Register2 />} />
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
                  <Route path="/meine-flurstucke/vielen-dank" element={<VielenDankfurIhreBestellung />} />
                  <Route path="/meine-flurstucke/vielen-dank-marketing" element={<ThankYouMarketing />} />
                  <Route path='/meine-flurstucke/analyse-plus' element={<WarenkorbAnalysePlus />} />
                  <Route
                    path='/meine-flurstucke/details'
                    element={<FlurstuckDetails />}
                  />
                  <Route path='/meine-angebote' element={<MyOffers />} />
                  <Route
                    path='/meine-flurstucke/offer-preparation'
                    element={<OfferPreparation />}
                  />
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
