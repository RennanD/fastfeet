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
