function Header() {
  var header = $(
    '<header id="header" class="navbar navbar-expand-lg bg-dark sticky-top mb-5"></header>'
  );

  var nav = $(
    '<nav id="navigation" class="container-xxl bd-gutter flex-wrap flex-lg-nowrap"></nav>'
  );
  header.append(nav);

  var logo = $(
    '<a class="navbar-brand" href="/"><span class="logo">ClubsApp</span></a>'
  ).on('click', () => console.log(123));

  var homeLink = $('<a class="navigation__link" href="/">Home</a>');

  var catalogueLink = $(
    '<a class="navigation__link" href="/clubs">Catalogue</a>'
  );

  nav.append(logo).append($(homeLink)).append($(catalogueLink));

  return header;
}

export default Header;
