import './pages';
import './scss/index.scss';
import { router } from './shared/libs/router';
import { Header } from './components/Header';
import { toast } from './components/AlertToast';

$('#app')
  .append(new Header().render())
  .append(router.init($('<main id="main"></main>')))
  .append(toast.toastContainer);
