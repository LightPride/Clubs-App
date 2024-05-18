export function fetchClubs(callback) {
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

export function createClubs(data) {
  $.ajax({
    url: 'http://localhost:3000/clubs',
    method: 'POST',
    dataType: 'json',
    data: JSON.stringify(data),
    success: function (data) {
      console.log(data);
    },
    error: function (error) {
      console.error('Error fetching data:', error);
    },
  });
}
