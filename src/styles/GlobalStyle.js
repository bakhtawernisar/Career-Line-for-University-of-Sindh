import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { COLORS, SIZES } from "../constants";

export const Globalstyles = StyleSheet.create({

  container_1: {
    paddingTop: 8,
    flex: 1,
    backgroundColor: COLORS.white
  },

  container_2: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.white
  },

  logo: {
    width: '100%',
    height: '25%',
    marginBottom: SIZES.padding * 3,
    marginTop: SIZES.padding * 2

  },

  input: {
    borderRadius: 15,
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderWidth: 0.75,
    padding: 10,
    marginVertical: 4,

  },

  errorText: {
    color: 'crimson',
    marginBottom: 8,
  },

  hyperlink_container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: SIZES.padding * 3
  },

  hyperlink_text: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginLeft: 5
  },

  account_text: {
    color: COLORS.black
  },

  main_heading: {
    fontSize: RFPercentage(2.8),
    alignSelf: 'center',
    color: COLORS.black,
    fontWeight: 'bold',
    marginVertical: 40,
  },


});
