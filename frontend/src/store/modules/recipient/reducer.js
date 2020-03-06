import { produce } from 'immer';

const INITIAL_STATE = {
  profile: null,
  loading: false,
};

export default function recipient(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      default:
        return draft;
    }
  });
}
