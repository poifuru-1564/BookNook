import { ColorPalette, FontSize } from "@/constants/constantValues";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  signinBtnContainer: {
    borderColor: ColorPalette.muted,
    borderWidth: 0.5,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 15,
    width: "60%",
    alignItems: "center",
  },
  signinBtn: {
    paddingVertical: 5,
    color: ColorPalette.grey,
    fontFamily: "Georgia",
  },
  innerContainer: {
    marginVertical: 15,
    width: "100%",
  },
  inputContainer: {
    padding: 5,
    marginBottom: 12,
    backgroundColor: ColorPalette.background,
    width: "60%",
    borderWidth: 0.5,
    borderColor: ColorPalette.muted,
    borderRadius: 5,
  },

  // login
  loginOuterContainer: {
    alignItems: "center",
    backgroundColor: ColorPalette.card,
    flex: 1,
    paddingTop: 150,
  },
  iconPic: {
    height: 150,
    width: 150,
  },
  resetText: {
    fontWeight: "500",
    textDecorationLine: "underline",
    fontFamily: "Georgia",
    fontSize: FontSize.sub,
    color: ColorPalette.grey,
  },
  bordelineContainer: {
    flexDirection: "row",
    width: "70%",
    marginVertical: 20,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  borderline: {
    borderBottomColor: ColorPalette.muted,
    borderBottomWidth: 0.5,
    flex: 1,
    marginBottom: 5,
  },
  borderlineText: {
    fontFamily: "Georgia",
    color: ColorPalette.grey,
    paddingHorizontal: 10,
  },
  createContainer: {
    alignSelf: "center",
    flexDirection: "row",
    gap: 8,
  },
  createLinkText: {
    fontFamily: "Georgia",
    textDecorationLine: "underline",
    textDecorationColor: ColorPalette.grey,
    color: ColorPalette.grey,
  },
  text: {
    fontFamily: "Georgia",
    color: ColorPalette.grey,
    alignSelf: "center",
  },
  passReqText: {
    color: ColorPalette.muted,
    fontFamily: "Georgia",
    marginBottom: 10,
    width: "60%",
  },
  // create & reset page
  outerContainer: {
    backgroundColor: ColorPalette.card,
    flex: 1,
  },
  backIcon: { paddingLeft: 15 },
  container: {
    alignItems: "center",
    paddingTop: 35,
  },
  signInContainer: {
    alignItems: "center",
  },
  header: {
    fontSize: FontSize.title,
    fontFamily: "Georgia",
    color: ColorPalette.grey,
  },

  resetPassSubText: {
    color: ColorPalette.muted,
    fontFamily: "Georgia",
    marginTop: 10,
  },
});
