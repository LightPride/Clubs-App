var InstanceAPI = {
  BASE_URL: 'http://localhost:3000',

  get: function (callback, path) {
    this.request({
      url: this.BASE_URL + path,
      method: 'GET',
      success: callback,
    });
  },

  post: function (callback, data, path) {
    this.request({
      url: this.BASE_URL + path,
      method: 'POST',
      data: JSON.stringify(data),
      success: callback,
    });
  },

  patch: function (callback, data, path) {
    this.request({
      url: this.BASE_URL + path,
      method: 'PATCH',
      data: JSON.stringify(data),
      success: callback,
    });
  },

  delete: function (callback, path) {
    this.request({
      url: this.BASE_URL + path,
      method: 'DELETE',
      success: callback,
    });
  },

  request: function (params) {
    $.ajax(
      Object.assign(params, {
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
