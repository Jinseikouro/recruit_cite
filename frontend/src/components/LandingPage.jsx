import React from 'react'
import './LandingPage.css';
import HeaderComponent from './HeaderComponent.jsx';
import Advertisement from './Advertisement.jsx';
import FooterComponent from './FooterComponent';
import { Image, Header } from 'semantic-ui-react';

const LandingPage = () => {
    return (
        <>
            <HeaderComponent />
            <div id="body">
                <div id="land-body">
                    <div>
                        <div id="background">
                            <Header as='h1' id="h1">
                                新しい仕事へ！
                            </Header >
                        </div>
                        <Image
                            id="top-image"
                            src={process.env.PUBLIC_URL + '/photo-1522202176988-66273c2fd55f.avif'}
                            alt="image"
                            style={{ width: '1000px', height: 'auto' }}
                        />
                    </div>
                    <Advertisement />
                </div>
            </div>
            <FooterComponent />
        </>
    )
}

export default LandingPage