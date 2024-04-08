import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    balanceContainer: {
      backgroundColor: '#131a20',
      alignItems: 'center',
      justifyContent: 'center',
    },
    balanceTitle: {
      fontSize: 20,
      color: '#dde4eb',
    },
    balance: {
      paddingVertical: 20,
      fontSize: 32,
      color: '#dde4eb',
      fontWeight: 'bold',
    },
    headerContainer: {
      paddingVertical: 40,
      paddingHorizontal: 20,
    },
    header: {
      fontSize: 25, 
      alignContent: 'flex-start',
      color: '#dde4eb'
    },
    form: {
      paddingHorizontal: 10,
      formLabel: {
        fontSize: 20,
        color:'#dde4eb',
        marginLeft: 15,
        marginBottom: 10
      }
    },

  });

  export default styles;