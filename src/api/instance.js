var InstanceAPI = {
  BASE_URL: 'http://localhost:3000',

  get: function (callback, path) {
    this.request(path, callback, {
      method: 'GET',
    });
  },

  post: function (callback, data, path) {
    this.request(path, callback, {
      method: 'POST',
      data: JSON.stringify(data),
    });
  },

  patch: function (callback, data, path) {
    this.request(path, callback, {
      method: 'PATCH',
      data: JSON.stringify(data),
    });
  },

  delete: function (callback, path) {
    this.request(path, callback, {
      method: 'DELETE',
    });
  },

  request: function (path, callback, params) {
    $.ajax(
      Object.assign(params, {
        url: this.BASE_URL + path,
        success: callback,
        dataType: 'json',
        error: function (error) {
          console.error('Error fetching data:', error);
          alert('Server error');
        },
      })
    );
  },
};

export default InstanceAPI;
