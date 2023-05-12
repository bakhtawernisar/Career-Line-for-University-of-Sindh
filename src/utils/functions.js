import { Alert } from "react-native";

export const Errored = (err) => {
    if (err.request?.status) {
        console.log(err.request, 'request')
        let error = resolveStatusCode(err.request.status)
        if (error)
            Alert.alert(err.request.status >= 500 ? 'Server Error' : 'Error', error);
        else
            Alert.alert(err.request.status >= 500 ? 'Server Error' : 'Error', err.request._response);

    } else if (err.response?.status) {
        console.log(err.request, 'response')
        let error = resolveStatusCode(err.response.status)
        if (error)
            Alert.alert(err.response.status >= 500 ? 'Server Error' : 'Error', error);
        else
            Alert.alert(err.request.status >= 500 ? 'Server Error' : 'Error', err.message);

    } else {
        Alert.alert('Error', err.message);
    }
}

function resolveStatusCode(statusCode) {
    switch (statusCode) {
        case 400:
            return "Bad Request"
        case 401:
            return "Unauthorized"
        case 403:
            return "Forbidden"
        case 408:
            return "Request Timeout"
        case 415:
            return "Unsupported Media Type"
        case 429:
            return "Too Many Requests"
        case 500:
            return "Internal Server Error"
        case 502:
            return "Bad Gateway"
        case 503:
            return "Service Unavailable"
        case 504:
            return "Gateway Timeout"
        case 511:
            return "Network Authentication Required"
        default:
            return null;
    }

}