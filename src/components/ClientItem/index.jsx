import { useNavigate } from 'react-router-dom';
import { TableCell, TableRow } from '@components/ui/table';
import { PenLine, Trash2 } from 'lucide-react';
import { Button } from '@components/ui/button';
import { format } from 'date-fns';

export const ClientItem = ({
  firstName,
  lastName,
  birthDate,
  id,
  clubId,
  onDeleteClient,
}) => {
  const navigate = useNavigate();
  return (
    <TableRow>
      <TableCell className="font-medium">{firstName}</TableCell>
      <TableCell>{lastName}</TableCell>
      <TableCell>{format(birthDate, 'PPP')}</TableCell>
      <TableCell>
        <div className="flex items-center justify-center gap-1">
          <Button
            onClick={() => navigate(`/clubs/${clubId}/clients/${id}/update`)}
            type="button"
            size="sm"
            className="h-10 w-[50px]"
          >
            <PenLine className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => {
              onDeleteClient(id, firstName, lastName);
            }}
            type="button"
            className="h-10 w-[50px]"
          >
            <Trash2 className="h-4.5 w-4.5" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
