import Header from './components/Header/header.js';
import ClubsCatalogue from './components/ClubsCatalogue/clubs-catalogue.js';
import CataloguePage from './pages/catalogue.js';

$('#app').prepend(Header()).append(CataloguePage(ClubsCatalogue()));
