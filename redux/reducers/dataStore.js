const initialState = {
    isCreatePost:false
}

const dataStore = (state = initialState, action ) => {
    switch(action.type){
        case "IS_CREATE_POST" :
            const data = {
                isCreatePost:action.payload
            }
            return data;
        
        default: return state;
    }
}
export default dataStore;