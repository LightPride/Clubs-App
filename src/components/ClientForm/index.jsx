import { useForm } from 'react-hook-form';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { calculateAge } from '@shared/utils/calculateAge';
import { clientStore } from '@stores/client.store';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DateTime } from 'luxon';
import { DATE_FORMAT } from '@shared/constants';

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

export const ClientForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
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

        reset({
          firstName: clientStore.currentClient?.firstName,
          lastName: clientStore.currentClient?.lastName,
          birthDate: DateTime.fromISO(
            clientStore.currentClient?.birthDate,
          ).toFormat(DATE_FORMAT),
        });
      })();
    }
  }, [reset, clientId]);

  const onSubmit = async (inputData) => {
    console.log(inputData.birthDate);
    const data = {
      firstName: inputData.firstName.trim(),
      lastName: inputData.lastName.trim(),
      birthDate: DateTime.fromJSDate(inputData.birthDate).toFormat(DATE_FORMAT),
      clubId: clubId,
    };
    console.log(data.birthDate);
    await clientStore.createOrUpdateClient(clientId, data);
    navigate(`/clubs/${clubId}/clients`);
    toast.success(
      `Client: ${inputData.firstName} ${inputData.lastName}, successfully ${clientId ? 'updated' : 'created'}!`,
    );
  };

  return (
    <>
      <NavLink onClick={() => navigate(-1)}>Go back</NavLink>
      <form onSubmit={handleSubmit(onSubmit)} id="clubForm">
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
            <input
              {...register('firstName')}
              aria-invalid={errors.firstName ? 'true' : 'false'}
              type="text"
              name="firstName"
              id="firstName"
              className="form-control"
            />
          </label>
          {errors.firstName && <p role="alert">{errors.firstName.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
            <input
              {...register('lastName')}
              aria-invalid={errors.lastName ? 'true' : 'false'}
              type="text"
              name="lastName"
              id="lastName"
              className="form-control"
            />
          </label>
          {errors.lastName && <p role="alert">{errors.lastName.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="birthDate" className="form-label">
            Date of birth
            <input
              {...register('birthDate')}
              aria-invalid={errors.birthDate ? 'true' : 'false'}
              type="date"
              min="1900-01-01"
              max={DateTime.now().toFormat(DATE_FORMAT)}
              name="birthDate"
              id="birthDate"
              className="form-control"
            />
          </label>
          {errors.birthDate && <p role="alert">{errors.birthDate.message}</p>}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};
