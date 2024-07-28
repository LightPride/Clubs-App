import { useEffect } from 'react';
import { useParams } from 'react-router';
import { observer } from 'mobx-react';
import { clubStore } from '../../stores/club.store';

export const ClubItem = observer(function ClubItem() {
  const { id } = useParams('id');

  useEffect(() => {
    clubStore.fetchClub(id);
  }, [id]);

  return (
    <div
      id="clubcard"
      className="card ms-auto me-auto"
      style={{ width: '18rem' }}
    >
      <div className="card-body" id={clubStore.currentClub.id}>
        <h5 className="card-title">{clubStore.currentClub.name}</h5>
        <p className="card-text">{clubStore.currentClub.location}</p>
        <p className="card-text">Im a teapot</p>
      </div>
    </div>
  );
});
