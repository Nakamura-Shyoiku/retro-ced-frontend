export function openDrawer() {
  return (dispatch) => {
    dispatch({
      type: 'OPEN_FILTER_DRAWER',
      isOpen: true,
    });
  };
}

export function closeDrawer() {
  return (dispatch) => {
    dispatch({
      type: 'CLOSE_FILTER_DRAWER',
    })
  }
}