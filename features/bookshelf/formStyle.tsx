import { ColorPalette, FontSize } from "@/constants/useTheme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  addContainer: {
    marginTop: 10,
    alignItems: "center",
    flex: 1,
  },
  addHeader: {
    alignSelf: "center",
    fontSize: FontSize.large,
    fontWeight: "600",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    borderColor: ColorPalette.muted,
    borderStyle: "solid",
    borderWidth: 0.5,
    padding: 7,
    marginTop: 10,
    fontSize: FontSize.text,
  },

  btnOuterContainer: {
    width: "80%",
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
  icon: {
    paddingRight: 5,
  },

  //   AddBook

  subTitle: {
    fontWeight: "600",
    alignSelf: "flex-start",
    paddingLeft: "10%",
    marginBottom: 5,
    marginTop: 5,
  },
  isbnInput: {
    width: "80%",
    borderColor: ColorPalette.muted,
    borderStyle: "solid",
    borderWidth: 0.5,
    padding: 7,
    marginTop: 10,
    fontSize: FontSize.text,
  },
  isbnSearchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  barcodeIconContainer: {
    marginTop: 10,
  },
  barcodeIcon: {
    alignSelf: "center",
    paddingTop: 2,
    paddingLeft: 15,
  },
  border: {
    width: "90%",
    borderTopWidth: 1,
    borderTopColor: ColorPalette.muted,
    borderStyle: "solid",
    marginTop: 25,
    marginBottom: 20,
  },
  space: {
    marginBottom: 20,
  },
  inputContainer: {
    width: "80%",
    alignItems: "center",
  },

  // displaying search results
  resultsContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  resultsTitle: {
    marginBottom: 10,
    fontWeight: "600",
  },
  flatListContainer: {
    width: "80%",
    flex: 1,
  },

  bookContainer: {
    marginTop: 5,
  },
  bookInnerContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  bookCoverImage: {
    width: 60,
    height: 80,
  },
  descriptionContainer: {
    justifyContent: "center",
    flex: 1,
    paddingLeft: 10,
  },
  descriptionText: {
    textAlign: "left",
    fontSize: FontSize.sub,
    lineHeight: 16,
  },
  noMatchContainer: {
    flexDirection: "column",
    marginTop: 15,
    alignItems: "center",
  },
  noMatchText: {
    textDecorationLine: "underline",
    paddingLeft: 5,
    color: ColorPalette.blue,
  },
  noMatchSubtext: {
    marginTop: 5,
    color: ColorPalette.muted,
    fontSize: FontSize.sub,
  },

  listFooterContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 20,
  },

  //   AddQuotes
  quoteInput: {
    height: 100,
    width: "80%",
    borderColor: ColorPalette.muted,
    borderStyle: "solid",
    borderWidth: 0.5,
    padding: 7,
    marginTop: 10,
    fontSize: FontSize.text,
  },

  quotePageInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },

  quotePageInput: {
    width: "48%",
    borderColor: ColorPalette.muted,
    borderStyle: "solid",
    borderWidth: 0.5,
    padding: 7,
    marginTop: 10,
    fontSize: FontSize.text,
  },

  // edit quote
  deleteIcon: {
    color: ColorPalette.warning,
    paddingRight: 5,
  },
  deleteText: {
    color: ColorPalette.warning,
  },

  // modal
  closeIcon: {
    paddingLeft: 10,
  },
  modalContainer: {
    backgroundColor: ColorPalette.background,
    color: ColorPalette.text,
    paddingTop: 55,
    flex: 1,
  },
});

export default styles;
