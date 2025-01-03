import React from 'react';
import { Header } from './components/Header/Header';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <img
        src={`${process.env.PUBLIC_URL}/images/imageHeader.png`}
        className="todoapp__header-image"
      />

      <div className="todoapp__content">
        <Header />
      </div>
    </div>
  );
};
