import { useEffect } from 'react';
import { useParams } from 'react-router';
import { observer } from 'mobx-react';
import { clubStore } from '@stores/club.store';
import { NavLink, useNavigate } from 'react-router-dom';

export const ClubItem = observer(() => {
  const { id } = useParams('id');
  const navigate = useNavigate();

  useEffect(() => {
    clubStore.fetchClub(id);
  }, [id]);

  return (
    <>
      <NavLink onClick={() => navigate(-1)}>Go back</NavLink>
      <div
        id="clubcard"
        className="card ms-auto me-auto"
        style={{ width: '18rem' }}
      >
        <div className="card-body" id={clubStore.currentClub.id}>
          <h5 className="card-title">{clubStore.currentClub.name}</h5>
          <p className="card-text">{clubStore.currentClub.clubLocation}</p>
          <p className="card-text">Im a teapot</p>
        </div>
      </div>
    </>
  );
});

ClubItem.displayName = 'ClubItem';
