export function fetchClubs(callback) {
  $.ajax({
    url: 'http://localhost:3000/clubs',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      callback(data);
    },
    error: function (error) {
      console.error('Error fetching data:', error);
    },
  });
}

export function fetchClub(id, callback) {
  $.ajax({
    url: 'http://localhost:3000/clubs/' + id,
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      callback(data);
    },
    error: function (error) {
      console.error('Error fetching data:', error);
    },
  });
}

export function updateClub(id, data) {
  $.ajax({
    url: 'http://localhost:3000/clubs/' + id,
    method: 'PATCH',
    dataType: 'json',
    data: JSON.stringify(data),
    success: function (data) {},
    error: function (error) {
      console.error('Error fetching data:', error);
    },
  });
}

export function deleteClub(id) {
  $.ajax({
    url: 'http://localhost:3000/clubs/' + id,
    method: 'DELETE',
    dataType: 'json',
    success: function (data) {
      console.log(data);
    },
    error: function (error) {
      console.error('Error fetching data:', error);
    },
  });
}

export function createClub(data) {
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

export function fetchClients(callback) {
  $.ajax({
    url: 'http://localhost:3000/clients',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      callback(data);
    },
    error: function (error) {
      console.error('Error fetching data:', error);
    },
  });
}

export function fetchClient(id, callback) {
  $.ajax({
    url: 'http://localhost:3000/clients/' + id,
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      callback(data);
    },
    error: function (error) {
      console.error('Error fetching data:', error);
    },
  });
}

export function createClient(data) {
  $.ajax({
    url: 'http://localhost:3000/clients',
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

export function updateClient(id, data) {
  $.ajax({
    url: 'http://localhost:3000/clients/' + id,
    method: 'PATCH',
    dataType: 'json',
    data: JSON.stringify(data),
    success: function (data) {},
    error: function (error) {
      console.error('Error fetching data:', error);
    },
  });
}

export function deleteClient(id) {
  $.ajax({
    url: 'http://localhost:3000/clients/' + id,
    method: 'DELETE',
    dataType: 'json',
    success: function (data) {
      console.log(data);
    },
    error: function (error) {
      console.error('Error fetching data:', error);
    },
  });
}
