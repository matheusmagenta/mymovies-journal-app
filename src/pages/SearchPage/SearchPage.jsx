import React, { useState, useEffect } from "react";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { Form } from "react-bootstrap";

function SearchPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="movie-grid">
      <Form>
        <Form.Label visuallyHidden={true}>search by movie title</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          placeholder="search by movie title here"
          autoFocus={true}
          style={{ minWidth: "250px", maxWidth: "70%", marginBottom: "5px" }}
        ></Form.Control>
        <Pagination search={search} />
      </Form>
    </div>
  );
}

export default SearchPage;
