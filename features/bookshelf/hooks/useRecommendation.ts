import { useState } from "react";
import { Alert } from "react-native";

type genre = {
  id: number;
  genre: string;
  selected: boolean;
};

type length = {
  id: number;
  length: string;
  selected: boolean;
};

type searchResult = {
  bookTitle: string;
  author: string;
  genres: string;
  details: string;
};

const iniGenreList: genre[] = [
  { id: 0, genre: "Fiction", selected: false },
  { id: 1, genre: "Non-Fiction", selected: false },
  { id: 2, genre: "Historical Fiction", selected: false },
  { id: 3, genre: "Science Fiction", selected: false },
  { id: 4, genre: "Romance", selected: false },
  { id: 5, genre: "Mystery", selected: false },
  { id: 6, genre: "Adventure", selected: false },
  { id: 7, genre: "Young Adults", selected: false },
  { id: 8, genre: "Thriller", selected: false },
  { id: 9, genre: "Classics", selected: false },
  { id: 10, genre: "Contemporary", selected: false },
  { id: 11, genre: "Self-Help", selected: false },
];

const iniLengthList: length[] = [
  { id: 0, length: "~ 250p", selected: false },
  { id: 1, length: "~ 500p", selected: false },
  { id: 2, length: "~ 750p", selected: false },
  { id: 3, length: "1000p ~", selected: false },
];

const useRecommendation = () => {
  const [favAuthor, setFavAuthor] = useState("");
  const [favBook, setFavBook] = useState("");
  const [keywords, setKeyword] = useState("");

  const [genreList, setGenreList] = useState(iniGenreList);
  const [lengthList, setLengthList] = useState(iniLengthList);

  const [searchRes, setSearchRes] = useState<searchResult[]>([]);
  const [searchSuccess, setSearchSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isAddBookVisible, setAddBookVisible] = useState(false);
  const [addBookTitle, setAddBookTitle] = useState("");
  const [addBookAuthor, setAddBookAuthor] = useState("");

  const toggleGenre = (itemID: number) => {
    setGenreList(
      genreList.map((item) => {
        if (item.id === itemID) {
          return { ...item, selected: !item.selected };
        } else {
          return item;
        }
      }),
    );
  };

  const toggleLength = (itemID: number) => {
    setLengthList(
      lengthList.map((item) => {
        if (item.id === itemID) {
          return { ...item, selected: !item.selected };
        } else {
          return item;
        }
      }),
    );
  };

  const genreToString = () => {
    let li = "";
    for (const data of genreList) {
      if (data.selected) {
        li += `${data.genre},`;
      }
    }

    if (li.trim().length === 0) {
      return null;
    }
    return li.slice(0, li.length - 1);
  };

  const lengthToString = () => {
    let li = "";
    for (const data of lengthList) {
      if (data.selected) {
        li += `${data.length},`;
      }
    }
    if (li.trim().length === 0) {
      return null;
    }

    return li.slice(0, li.length - 1);
  };

  const handleSearch = async () => {
    const bkgenre = genreToString();
    if (bkgenre === null) {
      Alert.alert(
        "Missing Field",
        "Please select at least one genre for better search. ",
      );
      return;
    }
    const bklength = lengthToString();

    let prompt = `Give 5 book recommendations. Return only valid JSON.
    Details should be 1-2 sentences. Simple, but make it catchy and compelling. 
    Books genres : ${bkgenre}. `;

    if (bklength !== null) {
      prompt += `Length: ${bklength}.\n`;
    }

    if (favAuthor.trim().length !== 0) {
      prompt += `Prioritize books similar to style of ${favAuthor}.\n`;
    }

    if (favBook.trim().length !== 0) {
      prompt += `Give a book for those enjoyed reading ${favBook}.\n`;
    }

    if (keywords.trim().length !== 0) {
      prompt += `Additional keywords: ${keywords}.\n`;
    }
    try {
      setLoading(true);
      const base = "https://geminiapi-elqywp3c4a-an.a.run.app";
      const res = await fetch(base, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: prompt,
        }),
      });
      if (!res.ok) {
        Alert.alert("", "Search failed. Please try again later. ");

        const text = await res.text();
        console.log("Server error:", res.status, text);
        setLoading(false);
        return;
      }
      const data: searchResult[] = await res.json();
      setSearchRes(data);

      Alert.alert("", "search success");
      setSearchSuccess(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("network error");
      console.log("Error in fetchBook(): " + error);
    }
  };

  return {
    toggleGenre,
    toggleLength,
    handleSearch,
    favAuthor,
    setFavAuthor,
    favBook,
    setFavBook,
    keywords,
    setKeyword,
    searchRes,
    searchSuccess,
    setSearchSuccess,
    loading,
    isAddBookVisible,
    setAddBookVisible,
    addBookAuthor,
    setAddBookAuthor,
    addBookTitle,
    setAddBookTitle,
    genreList,
    lengthList,
  };
};

export default useRecommendation;
