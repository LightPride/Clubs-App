import ClubsCatalogue from '../components/ClubsList/index.js';

function CataloguePage() {
  return $('<div></div>')
    .append(
      $(
        '<a href="#clubs/create" class="btn btn-primary ms-auto me-auto mb-5">Create Club</a>'
      )
    )
    .append(ClubsCatalogue);
}

export default CataloguePage;
