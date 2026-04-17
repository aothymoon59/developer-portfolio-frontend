import React, { useEffect, useState } from "react";
import BlogsView from "../components/BlogsView";
import Layout from "../components/Layout";
import { GridPageSkeleton } from "../components/PageSkeleton";
import Pagination from "../components/Pagination";
import Sectiontitle from "../components/Sectiontitle";
import SiteHelmet from "../components/SiteHelmet";
import { useBlogsQuery } from "../hooks/usePortfolioQueries";

function Blogs({ lightMode }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const { data: posts = [], isLoading } = useBlogsQuery();

  useEffect(() => {
    setCurrentPage(1);
  }, [posts.length]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <Layout>
      <SiteHelmet pageTitle="Blogs" description="Blog posts and articles" />
      {isLoading ? (
        <GridPageSkeleton columns={2} />
      ) : (
        <div className="mi-about mi-section mi-padding-top mi-padding-bottom">
          <div className="container">
            <Sectiontitle title="Recent Blogs" />
            <BlogsView blogs={currentPosts} lightMode={lightMode} />
            {!(posts.length > postsPerPage) ? null : (
              <Pagination
                className="mt-50"
                itemsPerPage={postsPerPage}
                totalItems={posts.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Blogs;
