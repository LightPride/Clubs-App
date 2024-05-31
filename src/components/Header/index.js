function Header() {
  return $(
    '<header id="header" class="navbar navbar-expand-lg bg-dark sticky-top mb-5"></header>'
  ).append(
    $(
      '<nav id="navigation" class="container-xxl bd-gutter flex-wrap flex-lg-nowrap"></nav>'
    )
      .append(
        $(
          '<a class="navbar-brand" href="#"><span class="logo">ClubsApp</span></a>'
        )
      )
      .append($('<a class="navigation__link" href="#">Home</a>'))
      .append(
        $('<a class="navigation__link" href="#clubs" data-nav>Catalogue</a>')
      )
  );
}

export default Header;
