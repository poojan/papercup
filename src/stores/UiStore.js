import { observable } from 'mobx';

class UiStore {
  @observable imagePath = '';
  @observable cropped = '';
  @observable activeScreen  = 'IMAGE_DROP';
  // @observable activeScreen  = 'CUPS';
}

export default UiStore;
