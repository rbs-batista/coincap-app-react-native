import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    balanceContainer: {
      backgroundColor: '#131a20',
      alignItems: 'center',
      justifyContent: 'center',
    },
    balanceTitle: {
      fontSize: 18,
      color: '#dde4eb',
    },
    balance: {
      padding: 40,
      fontSize: 32,
      color: '#dde4eb',
      fontWeight: 'bold',
    },
    searchContainer: {
      flexDirection: 'row',
      backgroundColor: '#131a20',
      alignItems: 'center',
      position: 'relative',
      padding: 10,
      marginBottom: 20
    },
    searchInput: {
      backgroundColor: '#1c2329',
      borderRadius: 20,
      fontSize: 16,
      color: '#dde4eb',
      flex: 1,
      paddingVertical: 10,
      paddingLeft: 15,
    },
    clearIcon: {
      position: 'absolute',
      right: 20,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  export default styles;