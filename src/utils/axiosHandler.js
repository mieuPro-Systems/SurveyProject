import { useDispatch } from "react-redux";
import { SET_LOADING_FALSE, SET_LOADING_TRUE, SET_SHOW_SNACKBAR_TRUE } from "../actions/types";
import axiosInstance from "./axiosInstance";


export function PostRequest(postinfo, postData) {

    const status = false

    return status
}

export function PutRequest(postinfo, postData) {
    const route = postinfo.route
    const message = postinfo.message
    // const dispatch = useDispatch()
    const response = {
        status: false,
        data: ""
    }
    // dispatch({
    //     type: SET_LOADING_TRUE,
    // });
    axiosInstance.put(route, postData)
        .then((res) => {
            if (res.status === 200) {
                console.log("Uploaded Successfully", res.data);
                response.status = true
                response.data = res.data
                // dispatch({
                //     type: SET_SHOW_SNACKBAR_TRUE,
                //     payload: {
                //         snackBarMessage: `${message} Added Successfully`,
                //         snackBarColor: "success",
                //     },
                // });
                // dispatch({
                //     type: SET_LOADING_FALSE,
                // });
            }
            if (res.status === 400) {
                console.log("Error", res.data);
                response.status = false
                response.data = res.data
                // dispatch({
                //     type: SET_SHOW_SNACKBAR_TRUE,
                //     payload: {
                //         snackBarMessage: `Error while adding ${message}`,
                //         snackBarColor: "warning",
                //     },
                // });
                // dispatch({
                //     type: SET_LOADING_FALSE,
                // });
            }
        }).catch(err => {
            console.log("Error", err)
            response.status = false
            response.data = err
            // dispatch({
            //     type: SET_SHOW_SNACKBAR_TRUE,
            //     payload: {
            //         snackBarMessage: `Error while adding ${message}`,
            //         snackBarColor: "warning",
            //     },
            // });
            // dispatch({
            //     type: SET_LOADING_FALSE,
            // });
        })

    return response
}