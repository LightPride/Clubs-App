import CataloguePage from '../../../pages/cataloguePage.js';
import ClientFormPage from '../../../pages/clientFormPage.js';
import ClientsPage from '../../../pages/clientsPage.js';
import ClubItemPage from '../../../pages/clubItemPage.js';
import ClubsFormPage from '../../../pages/clubsFormPage.js';
import HomePage from '../../../pages/homePage.js';
import NotFoundPage from '../../../pages/notFoundPage.js';

var Router = {
  routes: [],
  notFoundRoute: null,
  init: function (parentNode) {
    window.addEventListener('hashchange', this.route.bind(this, parentNode));
    this.route(parentNode);
    return parentNode;
  },
  route: function (parentNode) {
    var hash = window.location.hash.slice(1);
    var parts = hash.split('/');

    for (var i = 0; i < this.routes.length; i++) {
      var match = this.matchRoute(parts, this.routes[i]);
      if (match) {
        parentNode.html(this.routes[i].callback.apply(null, match.params));

        return;
      }
    }
    if (this.notFoundRoute) {
      parentNode.html(this.notFoundRoute.callback());
    }
  },

  matchRoute: function (parts, route) {
    var routeParts = route.path.split('/');

    if (routeParts.length !== parts.length) {
      return null;
    }

    var params = [];
    for (var i = 0; i < routeParts.length; i++) {
      if (routeParts[i].charAt(0) === ':') {
        params.push(parts[i]);
      } else if (routeParts[i] !== parts[i]) {
        return null;
      }
    }
    return { params: params };
  },

  register: function (path, callback) {
    if (path === 'not-found') {
      this.notFoundRoute = { path: path, callback: callback };
    } else {
      this.routes.push({ path: path, callback: callback });
    }
  },
};

Router.register('', HomePage);
Router.register('clubs', CataloguePage);
Router.register('clubs/create', ClubsFormPage);
Router.register('clubs/:id', ClubItemPage);
Router.register('clubs/:id/update', ClubsFormPage);
Router.register('clubs/:id/clients', ClientsPage);
Router.register('clubs/:id/clients/create', ClientFormPage);
Router.register('clubs/:id/clients/:clientId/update', ClientFormPage);
Router.register('not-found', NotFoundPage);

export default Router;
