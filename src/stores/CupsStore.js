import { observable } from 'mobx';

class CupsStore {
  @observable data = {};

  constructor(data) {
    this.data = data;
  }

  getData(keyId) {
    return this.data[keyId];
  }
}

export default CupsStore;
