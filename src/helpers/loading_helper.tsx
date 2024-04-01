import Toast from "react-native-tiny-toast";

export const Loading = {
    toastRef: null,

    start() {
        this.toastRef = Toast.showLoading('Loading...');
    },

    finished() {
        Toast.hide(this.toastRef);
        this.toastRef = null;
    },
};
