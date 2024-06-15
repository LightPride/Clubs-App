import { ClientForm } from '../components/ClientForm';

export const ClientFormPage = (clubId, clientId) =>
  new ClientForm(clubId, clientId).render();
