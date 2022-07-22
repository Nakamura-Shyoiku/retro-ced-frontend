import React from 'react';
import { Route, Switch } from 'react-router-dom';
import requireAuth from './components/RequireAuth';
import track from './utils/withTracker';
import requireAdminAuth from './components/RequireAdminAuth';
import App from './scenes/App';

import Home from './scenes/Home';
import SpotlightDetail from './scenes/SpotlightDetail';
import Designers from './scenes/Designers';
import DesignersDetail from './scenes/DesignersDetail';
import Trending from './scenes/Trending';
import TrendingDetail from './scenes/TrendingDetail';
import Stores from './scenes/Stores';
import SearchRender from './components/SearchRender';
import Personal from './scenes/Personal';
import SignIn from './scenes/SignIn';
import Register from './scenes/Register';
import PasswordReset from './scenes/PasswordReset';
import SetNewPassword from './scenes/SetNewPassword';
import ProductsRender from './components/ProductsRender';
import PrivacyPolicy from './scenes/PrivacyPolicy';
import TermsConditions from './scenes/TermsConditions';
import Dmca from './scenes/Dmca';
import ContactUs from './scenes/ContactUs';
import EditorPick from './scenes/EditorPick';
import Partnerships from './scenes/Partnerships';
import OurStory from './scenes/OurStory';
import Blog from './scenes/Blog';
import Article from './scenes/Article';

// Admin panel
import AdminSites from './scenes/AdminSites';
import AdminEditSite from './scenes/AdminEditSite';
import Tracker from './scenes/Tracker';
import AdminPartnerAnalytics from './scenes/AdminPartnerAnalytics';
import AllProduct from './scenes/AllProduct';
import ApprovedProduct from './scenes/ApprovedProduct';
import UnapprovedProduct from './scenes/UnapprovedProduct';
import AdminEditProduct from './scenes/AdminEditProduct';
import FeaturedProducts from './scenes/FeaturedProducts';
import AdminUsers from './scenes/AdminUsers';

import PageNotFound from './scenes/PageNotFound';

export default class Routes extends React.Component {
  render() {
    return (
      <App>
        <Switch>
          <Route exact path="/" component={track(Home)} />
          <Route exact path="/designers" component={track(Designers)} />
          <Route exact path="/designersdetail/:brand" component={track(DesignersDetail)} />
          <Route exact path="/trending" component={track(Trending)} />
          <Route exact path="/trending/details/:postID" component={track(TrendingDetail)} />
          <Route exact path="/stores" component={track(Stores)} />
          <Route exact path="/search/:query" render={SearchRender} />
          <Route exact path="/products/:category/:sub_category?" render={ProductsRender} />
          <Route exact path="/signin" component={track(SignIn)} />
          <Route exact path="/register" component={track(Register)} />
          <Route exact path="/passwordreset" component={track(PasswordReset)} />
          <Route exact path="/set-new-password/:email/:token" component={track(SetNewPassword)} />
          <Route exact path="/blog" component={track(Blog)} />
          <Route exact path="/blog/article/:id" component={track(Article)} />
          <Route exact path="/personal" component={track(requireAuth(Personal))} />
          <Route exact path="/contact-us" component={track(ContactUs)} />
          <Route exact path="/admin/sites" component={requireAdminAuth(AdminSites)} />
          <Route exact path="/admin/site/:site_id" component={requireAdminAuth(AdminEditSite)} />
          <Route exact path="/admin/tracker" component={requireAdminAuth(Tracker)} />
          <Route exact path="/admin/partner/analytics" component={requireAdminAuth(AdminPartnerAnalytics)} />
          <Route exact path="/admin/allproducts" component={requireAdminAuth(AllProduct)} />
          <Route exact path="/admin/approvedproduct" component={requireAdminAuth(ApprovedProduct)} />
          <Route exact path="/admin/unapprovedproduct" component={requireAdminAuth(UnapprovedProduct)} />
          <Route exact path="/admin/product/:product_id" component={requireAdminAuth(AdminEditProduct)} />
          <Route exact path="/admin/featuredProducts/:type" component={requireAdminAuth(FeaturedProducts)} />
          <Route exact path="/admin/users" component={requireAdminAuth(AdminUsers)} />
          <Route exact path="/privacypolicy" component={track(PrivacyPolicy)} />
          <Route exact path="/termsconditions" component={track(TermsConditions)} />
          <Route exact path="/dmca" component={track(Dmca)} />
          <Route exact path="/spotlight/:postID" component={track(SpotlightDetail)} />
          <Route exact path="/editorpick/:index" component={track(EditorPick)} />
          <Route exact path="/partnerships" component={track(Partnerships)} />
          <Route exact path="/our-story" component={track(OurStory)} />
          <Route component={PageNotFound} />
        </Switch>
      </App>
    );
  }
}
