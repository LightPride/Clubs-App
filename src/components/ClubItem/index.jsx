import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBigLeft, MoreVertical, Users } from 'lucide-react';
import { toast } from 'react-toastify';
import { clubStore } from '@stores/club.store';
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Separator } from '@components/ui/separator';

export const ClubItem = observer(() => {
  const { id } = useParams('id');
  const navigate = useNavigate();

  useEffect(() => {
    clubStore.fetchClub(id);
  }, [id]);

  const deleteClub = async (clubId, clubName) => {
    await clubStore.deleteClub(clubId);
    toast.info(`Club: ${clubName}, successfully deleted!`);
    navigate('/clubs');
  };

  return (
    <Card
      className="mx-auto max-w-[600px] overflow-hidden"
      x-chunk="dashboard-05-chunk-4"
    >
      <CardHeader className="flex flex-row items-start  bg-slate-200">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            {clubStore.isLoading
              ? 'Loading...'
              : `Club: ${clubStore.currentClub.name}`}
          </CardTitle>
          <CardDescription>
            {clubStore.isLoading
              ? 'Loading...'
              : `Location: ${clubStore.currentClub.clubLocation}`}
          </CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button
            onClick={() => navigate(-1)}
            size="sm"
            variant="outline"
            className="h-8 gap-1"
          >
            <ArrowBigLeft className="size-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              Go Back
            </span>
          </Button>
          <Button
            onClick={() => navigate(`/clubs/${id}/clients`)}
            size="sm"
            variant="outline"
            className="h-8 gap-1"
          >
            <Users className="size-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              View Clients
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="size-8">
                <MoreVertical className="size-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate(`/clubs/${id}/update`)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  deleteClub(id, clubStore.currentClub.name);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Club Details</div>
          <Separator className="my-2" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t  bg-slate-200 px-6 py-3">
        <div className="text-muted-foreground text-xs">
          Updated <time dateTime="2023-11-23">November 23, 2023</time>
        </div>
      </CardFooter>
    </Card>
  );
});

ClubItem.displayName = 'ClubItem';
