import { observable } from 'mobx';

class UiStore {
  @observable imagePath = '';
  @observable cropped = '';
  @observable activeScreen  = 'IMAGE_DROP';
}

export default UiStore;
