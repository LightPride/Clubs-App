var Store = {
  data: {
    clubs: [],
    clients: [],
  },
  setItems: function (type, items) {
    this.data[type] = items;
  },
  getItems: function (type) {
    return this.data[type];
  },
  deleteItem: function (type, id) {
    this.data[type] = this.data[type].filter(function (item) {
      return item.id !== id;
    });
  },
};

export default Store;
