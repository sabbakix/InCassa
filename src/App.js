import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import "./styles.css";

const apiUrl = "https://opengraph.io/api/1.1/site";
const apiId = "99767da3-e9b1-4d0f-90cd-98ceebe0cd7b";

export default function App() {
  let [bookmarks, setBookmarks] = useState([]);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const lsBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(lsBookmarks);
    bookmarks = lsBookmarks;
    console.log("get", lsBookmarks);
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    console.log("set", bookmarks);
  }, [bookmarks]);

  function removeBookmark(e, url) {
    e.preventDefault();
    const filtered = bookmarks.filter((bookmark) => {
      return bookmark.url !== url;
    });
    setBookmarks(filtered);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const encodedUrl = encodeURIComponent(url);

    //fetch(apiUrl + "/" + encodedUrl + "?app_id=" + apiId)
    fetch(`${apiUrl}/${encodedUrl}?app_id=${apiId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newBookmark = {
          title: data.hybridGraph.title,
          image: data.hybridGraph.image,
          url: data.hybridGraph.url
        };
        const newBookmarks = [...bookmarks, newBookmark];
        setBookmarks(newBookmarks);
      });
  }

  //jsx
  return (
    <>
      {/* form */}
      {/*}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="https://www.google.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit"> Add </button>
      </form>
      */}
      <Container>
        <Row>
          <Form onSubmit={handleSubmit}>
            <Stack direction="horizontal" gap={3}>
              <Form.Control
                type="text"
                placeholder="Enter link"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <Button variant="primary" type="submit">
                Add
              </Button>
            </Stack>
          </Form>
        </Row>

        {bookmarks.map((bookmark, index) => (
          <a
            key={index}
            href={bookmark.url}
            className="bookmark"
            rel="noreferrer"
            target="_blank"
          >
            <Row className="bookmark-row">
              <Col xs={3}>
                <Image thumbnail src={bookmark.image} alt="{bookmark.title}" />
              </Col>
              <Col xs={8} className="bookmark-title">
                <span>{bookmark.title}</span>
              </Col>
              <Col xs={1}>
                <Button onClick={(e) => removeBookmark(e, bookmark.url)}>
                  X
                </Button>
              </Col>
            </Row>
          </a>
        ))}
      </Container>
    </>
  );
}
