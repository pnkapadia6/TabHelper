import {
  SHOW_BOOKMARK_SECTION,
  HIDE_BOOKMARK_SECTION
} from '../constants/ActionTypes';

const initialState = {};

const actionsMap = {
  [SHOW_BOOKMARK_SECTION]: (state, action) => ({
    ...state,
    show: true,
    tabsForBookmark: action.payload.tabs,
  }),

  [HIDE_BOOKMARK_SECTION]: state => ({
    ...state,
    show: false,
    tabsForBookmark: [],
  })
};

export default function watch(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
