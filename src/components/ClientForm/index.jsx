import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { getCurrentDate } from "../../shared/utils/getCurrentDate";
import { calculateAge } from "../../shared/utils/calculateAge";
import { clientStore } from "../../stores/client.store";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Client = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required!")
    .min(2, "First name should have minimum 2 characters"),
  lastName: yup
    .string()
    .required("Last name is required!")
    .min(2, "Last name should have minimum 2 characters"),
  birthDate: yup
    .date()
    .required("Date of birth is required")
    .test(
      "is-18",
      "Client must be at least 18 years old",
      value => calculateAge(value) >= 18
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
      firstName: "",
      lastName: "",
      birthDate: "",
    },
    resolver: yupResolver(Client),
  });

  const params = useParams();
  const clubId = params.id;
  const clientId = params.clientId;
  const navigate = useNavigate();

  useEffect(() => {
    if (clientId) {
      (async () => {
        await clientStore.fetchClient(clientId);
        reset({
          firstName: clientStore.currentClient?.firstName,
          lastName: clientStore.currentClient?.lastName,
          birthDate: clientStore.currentClient?.birthDate,
        });
      })();
    }
  }, [reset, clientId]);

  const onSubmit = useCallback(
    async inputData => {
      const data = {
        firstName: inputData.firstName.trim(),
        lastName: inputData.lastName.trim(),
        birthDate: inputData.birthDate.toISOString().split("T")[0],
        clubId: clubId,
      };
      await clientStore.createOrUpdateClient(clientId, data);
      navigate(`/clubs/${clubId}/clients`);
      toast.success(
        `Client: ${inputData.firstName} ${inputData.lastName}, successfully ${clientId ? "updated" : "created"}!`
      );
    },
    [clubId, clientId, navigate]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="clubForm">
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">
          First Name
          <input
            {...register("firstName")}
            aria-invalid={errors.firstName ? "true" : "false"}
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
            {...register("lastName")}
            aria-invalid={errors.lastName ? "true" : "false"}
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
            {...register("birthDate")}
            aria-invalid={errors.birthDate ? "true" : "false"}
            type="date"
            min="1900-01-01"
            max={getCurrentDate()}
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
  );
};
