/**
 * Logging middleware
 */
export default store => next => (action) => {
  if (process.env.NODE_ENV === 'development') {
    console.group(action.type);
    console.info('Dispatching', action);
    console.log('Next state', store.getState());
    console.groupEnd(action.type);
  }
  return next(action);
};

