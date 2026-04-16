import { ColorPalette, FontSize } from "@/constants/constantValues";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  emptyMessage: {
    justifyContent: "center",
    paddingTop: 50,
    flexDirection: "row",
  },
  emptyMessageText: {
    fontWeight: "600",
    fontSize: FontSize.large,
  },
  refreshText: {
    alignSelf: "center",
    color: ColorPalette.blue,
    paddingTop: 10,
  },

  // card
  cardContainer: {
    width: "85%",
    marginBottom: 15,
    alignSelf: "center",
  },
  cardTabContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 15,
  },
  cardCount: {
    fontSize: FontSize.sub,
    fontFamily: Platform.OS === "ios" ? "Charter" : "serif",
    fontWeight: "500",

    color: ColorPalette.card,
    backgroundColor: ColorPalette.blue,
    width: 60,
    height: 25,
    paddingTop: 5,
    textAlign: "center",
    borderColor: ColorPalette.blue,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    borderTopWidth: 2,
  },
  cardBorder: {
    borderColor: ColorPalette.blue,
    borderStyle: "solid",
    borderTopWidth: 10,
    borderTopStartRadius: 4,
    borderTopEndRadius: 4,
  },
  cardMainContainer: {
    backgroundColor: ColorPalette.card,
    borderBottomStartRadius: 6,
    borderBottomEndRadius: 6,
    shadowColor: "#4c4c3b",
    shadowOpacity: 0.15,
    shadowRadius: 7,
    shadowOffset: { width: 1, height: 4 },
  },
  cardTitle: {
    fontSize: FontSize.large,
    fontWeight: "700",
    padding: 10,
    textAlign: "left",
    color: ColorPalette.blue,
    fontFamily: Platform.OS === "ios" ? "Charter" : "serif",
  },
  doubleLine: {
    borderTopColor: ColorPalette.blue,
    borderBottomColor: ColorPalette.blue,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderStyle: "solid",
    paddingTop: 5,
    borderWidth: 1.5,
    marginBottom: 5,
  },

  bkOuterContainer: {
    flexDirection: "row",
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 15,
  },
  bkInnerContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
  },
  bkDetailContainer: {
    borderBottomColor: ColorPalette.blue,
    borderStyle: "solid",
    paddingBottom: 2,
    borderBottomWidth: 1,
    flexDirection: "row",
    marginBottom: 0,
  },
  bkDetail: {
    fontSize: FontSize.sub,
    fontWeight: "700",
    paddingLeft: 5,
    color: ColorPalette.blue,
    fontFamily: Platform.OS === "ios" ? "Charter" : "serif",
  },
  cardBtnContainer: {
    justifyContent: "center",
    flexDirection: "column",
    gap: 10,
  },
  cardBtn: {
    borderColor: ColorPalette.lightBlue,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    paddingTop: 6,
    paddingBottom: 6,
    width: "40%",
    alignSelf: "center",
  },
  cardBtnText: {
    color: ColorPalette.blue,
    fontFamily: Platform.OS === "ios" ? "Charter" : "serif",
    fontSize: FontSize.sub,
    alignSelf: "center",
  },

  closeIcon: {
    paddingLeft: 18,
  },

  imgContainer: {
    width: 80,
    height: 120,
  },

  //return modal
  overlay: {
    backgroundColor: ColorPalette.blackOverlay,
    flex: 1,
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    width: "75%",
    marginHorizontal: "auto",
  },
  returnContainer: { alignItems: "center" },

  modalHeader: {
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "Charter" : "serif",
    marginBottom: 10,
    color: ColorPalette.blue,
  },
  pageInputContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  pageInput: {
    borderColor: ColorPalette.text,
    borderBottomWidth: 0.5,
    paddingBottom: 2,
    width: "auto",
    marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: FontSize.sub,
  },
  pageInputText: {
    fontSize: FontSize.sub,
    paddingLeft: 8,
    paddingTop: 3,
  },
  modalTextContainer: {
    gap: 5,
    marginBottom: 15,
    alignItems: "center",
  },
  modalText: {
    fontSize: FontSize.sub,
    fontFamily: Platform.OS === "ios" ? "Charter" : "serif",
  },

  // review
  //   reviewContainer: {
  //     paddingRight: 10,
  //     paddingLeft: 10,
  //   },
  //   reviewInput: {
  //     height: 150,
  //     borderColor: ColorPalette.muted,
  //     borderWidth: 0.5,
  //     padding: 9,
  //     fontSize: FontSize.sub,
  //     marginBottom: 20,
  //   },
  //   addBtn: {
  //     marginTop: 10,
  //     borderStyle: "solid",
  //     borderWidth: 0.5,
  //     borderColor: ColorPalette.muted,
  //     padding: 7,
  //     paddingRight: 12,
  //     paddingLeft: 9,
  //     borderRadius: 5,
  //   },
  //   reviewModalPageText: {
  //     fontSize: FontSize.sub,
  //     color: ColorPalette.blue,
  //   },

  fullModalContainer: {
    backgroundColor: "white",
    color: ColorPalette.text,
    paddingTop: 55,
    flex: 1,
  },

  // edit page count

  editPageContainer: {
    alignSelf: "flex-end",
    gap: 0,
  },
  modalSubtext: {
    paddingRight: 15,
    fontSize: 10,
    color: ColorPalette.blue,
  },

  editFormContainer: {
    padding: 7,
    alignItems: "center",
  },

  editForm: {
    borderColor: ColorPalette.muted,
    borderBottomWidth: 0.5,
    width: 100,
    fontSize: FontSize.sub,
    paddingBottom: 2,
    paddingLeft: 3,
    marginBottom: 20,
    marginTop: 10,
  },

  btnOuterContainer: {
    width: "80%",
    alignSelf: "center",
  },

  btnInnerContainer: {
    marginTop: 15,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: ColorPalette.muted,
    padding: 7,
    borderRadius: 5,
  },

  btn: { flexDirection: "row", alignSelf: "center" },
});
