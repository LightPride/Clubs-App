import { router } from '../shared/libs/router';
import { CataloguePage } from './cataloguePage';
import { ClientFormPage } from './clientFormPage';
import { ClientsPage } from './clientsPage';
import { ClubItemPage } from './clubItemPage';
import { ClubsFormPage } from './clubsFormPage';
import { HomePage } from './homePage';
import { NotFoundPage } from './notFoundPage';

router.register('', HomePage);
router.register('clubs', CataloguePage);
router.register('clubs/create', ClubsFormPage);
router.register('clubs/:id', ClubItemPage);
router.register('clubs/:id/update', ClubsFormPage);
router.register('clubs/:id/clients', ClientsPage);
router.register('clubs/:id/clients/create', ClientFormPage);
router.register('clubs/:id/clients/:clientId/update', ClientFormPage);
router.register('not-found', NotFoundPage);
