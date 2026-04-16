import React, { Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import Particle from "../components/Particle";
import Socialicons from "../components/Socialicons";
import Spinner from "../components/Spinner";
import api from "../utils/api";

function Home({ lightMode }) {
  const [siteSettings, setSiteSettings] = useState({});

  useEffect(() => {
    api.get("/portfolio/site-settings").then((response) => {
      setSiteSettings(response.data.data);
    });
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Home - Chester React Personal Portfolio Template</title>
        <meta
          name="description"
          content="Chester React Personal Portfolio Template Homepage"
        />
      </Helmet>
      <Suspense fallback={<Spinner />}>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </Layout>
  );
}

export default Home;
