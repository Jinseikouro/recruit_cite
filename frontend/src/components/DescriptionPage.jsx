import React from 'react';
import HeaderComponent from './HeaderComponent.jsx';
import FooterComponent from './FooterComponent.jsx';
import { Header, Button, Image, GridRow, GridColumn, Grid } from 'semantic-ui-react';
import './DescriptionPage.css';

const DescriptionPage = ({ filteredCom, toggleDesc }) => {

    return (
        <>
            <HeaderComponent />
            <div id="desc-style">
                <Grid centered style={{ maxWidth: '700px' }}>
                    <GridRow>
                        <GridColumn id="com-name">
                            <Header>{filteredCom.name}</Header>
                        </GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn>
                            <Image
                                src={`data:${filteredCom.photo_info.photo_type};base64,${filteredCom.photo_info.photo}`}
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        </GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn>
                            <div className="emph-txt">詳細</div>
                            <p style={{ whiteSpace: 'pre-line' }}>{filteredCom.description}</p>
                        </GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn>
                            <div className="emph-txt">応募条件</div>
                            <p style={{ whiteSpace: 'pre-line' }}>{filteredCom.requirement}</p>
                        </GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn>
                            <div className="emph-txt">アクセス</div>
                            <p style={{ whiteSpace: 'pre-line' }}>{filteredCom.address}</p>
                        </GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn>
                            <Button secondary labelPosition='left' icon='left chevron' onClick={toggleDesc} content='検索結果へ戻る' />
                        </GridColumn>
                    </GridRow>
                </Grid>
            </div>
            <FooterComponent />
        </>
    );
}

export default DescriptionPage;
