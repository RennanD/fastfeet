export function addDeliverymanRequest({ name, email, avatar_id }) {
  return {
    type: '@deliveryman/ADD_REQUEST',
    payload: { name, email, avatar_id },
  };
}

export function addDeliverymanSuccess() {
  return {
    type: '@deliveryman/ADD_SUCCESS',
  };
}

export function addDeliverymanFailure() {
  return {
    type: '@deliveryman/ADD_FAILURE',
  };
}

export function showDeliverymanRequest(id) {
  return {
    type: '@deliveryman/SHOW_REQUEST',
    payload: { id },
  };
}

export function showDeliverymanSuccess(profile) {
  return {
    type: '@deliveryman/SHOW_SUCCESS',
    payload: { profile },
  };
}

export function showDeliverymanFailure() {
  return {
    type: '@deliveryman/SHOW_FAILURE',
  };
}

export function updateDeliverymanRequest(data) {
  return {
    type: '@deliveryman/UPDATE_REQUEST',
    payload: { data },
  };
}

export function updateDeliverymanSuccess() {
  return {
    type: '@deliveryman/UPDATE_SUCCESS',
  };
}

export function updateDeliverymanFailure() {
  return {
    type: '@deliveryman/UPDATE_FAILURE',
  };
}
