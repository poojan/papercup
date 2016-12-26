import { observable } from 'mobx';

class UiStore {
  @observable imagePath = '';
  @observable cropped = '';
  // @observable activeScreen  = 'IMAGE_DROP';
  @observable activeScreen  = 'CUPS';
  @observable activeKeyId  = 'rayWhite';
}

export default UiStore;
