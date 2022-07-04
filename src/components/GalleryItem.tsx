import React from 'react';
import { Card } from 'react-bootstrap';

interface GalleryItemPropTypes {
    image: any;
    onClick: () => void;
}
const GalleryItem = (props: GalleryItemPropTypes) => {
    const { title, images: { fixed_height_still: { url } } } = props.image;
    return(
        <Card onClick={props.onClick}>
            <Card.Img variant="top" src={url} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default GalleryItem;