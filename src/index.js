import Header from './components/Header/header.js';
import ClubsForm from './components/СlubsForm/clubsForm.js';
import CataloguePage from './pages/cataloguePage.js';
import ClubsFormPage from './pages/clubsFormPage.js';

$('#app').prepend(Header());
CataloguePage();
// ClubsFormPage();
// $('#clubForm').on('submit', function (event) {
//   event.preventDefault();
// });
