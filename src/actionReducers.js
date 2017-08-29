export const fetchPostsRequest = () => ({
    type: "FETCH_REQUEST"
});

export const fetchPostsSuccess = (payload) => ({
    type: "FETCH_SUCCESS",
    payload
});

export const fetchPostsError = () => ({
    type: "FETCH_ERROR"
});

