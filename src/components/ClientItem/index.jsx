import { useNavigate } from 'react-router-dom';
import { PenLine, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { TableCell, TableRow } from '@components/ui/table';
import { Button } from '@components/ui/button';

export function ClientItem({
  firstName,
  lastName,
  birthDate,
  id,
  clubId,
  onDeleteClient,
}) {
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
            <PenLine className="size-4" />
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
}
