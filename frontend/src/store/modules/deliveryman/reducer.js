import { produce } from 'immer';

const INITIAL_STATE = {
  profile: null,
  loading: false,
};

export default function deliveryman(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@deliveryman/SHOW_SUCCESS': {
        console.tron.log(action.payload);

        draft.loading = false;
        draft.profile = action.payload.profile;
        break;
      }
      case '@deliveryman/SHOW_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@deliveryman/UPDATE_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@deliveryman/UPDATE_SUCCESS': {
        draft.loading = false;
        draft.profile = null;
        break;
      }
      case '@deliveryman/UPDATE_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
