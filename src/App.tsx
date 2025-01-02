import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import ProtectedLayout from './layout/ProtectedLayout';
import NewRegister from './components/auth/NewRegister';
import Login from './components/auth/Login';
import RegisterRoleOne from './pages/role-one/Register';
import RegisterRoleTwo from './pages/role-two/Register';
import ProfileRoleOne from './pages/role-one/Profile';
import PasswordChange from './components/profile/PasswordChange';
import NewPlot from './pages/role-one/NewPlot';
import MyPlots from './pages/role-one/MyPlots';
import PlotDetails from './pages/role-one/PlotDetails';
import MyOffers from './pages/role-one/MyOffers';
import OfferDetails from './pages/role-one/OfferDetails';
import OfferPreparation from './pages/role-one/OfferPreparation';
import FriendInvite from './pages/role-one/FriendInvite';
import QuestionsHelp from './pages/role-one/QuestionsHelp';
import AnalysePlusCart from './pages/role-one/AnalysePlusCart';
import ThankYouOrderRequest from './pages/role-one/ThankYouOrderRequest';
import ThankYouMarketingRequest from './pages/role-one/ThankYouMarketingRequest';
import PlotsSearch from './pages/role-two/PlotsSearch';
import MyWatchlist from './pages/role-two/MyWatchlist';
import ActiveAuctions from './pages/role-two/ActiveAuctions';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/new-register' element={<NewRegister />} />
          <Route path='/register/role-one' element={<RegisterRoleOne />} />
          <Route path='/register/role-two' element={<RegisterRoleTwo />} />
          <Route
            path='/role-one/*'
            element={
              <ProtectedLayout>
                <Routes>
                  <Route path='/profile' element={<ProfileRoleOne />} />
                  <Route path='/password-change' element={<PasswordChange />} />
                  <Route path='/new-plot' element={<NewPlot />} />
                  <Route path='/my-plots' element={<MyPlots />} />
                  <Route
                    path='/my-plots/thank-you-order-request'
                    element={<ThankYouOrderRequest />}
                  />
                  <Route
                    path='/my-plots/thank-you-marketing-request'
                    element={<ThankYouMarketingRequest />}
                  />
                  <Route
                    path='/my-plots/analyse-plus'
                    element={<AnalysePlusCart />}
                  />
                  <Route path='/my-plots/details' element={<PlotDetails />} />
                  <Route
                    path='/my-plots/offer-preparation'
                    element={<OfferPreparation />}
                  />
                  <Route path='/my-offers' element={<MyOffers />} />
                  <Route path='/my-offers/details' element={<OfferDetails />} />
                  <Route path='/friend-invite' element={<FriendInvite />} />
                  <Route path='/questions-help' element={<QuestionsHelp />} />
                </Routes>
              </ProtectedLayout>
            }
          />
          <Route
            path='role-two/*'
            element={
              <ProtectedLayout>
                <Routes>
                  <Route path='/plots-search' element={<PlotsSearch />} />
                  <Route path='/my-watchlist' element={<MyWatchlist />} />
                  <Route path='/active-auctions' element={<ActiveAuctions />} />
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
