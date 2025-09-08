import { configureStore } from '@reduxjs/toolkit';
import undoable, { excludeAction, type StateWithHistory } from 'redux-undo';

import userReducer, { type UserStateType } from './modules/userReducer';
import componentsReducer, { type ComponentsStateType } from './modules/componentsReducer';
import pageInfoReducer, { type PageInfoType } from './modules/pageInfoReducer';

export interface StateType {
  user: UserStateType;
  components: StateWithHistory<ComponentsStateType>;
  pageInfo: PageInfoType;
}

const store = configureStore({
  reducer: {
    user: userReducer,
    components: undoable(componentsReducer, {
      limit: 20,
      filter: excludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent',
      ]),
    }),
    pageInfo: pageInfoReducer,
  },
});

export default store;
