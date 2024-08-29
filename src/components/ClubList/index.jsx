import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { observer } from 'mobx-react';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { clubStore } from '@stores/club.store';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { Loader } from '@components/Loader';

export const ClubList = observer(() => {
  const navigate = useNavigate();
  useEffect(() => {
    clubStore.fetchClubs();
  }, []);

  const deleteClub = async (clubId, clubName) => {
    await clubStore.deleteClub(clubId);
    toast.info(`Club: ${clubName}, successfully deleted!`);
  };

  return (
    <Card className="mx-auto max-w-[1200px]">
      <CardHeader>
        <CardTitle>Clubs</CardTitle>
        <CardDescription>
          Manage your clubs and view their clients
        </CardDescription>
        <Button
          onClick={() => navigate('/clubs/create')}
          size="sm"
          className="mx-auto h-8 w-[160px] gap-1"
        >
          <PlusCircle className="size-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Product
          </span>
        </Button>
      </CardHeader>
      <CardContent>
        {clubStore.isLoading ? (
          <Loader />
        ) : (
          clubStore.clubList?.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Name</TableHead>
                  <TableHead className="text-center">Location</TableHead>
                  <TableHead className="text-center" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {clubStore.clubList.map(({ id, name, clubLocation }) => {
                  return (
                    <TableRow key={id}>
                      <TableCell className="font-medium">
                        <NavLink
                          to={`/clubs/${id}`}
                          className=" hover:text-slate-500  focus:text-slate-500"
                        >
                          {name}
                        </NavLink>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{clubLocation}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell" />
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="size-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <NavLink
                              className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-slate-100 focus:bg-slate-100"
                              to={`/clubs/${id}/clients`}
                            >
                              View Clients
                            </NavLink>
                            <NavLink
                              className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-slate-100 focus:bg-slate-100"
                              to={`/clubs/${id}/update`}
                            >
                              Edit
                            </NavLink>
                            <DropdownMenuItem
                              onClick={() => {
                                deleteClub(id, name);
                              }}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )
        )}
        {clubStore.clubList?.length <= 0 && !clubStore.isLoading && (
          <div className="w-100 mx-auto">{"You don't have any clubs yet!"}</div>
        )}
      </CardContent>
      <CardFooter>
        <div className="text-muted-foreground text-xs">
          Showing <strong>{clubStore.clubList?.length ?? 0}</strong> clubs
        </div>
      </CardFooter>
    </Card>
  );
});

ClubList.displayName = 'ClubList';
