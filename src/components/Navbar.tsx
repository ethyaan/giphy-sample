import { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

interface navigationBarPropTypes {
  onSearch: (searchQuery: string) => void;
}

const NavigationBar = ({ onSearch }: navigationBarPropTypes) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: any) => {
    let fleldVal = event.target.value;
    setQuery(fleldVal);
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container fluid>
        <Navbar.Brand href="#">Giphy Task App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={handleChange}
            />
            <Button
              variant="outline-success"
              onClick={() => {
                onSearch(query);
              }}
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
