function HomePage() {
  return $('<div class="home__wrapper"><div class="home__background"/></div>')
    .append($('<h1 class="home__title">Welcome to <b>Clubs App</b></h1>'))
    .append(
      $('<ul class="home__list"></ul>')
        .append(
          $('<li class="home__item"></li>').append(
            $(
              '<p class="home__text">By using this app you can create, update and delete clubs, and also their clients!</p>'
            )
          )
        )
        .append(
          $('<li class="home__item"></li>').append(
            '<p class="home__text">I created this app to practice my EcmaScript5 skills with the help of JQuery. I also used Bootstrap for quick styling and Json-WebServer to quickly make my own database. Configured EsLint and Prettier.</p>'
          )
        )
    );
}

export default HomePage;
