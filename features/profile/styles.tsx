import { ColorPalette, FontSize } from "@/constants/useTheme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    fontSize: FontSize.title,
    fontWeight: "600",
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  settingIcon: {
    paddingRight: 15,
    paddingTop: 12,
  },

  calendarContainer: {
    height: 200,
    width: "80%",
    borderWidth: 1,
    borderColor: ColorPalette.muted,
    marginBottom: 20,
    marginTop: 10,
  },
  statsContainer: {
    alignItems: "center",
    width: "80%",
    borderWidth: 1,
    borderColor: ColorPalette.muted,
    paddingTop: 10,
    paddingBottom: 20,
  },
  statsTitle: {
    fontSize: FontSize.large,
    fontWeight: "600",
  },
  stats: {
    marginTop: 10,
    width: "80%",
    flexDirection: "row",
    padding: 12,
  },
  statsIcon: {
    color: ColorPalette.success,
    alignSelf: "center",
    marginRight: 15,
  },

  statsTextContainer: {},
  statsText: {
    fontSize: FontSize.large,
    color: ColorPalette.text,
  },

  statsSubtext: {
    fontSize: FontSize.sub,
    color: ColorPalette.muted,
  },

  //   settings page
  container: {
    backgroundColor: ColorPalette.background,
    alignItems: "center",
  },
  usernameContainer: {
    alignItems: "baseline",
    width: "80%",
  },
  username: {
    fontSize: FontSize.large,
    paddingTop: 30,
  },
  editBtn: {
    borderWidth: 0.5,
    borderStyle: "solid",
    borderRadius: 5,
    paddingTop: 8,
    paddingBottom: 8,
    width: "100%",
    marginTop: 30,
    alignItems: "center",
  },

  redBtnContainer: {
    borderColor: ColorPalette.warning,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderRadius: 5,
    paddingTop: 8,
    paddingBottom: 8,
    width: "80%",
    marginTop: 20,
  },
  redBtnText: {
    fontSize: FontSize.text,
    color: ColorPalette.warning,
    alignSelf: "center",
  },

  // Edit Username Form
  editContainer: {
    width: "100%",
    color: ColorPalette.text,
    borderRadius: 10,
    borderColor: ColorPalette.muted,
    borderWidth: 0.5,
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  closeIcon: {
    paddingLeft: 8,
    paddingTop: 8,
  },
  usernameInput: {
    width: "90%",
    padding: 5,
    borderColor: ColorPalette.text,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderRadius: 5,
    marginBottom: 10,
  },
  updateBtnContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },
  updateBtn: {
    borderWidth: 0.5,
    borderColor: ColorPalette.text,
    borderRadius: 5,
    borderStyle: "solid",
    padding: 5,
    width: "45%",
    alignItems: "center",
  },
});

export default styles;
