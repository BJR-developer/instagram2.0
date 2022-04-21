const initialState = {
    isCreatePost:false,
    isProfileMenu:false,
    uid:null
}

const dataStore = (state = initialState, action ) => {
    switch(action.type){
        case "IS_CREATE_POST" :{
            const data = {
                isCreatePost:action.payload
            }
            return data;
        }
        case "IS_PROFILE_MENU" :{
            const data = {
                isProfileMenu:action.payload
            }
            return data
        }
        case "UID":{
            return {
                uid:action.payload
            }
        }
        default: return state;
    }
}
export default dataStore;