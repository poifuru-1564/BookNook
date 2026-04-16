import { ColorPalette, FontSize } from "@/constants/constantValues";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  refreshIcon: {
    color: ColorPalette.blue,
    position: "absolute",
    bottom: 0,
  },

  container: {
    alignItems: "center",
    width: "100%",
  },

  streakContainer: {
    width: "100%",
    marginVertical: 10,
  },
  subTitle: {
    fontSize: FontSize.large,
    fontWeight: "600",
    paddingLeft: 20,
  },

  // streaks

  innerContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 10,
  },

  circleIcon: {
    paddingVertical: 5,
  },
  listContainer: {
    alignSelf: "center",
    paddingTop: 15,
  },

  // stats
  statsContainer: {
    marginTop: 25,
  },

  statsRow: {
    flexDirection: "row",
    marginBottom: 5,
    width: "100%",
  },
  stats: {
    flexDirection: "row",
    padding: 12,
    justifyContent: "flex-start",
    width: "50%",
  },
  statsIcon: {
    color: ColorPalette.success,
    alignSelf: "center",
    marginRight: 15,
  },

  statsText: {
    fontSize: FontSize.large,
    color: ColorPalette.text,
  },

  statsSubtext: {
    fontSize: FontSize.sub,
    color: ColorPalette.muted,
    paddingTop: 2,
  },

  //   settings page

  logoutContainer: {
    marginTop: 20,
    width: "100%",
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
    paddingVertical: 20,
    paddingHorizontal: 10,
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
    padding: 8,
    borderColor: ColorPalette.muted,
    borderWidth: 0.5,
    borderRadius: 5,
    marginBottom: 15,
  },
  updateBtnContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },
  updateBtn: {
    borderWidth: 0.5,
    borderColor: ColorPalette.muted,
    borderRadius: 5,
    padding: 5,
    width: "45%",
    alignItems: "center",
  },
});

export default styles;
