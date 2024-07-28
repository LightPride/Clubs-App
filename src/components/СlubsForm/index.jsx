import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import { clubStore } from "../../stores/club.store";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Club = yup.object().shape({
  clubName: yup.string().required("Club name is required!"),
  clubLocation: yup.string().required("Club location is equired!"),
});

export const ClubsForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      clubName: "",
      clubLocation: "",
    },
    resolver: yupResolver(Club),
  });

  const params = useParams();
  const clubId = params.id;
  const navigate = useNavigate();

  useEffect(() => {
    if (clubId) {
      (async () => {
        await clubStore.fetchClub(clubId);
        reset({
          clubName: clubStore.currentClub?.name,
          clubLocation: clubStore.currentClub?.location,
        });
      })();
    }
  }, [reset, clubId]);

  const onSubmit = useCallback(
    async inputData => {
      const data = {
        name: inputData.clubName.trim(),
        location: inputData.clubLocation.trim(),
      };
      await clubStore.createOrUpdateClub(clubId, data);
      navigate("/clubs");
      toast.success(
        `Club: ${inputData.clubName}, successfully ${clubId ? "updated" : "created"}!`
      );
    },
    [clubId, navigate]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="clubForm">
      <div className="mb-3">
        <label htmlFor="clubName" className="form-label">
          Club Name
          <input
            {...register("clubName")}
            aria-invalid={errors.clubName ? "true" : "false"}
            type="text"
            id="clubName"
            className="form-control"
          />
        </label>
        {errors.clubName && <p role="alert">{errors.clubName.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="clubLocation" className="form-label">
          Club location
          <input
            {...register("clubLocation")}
            aria-invalid={errors.clubName ? "true" : "false"}
            type="text"
            id="clubLocation"
            className="form-control"
          />
        </label>
        {errors.clubLocation && (
          <p role="alert">{errors.clubLocation.message}</p>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
