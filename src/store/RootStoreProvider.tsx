import { createContext, FC, PropsWithChildren, useMemo } from 'react';

import RootState from './RootState';
import { type RootContextProps } from './types';

const RootStoreContext = createContext<RootContextProps | null>(null);

const RootStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const rootState = useMemo(() => new RootState(), []);

  const rootStore = useMemo(() => ({ rootState }), [rootState]);

  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
};

export { RootStoreContext };
export default RootStoreProvider;
