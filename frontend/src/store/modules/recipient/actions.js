export function showRecipientRequest(id) {
  return {
    type: '@recipient/SHOW_REQUEST',
    payload: { id },
  };
}

export function showRecipientSuccess(profile) {
  return {
    type: '@recipient/SHOW_SUCCESS',
    payload: { profile },
  };
}

export function updateRecipientRequest(id, data) {
  return {
    type: '@recipient/UPDATE_REQUEST',
    payload: { id, data },
  };
}

export function updateRecipientSuccess() {
  return {
    type: '@recipient/UPDATE_SUCCESS',
  };
}

export function recipientFailure() {
  return {
    type: '@recipient/FAILURE',
  };
}
