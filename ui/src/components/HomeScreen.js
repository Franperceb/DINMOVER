import React from 'react';
import NavBar from './shared/NavBar';

function HomeScreen() {
  return (
    <div>
      <NavBar />

      <img
        src="https://oddhansen.no/wp-content/uploads/2020/07/Forside-s1.png"
        width="100%"
        className="responsive-img"
        alt="imageLogo"
      />
      <div className="white  container container-width">
        <div className="card-panel card_container">
          Aqui va la descripción de Diana con foto y sobre ella
        </div>
      </div>
      <div className="col s12 light-blue lighten-2 desc_container "></div>
      <div className="white  container container-width">
        <div className="card-panel card_container">
          Aqui va la descripción de Diana con foto y sobre ella
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
