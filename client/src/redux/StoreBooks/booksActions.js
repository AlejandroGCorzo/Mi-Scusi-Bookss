import axios from "axios";
import { getAllBooks, getBookById } from "./booksSlice.js";

export const getBooks = () => {
  return async (dispatch) => {
    let json = await axios.get("http://localhost:9000/books/allBooks");
    return dispatch(getAllBooks(json.data));
  };
};

export const getDetail = (id) => {
  return async (dispatch) => {
    let json = await axios.get(`http://localhost:9000/books/${id}`);
    return dispatch(getBookById(json.data));
  };
};
