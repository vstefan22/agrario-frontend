import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import ProtectedLayout from './layout/ProtectedLayout';
import NewRegister from './components/auth/NewRegister';
import Login from './components/auth/Login';
import RegisterLandowner from './pages/landowner/Register';
import RegisterDeveloper from './pages/developer/Register';
import ProfileLandowner from './pages/landowner/Profile';
import ProfileDeveloper from './pages/developer/Profile';
import PasswordChange from './components/profile/PasswordChange';
import NewPlot from './pages/landowner/NewPlot';
import MyPlots from './pages/landowner/MyPlots';
import PlotDetails from './pages/landowner/PlotDetails';
import MyOffers from './pages/landowner/MyOffers';
import OfferDetails from './pages/landowner/OfferDetails';
import OfferPreparation from './pages/landowner/OfferPreparation';
import FriendInvite from './pages/landowner/FriendInvite';
import QuestionsHelp from './pages/landowner/QuestionsHelp';
import AnalysePlusCart from './pages/landowner/AnalysePlusCart';
import ThankYouOrderRequest from './pages/landowner/ThankYouOrderRequest';
import ThankYouMarketingRequest from './pages/landowner/ThankYouMarketingRequest';
import PlotsSearch from './pages/developer/PlotsSearch';
import MyWatchlist from './pages/developer/MyWatchlist';
import ActiveAuctions from './pages/developer/ActiveAuctions';
import ThankYouSubscribe from './pages/developer/ThankYouSubscribe';
import Support from './pages/landowner/Support';
import StartLandowner from './pages/landowner/Start';
import StartDeveloper from './pages/developer/Start';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/new-register' element={<NewRegister />} />
          <Route path='/register/landowner' element={<RegisterLandowner />} />
          <Route path='/register/developer' element={<RegisterDeveloper />} />
          <Route
            path='/landowner/*'
            element={
              <ProtectedLayout>
                <Routes>
                  <Route path='/profile' element={<ProfileLandowner />} />
                  <Route path='/password-change' element={<PasswordChange />} />
                  <Route path='/' element={<StartLandowner />} />
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
                  <Route path='/support' element={<Support />} />
                </Routes>
              </ProtectedLayout>
            }
          />
          <Route
            path='developer/*'
            element={
              <ProtectedLayout>
                <Routes>
                  <Route path='/profile' element={<ProfileDeveloper />} />
                  <Route path='/profile/subscribe' element={<ThankYouSubscribe />} />
                  <Route path='/' element={<StartDeveloper />} />
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
