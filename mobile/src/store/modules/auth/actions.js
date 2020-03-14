export function singInRequest(id) {
  return {
    type: '@auth/SING_IN_REQUEST',
    payload: { id },
  };
}

export function singInSuccess(userId, profile) {
  return {
    type: '@auth/SING_IN_SUCCESS',
    payload: { userId, profile },
  };
}

export function singFailure() {
  return {
    type: '@auth/SING_FAILURE',
  };
}
