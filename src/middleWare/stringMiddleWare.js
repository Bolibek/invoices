const stringMiddleware = () => next => action => {
  typeof action === 'string' ? next({type: action}) : next(action)
}

export default stringMiddleware
