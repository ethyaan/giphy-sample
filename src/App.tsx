import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getTrendingsAction,
  searchGifActions,
} from "./redux/slices/main.slice";
import { Col, Container, Row } from "react-bootstrap";
import Masonry from "react-masonry-css";
import Loader from "./components/Loader/Loader";
import GalleryItem from "./components/GalleryItem";
import NavigationBar from "./components/Navbar";
import GifsPagination from './components/Pagination'
import ViewModal from './components/ViewModal';
import "./App.css";


function App({ getTrendingsAction, searchGifActions, status, images, pagination }: any) {

  const { offset, count, total_count} = pagination;
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});
  const [currentOffset, setCurrentOffset] = useState(0);
  const [currentQuery, setCurrentQuery] = useState('all');

  const closeModal = () => { setShowModal(false); }

  const openModal = (selectedItem: any) => {
    setSelectedImage(selectedItem);
    setShowModal(true);
  }

  const updatePage = (currentOffsetValue: number) => {
    setCurrentOffset(currentOffsetValue);
  }

  const updateSearchValue = (searchQuery: string) => {
    setCurrentOffset(0);
    setCurrentQuery(searchQuery);
  }

  useEffect(() => {
    searchGifActions({ q: currentQuery, offset: currentOffset });
  }, [searchGifActions, currentOffset, currentQuery]);

  return (
    <>
      <Loader loading={status === "loading"} />
      <Container>
        <NavigationBar onSearch={updateSearchValue} />
        <Row>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {images.map((item: any, index: number) => (
              <GalleryItem key={`image-${index}`} image={item} onClick={() => { openModal(item); }} />
            ))}
          </Masonry>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <GifsPagination offset={offset} count={count} total={total_count} onChange={updatePage} />
          </Col>
        </Row>
      </Container>
      <ViewModal show={showModal} onClose={() => { closeModal(); }} data={selectedImage} />
    </>
  );
}

export default connect((state: any) => ({ ...state.main }), {
  getTrendingsAction,
  searchGifActions,
})(App);
