export const HomePage = () =>
  $(`<div class="home__wrapper"><div class="home__background"/></div>`)
    .append($(`<h1 class="home__title">Welcome to <b>Clubs App</b></h1>`))
    .append(
      $(`<ul class="home__list"></ul>`)
        .append(
          $(`<li class="home__item"></li>`).append(
            $(
              `<p class="home__text">By using this app you can create, update and delete clubs, and also their clients!</p>`
            )
          )
        )
        .append(
          $(`<li class="home__item"></li>`).append(
            `<p class="home__text">This is the second version of ClubsApp. This time i rewrote the app using EcmaScript6 syntax and Webpack with Js, Css and Html minimisers. 
            Jquery and Bootstrap are included as npm packages and configured through webpack. Eslint now configured with vercel-style guide. I also used Axios for HTTP requests.</p>`
          )
        )
    );
