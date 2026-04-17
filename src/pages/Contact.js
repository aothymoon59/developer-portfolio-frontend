import React, { useState } from "react";
import * as Icon from "react-feather";
import { message } from "antd";
import Layout from "../components/Layout";
import { ContactSkeleton } from "../components/PageSkeleton";
import Sectiontitle from "../components/Sectiontitle";
import SiteHelmet from "../components/SiteHelmet";
import api from "../utils/api";
import useSiteSettings from "../hooks/useSiteSettings";

function Contact() {
  const { siteSettings, loading } = useSiteSettings();
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!formdata.name) {
      message.error("Name is required");
    } else if (!formdata.email) {
      message.error("Email is required");
    } else if (!formdata.subject) {
      message.error("Subject is required");
    } else if (!formdata.message) {
      message.error("Message is required");
    } else {
      try {
        setIsSubmitting(true);
        const response = await api.post("/messages", formdata);
        message.success(response.data.message || "Your message has been sent.");
        setFormdata({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } catch (requestError) {
        message.error(
          requestError.response?.data?.message ||
            "Unable to send your message right now.",
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  const handleChange = (event) => {
    setFormdata({
      ...formdata,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  const numberFormatter = (number) => {
    const phnNumber = number;
    return phnNumber;
  };

  return (
    <Layout>
      <SiteHelmet pageTitle="Contact" description="Contact page" />
      {loading ? (
        <ContactSkeleton />
      ) : (
        <div className="mi-contact-area mi-section mi-padding-top mi-padding-bottom">
          <div className="container">
            <Sectiontitle title="Contact Me" />
            <div className="row">
              <div className="col-lg-6">
                <div className="mi-contact-formwrapper">
                  <h4>Get In Touch</h4>
                  <form
                    action="#"
                    className="mi-form mi-contact-form"
                    onSubmit={submitHandler}
                  >
                    <div className="mi-form-field">
                      <label htmlFor="contact-form-name">
                        Enter your name*
                      </label>
                      <input
                        onChange={handleChange}
                        type="text"
                        name="name"
                        id="contact-form-name"
                        value={formdata.name}
                      />
                    </div>
                    <div className="mi-form-field">
                      <label htmlFor="contact-form-email">
                        Enter your email*
                      </label>
                      <input
                        onChange={handleChange}
                        type="text"
                        name="email"
                        id="contact-form-email"
                        value={formdata.email}
                      />
                    </div>
                    <div className="mi-form-field">
                      <label htmlFor="contact-form-subject">
                        Enter your subject*
                      </label>
                      <input
                        onChange={handleChange}
                        type="text"
                        name="subject"
                        id="contact-form-subject"
                        value={formdata.subject}
                      />
                    </div>
                    <div className="mi-form-field">
                      <label htmlFor="contact-form-message">
                        Enter your Message*
                      </label>
                      <textarea
                        onChange={handleChange}
                        name="message"
                        id="contact-form-message"
                        cols="30"
                        rows="6"
                        value={formdata.message}
                      ></textarea>
                    </div>
                    <div className="mi-form-field">
                      <button
                        className="mi-button"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Mail"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mi-contact-info">
                  {!siteSettings.phone ? null : (
                    <div className="mi-contact-infoblock">
                      <span className="mi-contact-infoblock-icon">
                        <Icon.Phone />
                      </span>
                      <div className="mi-contact-infoblock-content">
                        <h6>Phone</h6>
                        <p>{siteSettings.phone}</p>
                      </div>
                    </div>
                  )}
                  {!siteSettings.email ? null : (
                    <div className="mi-contact-infoblock">
                      <span className="mi-contact-infoblock-icon">
                        <Icon.Mail />
                      </span>
                      <div className="mi-contact-infoblock-content">
                        <h6>Email</h6>
                        <p>
                          <a href={`mailto:${siteSettings.email}`}>
                            {siteSettings.email}
                          </a>
                        </p>
                      </div>
                    </div>
                  )}
                  {!siteSettings.location ? null : (
                    <div className="mi-contact-infoblock">
                      <span className="mi-contact-infoblock-icon">
                        <Icon.MapPin />
                      </span>
                      <div className="mi-contact-infoblock-content">
                        <h6>Address</h6>
                        <p>{siteSettings.location}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Contact;
