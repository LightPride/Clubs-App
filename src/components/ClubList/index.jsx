import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { observer } from 'mobx-react';
import { clubStore } from '@stores/club.store';

export const ClubList = observer(() => {
  useEffect(() => {
    clubStore.fetchClubs();
  }, []);

  const deleteClub = async (clubId, clubName) => {
    await clubStore.deleteClub(clubId);
    toast.info(`Club: ${clubName}, successfully deleted!`);
  };

  return clubStore.clubList?.length > 0 ? (
    <>
      <NavLink
        to={'/clubs/create'}
        className="btn btn-primary ms-auto me-auto mb-5"
      >
        Create Club
      </NavLink>

      <div id="catalogue" className="row row-cols-1 row-cols-md-3 g-4">
        {clubStore.clubList.map(({ id, name, clubLocation }) => {
          return (
            <div key={id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{name}</h5>
                  <p>{clubLocation}</p>
                  <NavLink to={`/clubs/${id}`} className="btn btn-primary me-5">
                    View info
                  </NavLink>
                  <NavLink
                    to={`/clubs/${id}/clients`}
                    className="btn btn-primary me-5"
                  >
                    View clients
                  </NavLink>
                  <NavLink
                    to={`/clubs/${id}/update`}
                    className="btn btn-primary me-5"
                  >
                    Update
                  </NavLink>
                  <button
                    onClick={() => {
                      deleteClub(id, name);
                    }}
                    type="button"
                    className="btn btn-primary"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  ) : (
    <div className="ms-auto me-auto text-light">
      You don't have any clubs yet!
    </div>
  );
});

ClubList.displayName = 'ClubList';
