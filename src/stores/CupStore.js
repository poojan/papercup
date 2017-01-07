import { observable } from 'mobx';
import CupModel from './CupModel';

class CupStore {
  @observable items = [];

  constructor(items) {
    this.items = this.resolveModels(items);
  }

  resolveModel = item => new CupModel(item);
  resolveModels = items => items.map(item => this.resolveModel(item));
  findById = (itemId) => this.items.find(item => item.id === itemId);
}

export default CupStore;
