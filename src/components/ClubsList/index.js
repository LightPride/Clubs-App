import { clubService } from '../../api/clubs';
import { toast } from '../AlertToast';

export class ClubsList {
  #parentNode = $(
    `<div id="catalogue" class="row row-cols-1 row-cols-md-3 g-4"></div>`
  );

  render = () => {
    this.#handleFetchClubs();
    return $(`<div></div>`)
      .append(
        `<a href="#clubs/create" class="btn btn-primary ms-auto me-auto mb-5">Create Club</a>`
      )
      .append(this.#parentNode);
  };

  #handleFetchClubs = async () => {
    const clubs = await clubService.fetchClubs();
    this.#renderCatalogue(clubs);
  };

  #renderCatalogue = (clubs = []) => {
    this.#parentNode.html('');
    clubs.forEach(club => {
      const clubCard = $(`<div id="${club.id}"></div>`).append(
        $(`<div class="card"></div>`).append(
          $(`<div class="card-body"></div>`)
            .append($(`<h5 class="card-title">${club.name}</h5>`))
            .append($(`<p>${club.location}</p>`))
            .append(
              $(
                `<a href="#clubs/${club.id}" class="btn btn-primary me-5">View info</a>`
              )
            )
            .append(
              $(
                `<a href="#clubs/${club.id}/clients" class="btn btn-primary me-5">View clients</a>`
              )
            )
            .append(
              $(
                `<a href="#clubs/${club.id}/update" class="btn btn-primary me-5">Update</a>`
              )
            )
            .append(
              $(
                `<button type="button" class="btn btn-primary">Delete</button>`
              ).on('click', async () => {
                await clubService.deleteClub(club.id).then(response => {
                  toast.show(
                    `Club: ${response.data.name}, successfully deleted!`,
                    'success'
                  );
                });
                this.#handleFetchClubs();
              })
            )
        )
      );
      this.#parentNode.append(clubCard);
    });
  };
}
