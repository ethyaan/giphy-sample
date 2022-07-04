import React, { useState } from "react";
import { Modal, DropdownButton, Dropdown } from "react-bootstrap";

interface ViewModalPropTypes {
  show: boolean;
  onClose: () => void;
  data: any;
}

function ViewModal({ show, onClose, data }: ViewModalPropTypes) {
  const { title, images } = data ?? {};
  const [selectedSize, setSelectedSize] = useState('');

  const showImagePreview = () => {
    if(!selectedSize) return;
    const {url, mp4} = images[selectedSize];
    if(url) {
        return <img src={url}  alt=''/>
    } else if(mp4) {
        return <video src={mp4} muted autoPlay loop />
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        style={{ color: "black" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Select any of the available image variants
          <br />
          <DropdownButton
            id={`dropdown-variants-info`}
            variant={`info`}
            title={ selectedSize || `Select a image size`}
          >
            {images && Object.keys(images).map((imageKey: any, index: number) => {
                return(
                    <Dropdown.Item
                        eventKey={index}
                        key={`prevType-${index}`}
                        onClick={() => { setSelectedSize(imageKey); } }
                        >
                        {imageKey}
                    </Dropdown.Item>
                );
            })}
          </DropdownButton>
          <br />
          <br />
          { showImagePreview() }
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ViewModal;
