import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import { calculateAge } from '@shared/utils/calculateAge';
import { clientStore } from '@stores/client.store';
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
import { DatePicker } from '../DatePicker';

const clientSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required!')
    .min(2, 'First name should have minimum 2 characters'),
  lastName: yup
    .string()
    .required('Last name is required!')
    .min(2, 'Last name should have minimum 2 characters'),
  birthDate: yup
    .date()
    .required('Date of birth is required')
    .test(
      'is-18',
      'Client must be at least 18 years old',
      (value) => calculateAge(value) >= 18,
    ),
});

export function ClientForm() {
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      birthDate: '',
    },
    resolver: yupResolver(clientSchema),
  });

  const { id: clubId, clientId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (clientId) {
      (async () => {
        await clientStore.fetchClient(clientId);

        form.reset({
          firstName: clientStore.currentClient?.firstName,
          lastName: clientStore.currentClient?.lastName,
          birthDate: new Date(clientStore.currentClient?.birthDate),
        });
      })();
    }
  }, [clientId]);

  const onSubmit = async (inputData) => {
    const data = {
      firstName: inputData.firstName.trim(),
      lastName: inputData.lastName.trim(),
      birthDate: format(inputData.birthDate, 'P'),
      clubId,
    };

    await clientStore.createOrUpdateClient(clientId, data);
    navigate(`/clubs/${clubId}/clients`);
    toast.success(
      `Client: ${inputData.firstName} ${inputData.lastName}, successfully ${clientId ? 'updated' : 'created'}!`,
    );
  };

  return (
    <Card className="mx-auto w-[328px]">
      <CardHeader>
        <CardTitle>Add client</CardTitle>
        <CardDescription>Add client to your club.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="clientForm">
            <div className="grid w-full items-center gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex text-start">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={clientId ? '' : 'John'} />
                    </FormControl>
                    <FormDescription>
                      {"This is client's first name."}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex text-start">Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={clientId ? '' : 'Smith'} />
                    </FormControl>
                    <FormDescription>
                      {"This is client's last name."}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="flex text-start">
                      Date of birth
                    </FormLabel>
                    <DatePicker {...field} />
                    <FormDescription>
                      {"This is client's date of birth."}
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
