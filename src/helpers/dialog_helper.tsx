import Toast from "react-native-tiny-toast";
import { rgba } from 'polished';

export const Dialog = {
    success({message}: {message: string}) {
        Toast.show(message, {
            position: Toast.position.CENTER,
        });
    },

    error({message}: {message: string}) {
        const redLight = rgba(255, 0, 0, 0.5);
        Toast.show(message, {
            position: Toast.position.CENTER,
            containerStyle: {
                backgroundColor: redLight,
            },
        });
    },
};
