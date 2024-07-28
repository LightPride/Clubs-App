import { useCallback, useEffect } from "react";
import { ClientItem } from "../ClientItem";
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clientStore } from "../../stores/client.store";
import { observer } from "mobx-react";

export const ClientList = observer(function ClientList() {
  const params = useParams();
  const clubId = params.id;

  useEffect(() => {
    clientStore.fetchClients(clubId);
  }, [clubId]);

  const deleteContact = useCallback(async (clientId, firstName, lastName) => {
    await clientStore.deleteClient(clientId);
    toast.info(`Client: ${firstName} ${lastName}, successfully deleted!`);
  }, []);

  return (
    <>
      <NavLink
        to={`/clubs/${clubId}/clients/create`}
        className="btn btn-primary ms-auto me-auto mb-5"
      >
        Create Client
      </NavLink>
      {clientStore.clientList?.length > 0 ? (
        <div id="clientsList" className="list-group">
          {clientStore.clientList.map(client => {
            return (
              <ClientItem
                key={client.id}
                firstName={client.firstName}
                lastName={client.lastName}
                birthDate={client.birthDate}
                id={client.id}
                clubId={client.clubId}
                onDeleteClient={deleteContact}
              ></ClientItem>
            );
          })}
        </div>
      ) : (
        <div className="ms-auto me-auto text-light">
          You don't have any clients in this club yet!
        </div>
      )}
    </>
  );
});
