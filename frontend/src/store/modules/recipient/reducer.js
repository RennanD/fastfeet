import { produce } from 'immer';

const INITIAL_STATE = {
  profile: null,
  loading: false,
};

export default function recipient(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@recipient/SHOW_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@recipient/SHOW_SUCCESS': {
        draft.loading = false;
        draft.profile = action.payload.profile;
        break;
      }
      case '@recipient/UPDATE_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@recipient/UPDATE_SUCCESS': {
        draft.loading = false;
        draft.profile = null;
        break;
      }
      case '@recipient/FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
