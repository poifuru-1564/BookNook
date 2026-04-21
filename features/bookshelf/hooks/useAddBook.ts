import { Book, googleBookList } from "@/constants/interface";
import { auth } from "@/firebase";
import { useEffect, useState } from "react";
import { Alert, Keyboard, KeyboardEventListener } from "react-native";
import {
  handleAddBook,
  handleAddToWishlist,
  handleEditPageCount,
  handleGetBook,
  handleManualInput,
} from "../bookServices";

const useAddBook = (
  setAddBookVisible: (isVisible: boolean) => void,
  initAuthor: string | undefined,
  initTitle: string | undefined,
  initISBN: string | undefined,
) => {
  const [isbn, setISBN] = useState(initISBN ?? "");
  const [author, setAuthor] = useState(initAuthor ?? "");
  const [title, setTitle] = useState(initTitle ?? "");
  const [pageNum, setPageNum] = useState(""); // only for manual inputs

  const [searchRes, setSearchRes] = useState<Book[]>([]);

  const [isFailed, setisFailed] = useState(false); // search failed -> display manual input form
  const [isSearchFin, setisSearchFin] = useState(false); // search fin successfully -> display results
  const [isManualLinkVisible, setisManualLinkVisible] = useState(false); // match not found -> suggest to input manually

  const [loading, setLoading] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const uid = auth.currentUser?.uid;

  const fetchByISBN = async () => {
    if (isbn.trim().length !== 10 && isbn.trim().length !== 13) {
      Alert.alert("Invalid ISBN", "ISBNs must be 10 or 13 digits long");
      return;
    }
    const param = "isbn:" + isbn.trim();

    // start search
    setLoading(true);

    const doc = await handleGetBook(isbn.trim());
    if (!doc) {
      fetchBook(param);
    } else {
      // already in the books collection -> display -> select
      const data = doc.data();
      if (data === undefined) {
        fetchBook(param);
      } else {
        setSearchRes([
          {
            isbn: doc.id,
            title: data.title,
            author: data.author,
            pageCount: data.pageCount,
            imageLink: data.imageLink,
          },
        ]);
        setLoading(false);
        setisSearchFin(true);
      }
    }
  };

  const fetchByName = async () => {
    let param = "";
    if (author.trim().length === 0 && title.trim().length === 0) {
      Alert.alert("No input", "Fill in either title or author");
      return;
    }
    if (author.trim().length !== 0) {
      param = "inauthor:" + author.trim();
    }

    if (title.trim().length !== 0) {
      if (param.length === 0) {
        param = param + "intitle:" + title.trim();
      } else {
        param = param + "+intitle:" + title.trim();
      }
    }

    setLoading(true);
    fetchBook(param);
  };

  const fetchBook = async (param: string) => {
    try {
      const base =
        "https://asia-northeast1-booknook-4162c.cloudfunctions.net/bookApi";
      const res = await fetch(`${base}?q=${param}`);
      console.log(res.status);
      if (!res.ok) {
        Alert.alert(
          "",
          "Failed to fetch book description. Enter book info manually.",
        );
        setisFailed(true);
        setLoading(false);
        return;
      }
      // read res body, parse the json, return a JS object
      const data: googleBookList = await res.json();

      if (data.totalItems === 0) {
        Alert.alert("Match Not Found", "Check if your input is correct");
        setisManualLinkVisible(true);
        setLoading(false);
        return;
      }

      const list: Book[] = data.items.map((item) => {
        const field = item.volumeInfo;

        let link = field.imageLinks?.smallThumbnail;

        if (link !== undefined) {
          link = link.replace("http:", "https:");
        }

        return {
          isbn:
            field.industryIdentifiers?.find((isbn) => isbn.type === "ISBN_13")
              ?.identifier ||
            field.industryIdentifiers?.find((isbn) => isbn.type === "ISBN_10")
              ?.identifier ||
            "ISBN N/A",
          title: field.title || "Title N/A",
          author: field.authors || "Author N/A",
          pageCount: field.pageCount || -1,
          imageLink: link || "N/A",
        };
      });

      setSearchRes(list);
      setLoading(false);
      setisSearchFin(true);
    } catch (error) {
      setLoading(false);
      alert("network error");
      console.log("Error in fetchBook(): " + error);
      setisFailed(true);
    }
  };

  // check if isbn is already in books collection -> null -> call fetchBook
  // json -> select -> input info into form field -> onPress -> store in books db -> store to user's book collection
  // -> redirect to Wishlist -> display

  const onSelected = async (item: Book) => {
    try {
      if (typeof uid !== "string") return;

      //  no ISBN
      if (item.isbn === "ISBN N/A") {
        await handleManualInput(
          uid,
          item.title,
          item.author,
          item.pageCount,
          item.imageLink,
        );
        Alert.alert("", "Added to your wishlist");
        setAddBookVisible(false);
        return;
      }

      // add to book collection
      await handleAddBook(item);

      // add to user's bookshelf, set status to wishlist
      await handleAddToWishlist(uid, item.isbn, item.imageLink, item.title);

      if (item.pageCount !== -1)
        await handleEditPageCount(uid, item.isbn, item.pageCount);

      Alert.alert("", "Added to your wishlist");
      setAddBookVisible(false);
    } catch (error) {
      console.log("Error onSelected(): " + error);
      Alert.alert("", "Failed to add book to your wishlist. Please try again.");
    }
  };

  const onManuallyBtnPressed = async () => {
    setisSearchFin(false);
    setisFailed(true);
  };

  const onManualLinkPressed = () => {
    setisManualLinkVisible(false);
    setisFailed(true);
  };

  const onSearchAgainPressed = () => {
    setisSearchFin(false);
    setisFailed(false);
  };

  const manualInput = async () => {
    try {
      if (typeof uid !== "string") return;
      pageNum.trim().length !== 0
        ? await handleManualInput(uid, title, author, parseInt(pageNum))
        : await handleManualInput(uid, title, author);
      Alert.alert("", "Added to your wishlist");
      setAddBookVisible(false);
    } catch (error) {
      console.log("Error manualInput:" + error);
      Alert.alert("", "Failed to add book to your wishlist. Please try again");
    }
  };
  // adding from book recommendation page
  useEffect(() => {
    if (initAuthor !== undefined && initTitle !== undefined) {
      setAuthor(initAuthor);
      setTitle(initTitle);
    }

    if (initISBN !== undefined) {
      setISBN(initISBN);
    }
  }, []);

  // keyboard
  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardShow,
    );

    const hideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardHide,
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleKeyboardShow: KeyboardEventListener = (event) => {
    setKeyboardHeight(event.endCoordinates.height);
    setKeyboardVisible(true);
  };

  const handleKeyboardHide: KeyboardEventListener = (event) => {
    setKeyboardVisible(false);
  };

  return {
    isbn,
    setISBN,
    author,
    setAuthor,
    title,
    setTitle,
    pageNum,
    setPageNum,
    searchRes,
    isManualLinkVisible,
    isFailed,
    isSearchFin,
    loading,
    keyboardHeight,
    isKeyboardVisible,

    fetchByISBN,
    fetchByName,
    onSelected,
    onManuallyBtnPressed,
    onManualLinkPressed,
    onSearchAgainPressed,
    manualInput,
  };
};

export default useAddBook;
