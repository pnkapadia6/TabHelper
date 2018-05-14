import {
  SHOW_BOOKMARK_SECTION,
  HIDE_BOOKMARK_SECTION
} from '../constants/ActionTypes';

export const showBookmarkSection = tabs => ({
  type: SHOW_BOOKMARK_SECTION,
  payload: { tabs }
});

export const hideBookmarkSection = () => ({
  type: HIDE_BOOKMARK_SECTION
});
