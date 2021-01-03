import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './header';
export default ({ children }) => (
    <div>
        <Header/>
        <Container>
            <div className='row'>{children}</div>
        </Container>
    </div>
)