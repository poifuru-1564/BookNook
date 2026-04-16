import { auth } from "@/firebase";
import { useEffect, useState } from "react";
import { stat } from "./screens/ProfileScreen";
import { handleWeeklyReset } from "./services";

const useStreaks = (weekRecords: stat[] | undefined) => {
  const [monday, setMonday] = useState("");
  const [sunday, setSunday] = useState("");
  const [isFailed, setFailed] = useState(false);

  const range = async () => {
    if (weekRecords === undefined) {
      setFailed(true);
    }

    const date = new Date();
    const date2 = new Date();
    const day = date.getDay();

    const uid = auth.currentUser?.uid;
    if (uid !== undefined) await handleWeeklyReset(uid);

    if (day === 0) {
      date.setDate(date.getDate() - 6);
      date2.setDate(date2.getDate());
    } else {
      date.setDate(date.getDate() - (day - 1));
      date2.setDate(date2.getDate() + (7 - day));
    }

    setMonday(
      date.toLocaleDateString("en-JP", { month: "long", day: "numeric" }),
    );
    setSunday(
      date2.toLocaleDateString("en-JP", { month: "long", day: "numeric" }),
    );
  };

  useEffect(() => {
    range();
  }, []);

  return { monday, sunday, isFailed };
};

export default useStreaks;
