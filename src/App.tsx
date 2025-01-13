import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
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
import QuestionsHelpLandowner from './pages/landowner/QuestionsHelpLandowner';
import QuestionsHelpDeveloper from './pages/developer/QuestionsHelpDeveloper';
import AnalysePlusCart from './pages/landowner/AnalysePlusCart';
import ThankYouOrderRequest from './pages/landowner/ThankYouOrderRequest';
import ThankYouMarketingRequest from './pages/landowner/ThankYouMarketingRequest';
import PlotsSearch from './pages/developer/PlotsSearch';
import MyWatchlist from './pages/developer/MyWatchlist';
import ActiveAuctions from './pages/developer/ActiveAuctions';
import ThankYouSubscribe from './pages/developer/ThankYouSubscribe';
import Support from './pages/Support';
import StartLandowner from './pages/landowner/Start';
import StartDeveloper from './pages/developer/Start';
import ParcelDetails from './pages/developer/ParcelDetails';
import Messages from './pages/Messages';
import AuctionDetails from './pages/developer/AuctionDetails';
import PlaceABid from './pages/developer/PlaceABid';
import ThankYouInterest from './pages/developer/ThankYouInterest';
import MyAuctions from './pages/developer/MyAuctions';
import MyAuctionDetails from './pages/developer/MyAuctionDetails';
import Redirect from './components/navigation/Redirect';
import NotFound from './pages/NotFound';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path='/'
            element={
              <Redirect>
                <Login />
              </Redirect>
            }
          />
          <Route
            path='/new-register'
            element={
              <Redirect>
                <NewRegister />
              </Redirect>
            }
          />
          <Route
            path='/register/landowner'
            element={
              <Redirect>
                <RegisterLandowner />
              </Redirect>
            }
          />
          <Route
            path='/register/developer'
            element={
              <Redirect>
                <RegisterDeveloper />
              </Redirect>
            }
          />
          <Route
            path='/landowner/*'
            element={
              <ProtectedLayout>
                <Routes>
                  <Route path='/profile' element={<ProfileLandowner />} />
                  <Route path='/password-change' element={<PasswordChange />} />
                  <Route path='/messages' element={<Messages />} />
                  <Route path='' element={<StartLandowner />} />
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
                  <Route
                    path='/questions-help'
                    element={<QuestionsHelpLandowner />}
                  />
                  <Route path='/support' element={<Support />} />
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </ProtectedLayout>
            }
          />
          <Route
            path='developer/*'
            element={
              <ProtectedLayout>
                <Routes>
                  <Route path='/messages' element={<Messages />} />
                  <Route path='/profile' element={<ProfileDeveloper />} />
                  <Route path='/password-change' element={<PasswordChange />} />
                  <Route
                    path='/profile/subscribe'
                    element={<ThankYouSubscribe />}
                  />
                  <Route path='' element={<StartDeveloper />} />
                  <Route path='/plots-search' element={<PlotsSearch />} />
                  <Route
                    path='/plots-search/parcel-details'
                    element={<ParcelDetails />}
                  />
                  <Route path='/my-watchlist' element={<MyWatchlist />} />
                  <Route path='/active-auctions' element={<ActiveAuctions />} />
                  <Route
                    path='active-auctions/details'
                    element={<AuctionDetails />}
                  />
                  <Route
                    path='active-auctions/place-a-bid'
                    element={<PlaceABid />}
                  />
                  <Route
                    path='active-auctions/thanks'
                    element={<ThankYouInterest />}
                  />
                  <Route path='my-auctions' element={<MyAuctions />} />
                  <Route
                    path='my-auctions/details'
                    element={<MyAuctionDetails />}
                  />
                  <Route
                    path='/questions-help'
                    element={<QuestionsHelpDeveloper />}
                  />
                  <Route path='/support' element={<Support />} />
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </ProtectedLayout>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <ToastContainer
          position='top-center'
          autoClose={7500}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
        />
      </Layout>
    </Router>
  );
};

export default App;
