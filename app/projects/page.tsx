import React from "react";

export default function ProjectPage() {
  return (
    <main>
      <nav>
        <div className="logo">CodeGrid</div>
        <div className="nav-items">
          <p>Work</p>
          <p>Studio</p>
          <p>News</p>
          <p>Contact</p>
        </div>
      </nav>
      <footer>
        <p>All Project</p>
        <div className="slider-counter">
          <div className="count">
            <p>1</p>
          </div>
          <p>/</p>
          <p>7</p>
        </div>
      </footer>
      <div className="slider">
        <div className="slide">
          <div className="slide-bg-img">
            <img src="/test.jpg" alt="Slide 1" className="imga" />
          </div>
        </div>
        <div className="slide-main-img">
          <div className="slide-main-img-wrapper">
            <img src="/test.jpg" alt="Slide 1" className="imga rounded-md  " />
          </div>
        </div>
        <div className="slide-copy">
          <div className="slide-title">
            <h1>Field Unit</h1>
          </div>
          <div className="slide-description">
            <p>Concept Art</p>
          </div>
        </div>
      </div>
    </main>
  );
}
