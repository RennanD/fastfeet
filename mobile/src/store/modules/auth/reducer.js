import { produce } from 'immer';

const INITIAL_STATE = {
  userId: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SING_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SING_IN_SUCCESS': {
        draft.signed = true;
        draft.userId = action.payload.userId;
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
