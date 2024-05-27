import Header from './components/Header/header.js';
import CataloguePage from './pages/cataloguePage.js';
import ClientFormPage from './pages/clientFormPage.js';
import ClientsPage from './pages/clientsPage.js';
import ClubItemPage from './pages/clubItemPage.js';
import ClubsFormPage from './pages/clubsFormPage.js';

$('#app').prepend(Header()).append($('<main id="main"></main>'));

var Router = {
  routes: [],
  init: function () {
    window.addEventListener('hashchange', this.route.bind(this));
    this.route();
  },
  route: function () {
    var hash = window.location.hash.slice(1);
    var parts = hash.split('/');

    for (var i = 0; i < this.routes.length; i++) {
      var match = this.matchRoute(parts, this.routes[i]);
      if (match) {
        this.routes[i].callback.apply(null, match.params);
        return;
      }
    }

    console.log('Route not found.');
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
    this.routes.push({ path: path, callback: callback });
  },
};

function homeRoute() {
  $('#main').html('Welcome to ClubsApp');
}

function catalogueRoute() {
  $('#main').html(CataloguePage());
}

function createClubRoute() {
  $('#main').html(ClubsFormPage());
}

function viewClubRoute(clubId) {
  $('#main').html(ClubItemPage(clubId));
}

function updateClubRoute(clubId) {
  $('#main').html(ClubsFormPage(clubId));
}

function viewClientsRoute(clubId) {
  $('#main').html(ClientsPage(clubId));
}

function createClientRoute(clubId) {
  $('#main').html(ClientFormPage(clubId));
}

function updateClientRoute(clubId, clientId) {
  $('#main').html(ClientFormPage(clubId, clientId));
}

Router.register('', homeRoute);
Router.register('clubs', catalogueRoute);
Router.register('clubs/create', createClubRoute);
Router.register('clubs/:id', viewClubRoute);
Router.register('clubs/:id/update', updateClubRoute);
Router.register('clubs/:id/clients', viewClientsRoute);
Router.register('clubs/:id/clients/create', createClientRoute);
Router.register('clubs/:id/clients/:clientId/update', updateClientRoute);

Router.init();
