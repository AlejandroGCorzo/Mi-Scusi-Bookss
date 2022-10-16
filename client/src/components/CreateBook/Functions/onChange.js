export default function onChange(e, newBook, setNewBook, author, setAuthor) {
  if (e.target.name === "author") {
    setNewBook({
      ...newBook,
      [e.target.name]: [...newBook[e.target.name], author.toLowerCase()],
    });
    setAuthor("");
    return;
  }
  setNewBook({ ...newBook, [e.target.name]: e.target.value });
}
