import { produce } from 'immer';

const INITIAL_STATE = {
  details: null,
  loading: false,
};

export default function order(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@order/SHOW_SUCCESS': {
        draft.loading = false;
        draft.details = action.payload.details;
        break;
      }
      case '@order/SHOW_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@order/UPDATE_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@order/UPDATE_SUCCESS': {
        draft.loading = false;
        draft.profile = null;
        break;
      }
      case '@order/FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
