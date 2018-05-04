import AppStateClass from './app-state';
import TopicStore from './topic-store';

export const AppState = AppStateClass;

export default {
  AppState,
  TopicStore,
};

export const createStoreMap = () => {
  return {
    appState: new AppState(),
    topicStore: new TopicStore(),
  };
};
