import { auth } from "@/firebase";
import { useEffect, useState } from "react";
import { stat } from "./screens/ProfileScreen";
import { handleGetProfile } from "./services";

const useProfile = () => {
  const [total, setTotal] = useState(0);
  const [progress, setProgress] = useState(0);
  const [pages, setPages] = useState(0);
  const [streakDays, setStreakDays] = useState(0);
  const [records, setRecords] = useState<stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [yearCurrent, setYearCurrent] = useState(0);
  const [yearGoal, setYearGoal] = useState();

  const getStats = async () => {
    const uid = auth.currentUser?.uid;
    if (uid === undefined) return;

    const year = new Date().getFullYear();
    const yearStatField = "yearStat" + year;

    try {
      const docSnap = await handleGetProfile(uid);
      if (!docSnap?.exists() || docSnap.data() === undefined) {
        return;
      }

      setTotal(docSnap.data()?.finishedBooks);
      setProgress(docSnap.data()?.booksInProgress);
      setPages(docSnap.data()?.totalPages);
      setStreakDays(docSnap.data()?.streakCount);

      const records = docSnap.data()?.weeklyStats || {};
      const recordsArr = Object.keys(records)
        .sort()
        .map((key) => records[key]);

      setRecords(recordsArr);

      const stat = docSnap.data()?.[yearStatField];
      if (stat !== undefined) {
        setYearCurrent(stat.total);
        setYearGoal(stat.goal);
      }
    } catch (error) {
      console.log("getStats: " + error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getStats();
  }, []);

  const refresh = async () => {
    setLoading(true);
    await getStats();
    setLoading(false);
  };

  return {
    total,
    progress,
    pages,
    streakDays,
    records,
    yearCurrent,
    yearGoal,
    loading,
    refresh,
  };
};

export default useProfile;
