import { observable } from 'mobx';

const devMode = false;
// const activeScreen = devMode ? 'EMAIL_MOCKUPS' : 'IMAGE_DROP';
const activeScreen = devMode ? 'CUPS' : 'IMAGE_DROP';

class UiStore {
  @observable imagePath = '';
  @observable cropped = '';
  @observable activeScreen  = activeScreen;
  // @observable activeScreen  = 'IMAGE_UPLOADING';
  // @observable activeScreen  = 'CUPS';
  // @observable activeKeyId  = 'rayWhite';
  @observable activeKeyId  = 'espresso';
  @observable devMode  = devMode;
}

export default UiStore;
