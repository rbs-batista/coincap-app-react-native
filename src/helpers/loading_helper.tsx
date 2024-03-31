import Toast from "react-native-tiny-toast";

export const Loading = {
    toastRef: null,

    start() {
        this.toastRef = Toast.showLoading('Loading...');
    },

    finished() {
        console.log("Toast:" + this.toastRef)
            Toast.hide(this.toastRef);
            this.toastRef = null;
    },
};
