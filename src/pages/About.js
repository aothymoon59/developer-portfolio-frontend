import FsLightbox from "fslightbox-react";
import React, { useState } from "react";
import * as Icon from "react-feather";
import Slider from "react-slick";
import Layout from "../components/Layout";
import { AboutSkeleton } from "../components/PageSkeleton";
import Sectiontitle from "../components/Sectiontitle";
import Service from "../components/Service";
import SiteHelmet from "../components/SiteHelmet";
import Testimonial from "../components/Testimonial";
// import { Image } from "../components/common/Image";
import { Image } from "antd";
import { useAboutPageQuery } from "../hooks/usePortfolioQueries";

function About() {
  const [toggler, setToggler] = useState(false);
  const {
    siteSettings: information,
    services,
    reviews,
    isLoading,
  } = useAboutPageQuery();

  const sliderSettings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleToggler = (event) => {
    setToggler(!toggler);
  };

  return (
    <Layout>
      <SiteHelmet
        pageTitle="About"
        description="About the developer portfolio"
      />
      {isLoading ? (
        <AboutSkeleton />
      ) : (
        <>
          <div className="mi-about-area mi-section mi-padding-top">
            <div className="container">
              <Sectiontitle title="About Me" />
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="mi-about-image">
                    {/* <Image
                      src={information.aboutImageUrl}
                      alt="aboutimage"
                      onClick={() => handleToggler(!toggler)}
                    /> */}
                    <Image src={information.aboutImageUrl} />
                    <span className="mi-about-image-icon">
                      <Icon.ZoomIn />
                    </span>
                    <FsLightbox
                      toggler={toggler}
                      sources={[information.aboutImageLgUrl]}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mi-about-content">
                    <h3>
                      I am{" "}
                      <span className="color-theme">
                        {information.fullName}
                      </span>
                    </h3>
                    {information.aboutDescription && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: information.aboutDescription,
                        }}
                      />
                    )}
                    <ul>
                      {!information.fullName ? null : (
                        <li>
                          <b>Full Name</b> {information.fullName}
                        </li>
                      )}
                      {!information.jobTitle ? null : (
                        <li>
                          <b>Job Title</b> {information.jobTitle}
                        </li>
                      )}
                      {!information.phone ? null : (
                        <li>
                          <b>Phone</b> {information.phone}
                        </li>
                      )}
                      {!information.email ? null : (
                        <li>
                          <b>Email</b> {information.email}
                        </li>
                      )}
                      {!information.location ? null : (
                        <li>
                          <b>Location</b> {information.location}
                        </li>
                      )}

                      {!information.address ? null : (
                        <li>
                          <b>Address</b> {information.address}
                        </li>
                      )}
                      {!information.freelanceStatus ? null : (
                        <li>
                          <b>Freelance</b> {information.freelanceStatus}
                        </li>
                      )}
                    </ul>
                    <a
                      href={information.cvUrl}
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
          <div className="mi-service-area mi-section mi-padding-top">
            <div className="container">
              <Sectiontitle title="Services" />
              <div className="mi-service-wrapper">
                <div className="row mt-30-reverse">
                  {services.map((service) => (
                    <div
                      className="col-lg-4 col-md-6 col-12 mt-30"
                      key={service.title}
                    >
                      <Service content={service} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mi-review-area mi-section mi-padding-top mi-padding-bottom">
            <div className="container">
              <Sectiontitle title="Reviews" />
              <div className="row justify-content-center">
                <div className="col-12">
                  <Slider className="mi-testimonial-slider" {...sliderSettings}>
                    {reviews.map((review) => (
                      <Testimonial key={review.id} content={review} />
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}

export default About;
