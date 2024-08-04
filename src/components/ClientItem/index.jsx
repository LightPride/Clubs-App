import { NavLink } from 'react-router-dom';
import { DateTime } from 'luxon';
import { DATE_FORMAT } from '@shared/constants/dateFormat';

export const ClientItem = ({
  firstName,
  lastName,
  birthDate,
  id,
  clubId,
  onDeleteClient,
}) => {
  return (
    <div className="list-group-item list-group-item-action">
      <span className="fw-bold fs-5">{firstName}</span>{' '}
      <span className="fw-bold fs-5">{lastName}</span>
      <p className="mb-1">
        {DateTime.fromISO(birthDate).toFormat(DATE_FORMAT)}
      </p>
      <p className="mb-1">I am a teapot</p>
      <NavLink
        to={`/clubs/${clubId}/clients/${id}/update`}
        className="btn btn-primary me-2"
      >
        Update
      </NavLink>
      <button
        onClick={() => {
          onDeleteClient(id, firstName, lastName);
        }}
        type="button"
        className="btn btn-danger"
      >
        Delete
      </button>
    </div>
  );
};
