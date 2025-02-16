// Reducer function for tally counter

function reducer(state = { count: 0 }, action) {
    switch (action.type) {
        case 'INCREMENT':
            return {...state, count: state.count + 1 };
        case 'DECREMENT':
            return {...state, count: state.count - 1 };
        case 'RESET':
            return {...state, count: 0 };
        default:
            return state;
    }
}
// create a store function that manages state
createStore = (reducer) => {
    let state;
    let listeners = [];

    // Get current state
    function getState ()  {
        return state;
    }
// Dispatch actions to modify the state
    function dispatch (action) {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }
// Subscibe to state changes

    function subscribe (listener) {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    }

// Initialize state

dispatch({});

    return { getState, dispatch, subscribe };

}
// Create store with reducer
const store = createStore(reducer);
// Subscribe to log a state change
store.subscribe(() => console.log('State updated:' , store.getState() ));


// Add event listeners for button clicks
const addBtnClick = document.getElementById('increment').addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT' });
});
const subtractBtnClick = document.getElementById('decrement').addEventListener('click', () => {
    store.dispatch({ type: 'DECREMENT' });
});
const resetBtnClick = document.getElementById('reset').addEventListener('click', () => {
    store.dispatch({ type: 'RESET' });
});
// Initial state log
console.log("Initial state:", store.getState());
