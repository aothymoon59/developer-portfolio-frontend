import React from "react";
import Layout from "../components/Layout";
import { HomeSkeleton } from "../components/PageSkeleton";
import Particle from "../components/Particle";
import SiteHelmet from "../components/SiteHelmet";
import Socialicons from "../components/Socialicons";
import useSiteSettings from "../hooks/useSiteSettings";
import { Link } from "react-router-dom";

function Home({ lightMode }) {
  const { siteSettings, loading } = useSiteSettings();

  return (
    <Layout>
      <SiteHelmet pageTitle="Home" description="Developer portfolio homepage" />
      {loading ? (
        <HomeSkeleton />
      ) : (
        <div className="mi-home-area mi-padding-section">
          <Particle lightMode={lightMode} />
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-12">
                <div className="mi-home-content">
                  <h1>
                    {siteSettings.heroTitle || "Hi, I am"}{" "}
                    <span className="color-theme">{siteSettings.fullName}</span>
                  </h1>
                  <h2>{siteSettings.jobTitle}</h2>
                  {siteSettings.homeDescription && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: siteSettings.homeDescription,
                      }}
                    />
                  )}
                  <Socialicons bordered />
                  <div className="mi-home-buttons">
                    <Link to="/contact" className="mi-button">
                      Contact Me
                    </Link>
                    <a
                      href={siteSettings.cvUrl}
                      target="_blank"
                      className="mi-button"
                    >
                      View Resume
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Home;
