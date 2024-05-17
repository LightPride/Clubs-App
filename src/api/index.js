function fetchClubs(callback) {
  $.ajax({
    url: 'http://localhost:3000/clubs',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      console.log(data);
      callback(data);
    },
    error: function (error) {
      console.error('Error fetching data:', error);
    },
  });
}

export default fetchClubs;

// var request = new XMLHttpRequest();
// request.open('GET', 'http://localhost:3000/clubs', true);

// request.onload = function () {
//   if (request.status >= 200 && request.status < 400) {
//     var clubs = JSON.parse(request.responseText);
//     var clubsList = '';

//     for (var i = 0; i < clubs.length; i++) {
//       var club = clubs[i];
//       clubsList +=
//         '<div> <div class="card"> <div class="card-body"><h5 class="card-title">' +
//         club.name +
//         '</h5> <p>' +
//         club.location +
//         '</p><a href="/clubs/ ' +
//         club.id +
//         ' " class="btn btn-primary">  View clients</a></div></div></div>';
//     }

//     $('#catalogue').append($(clubsList));
//   } else {
//     console.error('Error fetching clubs');
//   }
// };

// request.onerror = function () {
//   console.error('Error fetching clubs');
// };

// request.send();
