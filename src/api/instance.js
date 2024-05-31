var InstanceAPI = {
  BASE_URL: 'http://localhost:3000',
  get: function (callback, path, id) {
    var url = this.BASE_URL + '/' + path;
    if (id !== undefined) {
      url += '/' + id;
    }

    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        callback(data);
      },
      error: function (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data!');
      },
    });
  },
  post: function (data, path) {
    $.ajax({
      url: this.BASE_URL + '/' + path,
      method: 'POST',
      dataType: 'json',
      data: JSON.stringify(data),
      error: function (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data!npm install json-server');
      },
    });
  },
  patch: function (data, path, id) {
    $.ajax({
      url: this.BASE_URL + '/' + path + '/' + id,
      method: 'PATCH',
      dataType: 'json',
      data: JSON.stringify(data),
      error: function (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data!');
      },
    });
  },
  delete: function (path, id) {
    $.ajax({
      url: this.BASE_URL + '/' + path + '/' + id,
      method: 'DELETE',
      dataType: 'json',
      error: function (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data!');
      },
    });
  },
};

export default InstanceAPI;
