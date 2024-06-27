import React, { useEffect, useContext } from 'react'
import './SearchingPage.css';
import HeaderComponent from './HeaderComponent.jsx';
import FooterComponent from './FooterComponent.jsx';
import { Card, Image } from 'semantic-ui-react';
import { AppContext } from '../App';

const SearchingPage = ({ searchWord, movePage }) => {
    const { comThumbnail, setComThumbnail } = useContext(AppContext);

    useEffect(() => {
        if (searchWord != '') {
            postSearchWord({ word: searchWord })
                .then(data => {
                    setComThumbnail(data);
                    console.log(comThumbnail);
                });
        }
    }, [searchWord])

    const postSearchWord = async (inputData) => {
        const res = await fetch('http://localhost:5000/company', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputData)
        });
        return res.json();
    }

    return (
        <>
            <HeaderComponent />
            <div id="search-word">#検索ワード：{searchWord}</div>
            {comThumbnail.length !== 0 &&
                <div id="tn-container">
                    {comThumbnail.map((company, index) => (
                        <Card key={index} className="custom-card" onClick={() => movePage(company.id)}>
                            <Image
                                src={`data:${company.photo_info.photo_type};base64,${company.photo_info.photo}`}
                            />
                            <Card.Content>
                                <Card.Header>{company.name}</Card.Header>
                                <Card.Description>{company.description}</Card.Description>
                            </Card.Content>
                        </Card>
                    ))}
                </div>
            }
            {comThumbnail.length === 0 &&
                <div id="fail">検索結果が見つかりませんでした。</div>

            }
            <FooterComponent />
        </>
    )
}

export default SearchingPage