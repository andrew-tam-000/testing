export default (state = {}, {payload, type}) => {
    switch(type) {
        case 'RESET_REPOSITORIES':
            return payload;
        default:
            return state;
    }
}
