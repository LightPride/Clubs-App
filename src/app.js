import './pages/index.js';
import Router from './shared/libs/router/index.js';
import Header from './components/Header/index.js';

$('#app')
  .append(Header())
  .append(Router.init($('<main id="main"></main>')));
