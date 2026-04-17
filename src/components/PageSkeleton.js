import React from "react";
import { Skeleton } from "antd";

function SectionTitleSkeleton() {
  return (
    <div className="mi-sectiontitle">
      <Skeleton.Input active block className="mi-skeleton-title" />
      <Skeleton.Input active block className="mi-skeleton-subtitle" />
    </div>
  );
}

function SkeletonCard({ imageHeight = 220, lines = 3 }) {
  return (
    <div className="mi-skeleton-card">
      <Skeleton.Image active className="mi-skeleton-image" style={{ height: imageHeight }} />
      <Skeleton
        active
        paragraph={{ rows: lines }}
        title={{ width: "70%" }}
      />
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div className="mi-home-area mi-padding-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-12">
            <div className="mi-home-content">
              <Skeleton.Input active block className="mi-skeleton-hero-title" />
              <Skeleton.Input active block className="mi-skeleton-hero-subtitle" />
              <Skeleton active paragraph={{ rows: 4 }} title={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AboutSkeleton() {
  return (
    <>
      <div className="mi-about-area mi-section mi-padding-top">
        <div className="container">
          <SectionTitleSkeleton />
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="mi-skeleton-panel">
                <Skeleton.Image active className="mi-skeleton-about-image" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mi-skeleton-panel">
                <Skeleton active paragraph={{ rows: 6 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mi-service-area mi-section mi-padding-top">
        <div className="container">
          <SectionTitleSkeleton />
          <div className="row mt-30-reverse">
            {[...Array(3)].map((_, index) => (
              <div className="col-lg-4 col-md-6 col-12 mt-30" key={index}>
                <SkeletonCard imageHeight={140} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mi-review-area mi-section mi-padding-top mi-padding-bottom">
        <div className="container">
          <SectionTitleSkeleton />
          <div className="row mt-30-reverse">
            {[...Array(2)].map((_, index) => (
              <div className="col-lg-6 col-12 mt-30" key={index}>
                <div className="mi-skeleton-panel">
                  <Skeleton active avatar paragraph={{ rows: 4 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export function GridPageSkeleton({ title = true, columns = 3 }) {
  const gridClass =
    columns === 2 ? "col-lg-6 col-md-6 col-12 mt-30" : "col-lg-4 col-md-6 col-12 mt-30";

  return (
    <div className="mi-about mi-section mi-padding-top mi-padding-bottom">
      <div className="container">
        {title ? <SectionTitleSkeleton /> : null}
        <div className="row mt-30-reverse">
          {[...Array(6)].map((_, index) => (
            <div className={gridClass} key={index}>
              <SkeletonCard />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ResumeSkeleton() {
  return (
    <>
      <div className="mi-skills-area mi-section mi-padding-top">
        <div className="container">
          <SectionTitleSkeleton />
          <div className="row mt-30-reverse">
            {[...Array(6)].map((_, index) => (
              <div className="col-lg-6 mt-30" key={index}>
                <div className="mi-skeleton-panel">
                  <Skeleton active paragraph={{ rows: 2 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mi-resume-area mi-section mi-padding-top mi-padding-bottom">
        <div className="container">
          <SectionTitleSkeleton />
          {[...Array(4)].map((_, index) => (
            <div className="mi-skeleton-panel mt-30" key={index}>
              <Skeleton active paragraph={{ rows: 3 }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export function ContactSkeleton() {
  return (
    <div className="mi-contact-area mi-section mi-padding-top mi-padding-bottom">
      <div className="container">
        <SectionTitleSkeleton />
        <div className="row">
          <div className="col-lg-6">
            <div className="mi-skeleton-panel">
              <Skeleton active paragraph={{ rows: 8 }} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mi-skeleton-panel">
              <Skeleton active paragraph={{ rows: 6 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BlogDetailsSkeleton() {
  return (
    <div className="mi-blog-details mi-section mi-padding-top mi-padding-bottom">
      <div className="container">
        <div className="mi-skeleton-panel">
          <Skeleton active paragraph={{ rows: 2 }} />
          <Skeleton.Image active className="mi-skeleton-blog-cover" />
          <div className="mt-30">
            <Skeleton active paragraph={{ rows: 10 }} title={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
