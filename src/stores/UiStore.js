import { observable } from 'mobx';

const devMode = false;
const activeScreen = devMode ? 'CUPS' : 'IMAGE_DROP';

class UiStore {
  @observable imagePath = '';
  @observable cropped = '';
  @observable activeScreen  = activeScreen;
  // @observable activeScreen  = 'IMAGE_DROP';
  // @observable activeScreen  = 'CUPS';
  @observable activeKeyId  = 'rayWhite';
  @observable devMode  = devMode;
}

export default UiStore;
