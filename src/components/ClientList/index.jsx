import { useEffect } from 'react';
import { ClientItem } from '../ClientItem';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader } from '@components/Loader';
import { clientStore } from '@stores/client.store';
import { observer } from 'mobx-react';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { Card } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { ArrowBigLeft, UserPlus } from 'lucide-react';
import { CardHeader, CardTitle } from '@components/ui/card';

export const ClientList = observer(() => {
  const { id: clubId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    clientStore.fetchClients(clubId);
  }, [clubId]);

  const deleteContact = async (clientId, firstName, lastName) => {
    await clientStore.deleteClient(clientId);
    toast.info(`Client: ${firstName} ${lastName}, successfully deleted!`);
  };

  return (
    <Card className="ml-auto mr-auto max-w-[1200px]">
      <CardHeader>
        <CardTitle>Manage your clients</CardTitle>
        <div className="flex items-center justify-center gap-1">
          <Button
            onClick={() => navigate('/clubs')}
            size="sm"
            className="h-8 w-[100px] gap-1"
          >
            <ArrowBigLeft className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Go Back
            </span>
          </Button>
          <Button
            onClick={() => navigate(`/clubs/${clubId}/clients/create`)}
            size="sm"
            className="h-8 w-[120px] gap-1"
          >
            <UserPlus className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Client
            </span>
          </Button>
        </div>
      </CardHeader>
      {clientStore.isLoading ? (
        <Loader />
      ) : clientStore.clientList?.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">First Name</TableHead>
              <TableHead className="text-center">Last Name</TableHead>
              <TableHead className="text-center">Date of Birth</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientStore.clientList.map((client) => (
              <ClientItem
                key={client.id}
                firstName={client.firstName}
                lastName={client.lastName}
                birthDate={client.birthDate}
                id={client.id}
                clubId={client.clubId}
                onDeleteClient={deleteContact}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell>
                <strong>{clientStore.clientList?.length ?? 0} client/s</strong>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <div className="w-100 ml-auto mr-auto">
          You don't have any clubs yet!
        </div>
      )}
    </Card>
  );
});

ClientList.displayName = 'ClientList';
