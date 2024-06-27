import React, { useState, createContext } from 'react';
import './App.css';
import LandingPage from './components/LandingPage.jsx';
import SearchingPage from './components/SearchingPage.jsx';
import DescriptionPage from './components/DescriptionPage.jsx';
import 'semantic-ui-css/semantic.min.css';

//どこでも使えるようにexport
export const AppContext = createContext();

function App() {
  const [switchPage, setSwitchPage] = useState('Page1');//ページ遷移のコントロール用
  const [searchWord, setSearchWord] = useState('');//検索ワードを格納する
  const [comThumbnail, setComThumbnail] = useState([]);//検索に引っかかった企業一覧
  const [filteredCom, setFilteredCom] = useState();

  const toHome = () => {
    setSwitchPage('Page1');
  };

  const inputSearchWord = (word) => {
    if (word !== '') {
      setSearchWord(word);
      setSwitchPage('Page2');
    }
  };

  const toggleDesc = () => {
    const page = switchPage === 'Page2' ? 'Page3' : 'Page2';
    setSwitchPage(page)
  }

  const movePage = (id) => {
    setFilteredCom(comThumbnail.find(thumbnail => thumbnail.id === id));
    toggleDesc();
  };

  const returnToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <AppContext.Provider value={{ toHome, inputSearchWord, comThumbnail, setComThumbnail, returnToTop }}>
      {switchPage === 'Page1' && <LandingPage />}
      {switchPage === 'Page2' && <SearchingPage searchWord={searchWord} movePage={movePage} />}
      {switchPage === 'Page3' && <DescriptionPage filteredCom={filteredCom} toggleDesc={toggleDesc} />}
    </AppContext.Provider>
  );

}

export default App;
