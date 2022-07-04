import './Loader.scss';
import { Spinner } from 'react-bootstrap';

interface loaderProps {
    loading: boolean
}

const Loader = (props: loaderProps) => {
    return(
        <>
            { props.loading && <div className="loading"><Spinner animation="border" variant="info" /> <br /> Loading&#8230;</div> }
        </>
    )
}

export default Loader;