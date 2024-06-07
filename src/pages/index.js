import Router from '../shared/libs/router/index.js';
import CataloguePage from './cataloguePage.js';
import ClientFormPage from './clientFormPage.js';
import ClientsPage from './clientsPage.js';
import ClubItemPage from './clubItemPage.js';
import ClubsFormPage from './clubsFormPage.js';
import HomePage from './homePage.js';
import NotFoundPage from './notFoundPage.js';

Router.register('', HomePage);
Router.register('clubs', CataloguePage);
Router.register('clubs/create', ClubsFormPage);
Router.register('clubs/:id', ClubItemPage);
Router.register('clubs/:id/update', ClubsFormPage);
Router.register('clubs/:id/clients', ClientsPage);
Router.register('clubs/:id/clients/create', ClientFormPage);
Router.register('clubs/:id/clients/:clientId/update', ClientFormPage);
Router.register('not-found', NotFoundPage);
