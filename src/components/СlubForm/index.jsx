import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { clubStore } from '@stores/club.store';
import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';

const clubSchema = yup.object().shape({
  clubName: yup.string().required('Club name is required!'),
  clubLocation: yup.string().required('Club location is required!'),
});

export function ClubForm() {
  const form = useForm({
    defaultValues: {
      clubName: '',
      clubLocation: '',
    },
    resolver: yupResolver(clubSchema),
  });

  const { id: clubId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (clubId) {
      (async () => {
        await clubStore.fetchClub(clubId);
        form.reset({
          clubName: clubStore.currentClub?.name,
          clubLocation: clubStore.currentClub?.clubLocation,
        });
      })();
    }
  }, [clubId]);

  const onSubmit = async (inputData) => {
    const data = {
      name: inputData.clubName.trim(),
      clubLocation: inputData.clubLocation.trim(),
    };
    await clubStore.createOrUpdateClub(clubId, data);
    navigate('/clubs');
    toast.success(
      `Club: ${inputData.clubName}, successfully ${clubId ? 'updated' : 'created'}!`,
    );
  };

  return (
    <Card className="mx-auto w-[350px]">
      <CardHeader>
        <CardTitle>Create Club</CardTitle>
        <CardDescription>Deploy your club in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="clubForm">
            <div className="grid w-full items-center gap-4">
              <FormField
                control={form.control}
                name="clubName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex text-start">Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={clubId ? '' : 'Name of Club'}
                      />
                    </FormControl>
                    <FormDescription>
                      {"This is club's public display name."}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="clubLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex text-start">Location</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={clubId ? '' : 'Location of Club'}
                      />
                    </FormControl>
                    <FormDescription>
                      {"This is club's public location."}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                onClick={() => navigate(-1)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
