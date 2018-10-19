import localForage from 'localforage';
import {
  createBlacklistFilter,
  createFilter,
} from 'redux-persist-transform-filter';

import { createMigrate } from 'redux-persist';

const saveSubsetBlacklistFilter = createBlacklistFilter('user', [
  'searchValue',
  'sortType',
  'errorMessage',
  'signInButtonColor',
]);

const migrations = {
  0: () => {},
  1: () => {},
  2: () => {},
};

export const persistConfig = {
  key: 'primary',
  version: 2,
  storage: localForage,
  whitelist: ['user'],
  migrate: createMigrate(migrations, { debug: false }),
  transforms: [saveSubsetBlacklistFilter],
};
