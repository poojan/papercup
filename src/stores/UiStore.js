import { observable } from 'mobx';

class UiStore {
  @observable imagePath = '';
  @observable cropped = '';
}

export default UiStore;
