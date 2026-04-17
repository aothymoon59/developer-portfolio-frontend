import React from "react";
import { Helmet } from "react-helmet";
import TrackVisibility from "react-on-screen";
import Layout from "../components/Layout";
import { ResumeSkeleton } from "../components/PageSkeleton";
import Progress from "../components/Progress";
import Resume from "../components/Resume";
import Sectiontitle from "../components/Sectiontitle";
import Smalltitle from "../components/Smalltitle";
import { useResumePageQuery } from "../hooks/usePortfolioQueries";

function Resumes() {
  const { skills, workingExperience, educationExperience, isLoading } =
    useResumePageQuery();

  return (
    <Layout>
      <Helmet>
        <title>Resume - Chester React Personal Portfolio Template</title>
        <meta
          name="description"
          content="Chester React Personal Portfolio Template Resume Page"
        />
      </Helmet>
      {isLoading ? (
        <ResumeSkeleton />
      ) : (
        <>
        <div className="mi-skills-area mi-section mi-padding-top">
          <div className="container">
            <Sectiontitle title="My Skills" />
            <div className="mi-skills">
              <div className="row mt-30-reverse">
                {skills?.map((skill) => (
                  <TrackVisibility
                    once
                    className="col-lg-6 mt-30"
                    key={skill.id}
                  >
                    <Progress title={skill.name} percentage={skill.level} />
                  </TrackVisibility>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mi-resume-area mi-section mi-padding-top mi-padding-bottom">
          <div className="container">
            <Sectiontitle title="Resume" />
            <Smalltitle title="Working Experience" icon="briefcase" />
            <div className="mi-resume-wrapper">
              {workingExperience.map((workingExp) => (
                <Resume key={workingExp.id} resumeData={workingExp} />
              ))}
            </div>
            <div className="mt-30"></div>
            <Smalltitle title="Educational Qualifications" icon="book" />
            <div className="mi-resume-wrapper">
              {educationExperience.map((educatonExp) => (
                <Resume key={educatonExp.id} resumeData={educatonExp} />
              ))}
            </div>
          </div>
        </div>
        </>
      )}
    </Layout>
  );
}

export default Resumes;
