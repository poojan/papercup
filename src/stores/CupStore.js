import { observable, action } from 'mobx';
import CupModel from './CupModel';

class CupStore {
  @observable items = [];

  constructor(items) {
    this.items = this.resolveModels(items);
  }

  resolveModel = item => new CupModel(item);
  resolveModels = items => items.map(item => this.resolveModel(item));
  findById = (itemId) => this.items.find(item => item.id === itemId);

  @action toggleSelect = itemId => {
    const foundItem = this.findById(itemId);
    foundItem.selected = !foundItem.selected;
  };
}

export default CupStore;
