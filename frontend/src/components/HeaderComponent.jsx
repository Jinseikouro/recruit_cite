import React from 'react';
import { useState, useContext } from 'react';
import './HeaderComponent.css';
import { Image, Input, Button } from 'semantic-ui-react';
import { AppContext } from '../App';



const HeaderComponent = () => {
    const { toHome } = useContext(AppContext);
    const [inputText, setInputText] = useState('');
    const { inputSearchWord } = useContext(AppContext);

    const handleInputText = (input) => {
        setInputText(input.target.value);
    };

    const startSearch = () => {
        const word = inputText ?? '';
        inputSearchWord(word);
    };

    return (
        <div id="header">
            <Image
                id="image"
                src={process.env.PUBLIC_URL + '/logo.png'}
                alt="Logo"
                style={{ width: '100px', height: 'auto' }}
                onClick={toHome}
            />
            <p id="comname" onClick={toHome}>テック転職</p>
            <Input type="text" placeholder="職種や経験などで検索！" onChange={handleInputText} />
            <Button primary onClick={startSearch}>検索</Button>
        </div>
    );
}

export default HeaderComponent;
