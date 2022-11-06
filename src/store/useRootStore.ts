import { useContext } from 'react';

import { RootStoreContext } from './RootStoreProvider';
import { RootContextProps } from './types';

const useRootStore = (): RootContextProps => {
  const store = useContext(RootStoreContext);
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('useRootStore must be used within a RootStoreProvider.');
  }
  return store;
};

export default useRootStore;
