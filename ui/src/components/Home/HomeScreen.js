import React from 'react';
import Footer from '../shared/Footer';
import NavBar from '../shared/NavBar';
import HomeDetail from './HomeDetail';

function HomeScreen() {
  return (
    <div>
      <NavBar />
      <img
        src="https://oddhansen.no/wp-content/uploads/2020/07/Forside-s1.png"
        width="100%"
        height="60"
        className="responsive-img"
        alt="imageLogo"
      />

      <div className="white  container">
        <h2>Elija entre nuestros proyectos de vivienda seleccionados</h2>

        <div className="row">
          <HomeDetail />
          <HomeDetail />
          <HomeDetail />

          <div className="col l12 s12 center-align ">
            <button class="waves-effect waves-light white btn-large purple-text text-darken-4 pulse">
              <b>Ver mas casas </b>
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col l4 s12 light-blue lighten-1 desc_container "></div>
        <div className="col l4 s12 light-blue lighten-2 desc_container blurred"></div>
        <div className="col l4 s12 light-blue lighten-3 desc_container blurred"></div>
      </div>

      <div className="white  container">
        <div className="card-panel ">
          <div className="col l11 s12 ">
            <div class="row ">
              <h2>Towards Goodness and a Future of Humanness</h2>

              <div className="col l7 m8">
                <p>
                  <em>
                    Philadelphia, PA,{' '}
                    <time datetime="2021-02-12">February 12, 2021</time>:
                  </em>
                  Key Medium is committed to making a difference in our
                  community--read our thinking behind how we are implementing
                  lasting change towards goodness.
                </p>
                <hr />
                <p>
                  A demonstration of compassion, of deeper human connection–is
                  what we collectively must work towards if we are to realize
                  the potential of our collective genius. Our ability to
                  collaborate to tackle the world’s greatest challenges depends
                  on it, and our environment is not waiting for the elections.
                  From systemic racism, global warming, AI and data ethics, to
                  warmongering foreign policy and the ever-changing pace of
                  change, humanity is at an inflection point.
                </p>
                <a
                  className="btn btn-primary btn-lg waves-effect waves-light"
                  role="button"
                  href="/future-of-humanness/"
                  target="_blank"
                >
                  Towards Goodness &amp; a Future of Humanness{' '}
                  <i class="las la-chevron-right" aria-hidden="true"></i>
                </a>
              </div>
              <div className="col l5 m4 center-align">
                <a href="/future-of-humanness/" target="_blank">
                  <img
                    src="//cdn-5dfc2c16f911c80fd0df5255.closte.com/wp-content/uploads/2018/02/Ali-Jaffar-1.jpg"
                    alt="Ali Jaffar, CEO of Key Medium, shares his thoughts on the future"
                    className="circle responsive-img"
                    width="80%"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomeScreen;
