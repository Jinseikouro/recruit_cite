import React, { useContext } from 'react';
import { Button } from 'semantic-ui-react';
import './FooterComponent.css';
import { AppContext } from '../App';

const FooterComponent = () => {
    const { returnToTop } = useContext(AppContext);
    return (
        <div id="footer-style">
            <Button onClick={returnToTop}>Topに戻る</Button>
        </div >
    )
}

export default FooterComponent