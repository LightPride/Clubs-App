import { ClientsList } from '../components/ClientsList';

export const ClientsPage = clubId => new ClientsList(clubId).render();
