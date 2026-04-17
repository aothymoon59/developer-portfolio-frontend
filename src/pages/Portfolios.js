import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import { GridPageSkeleton } from "../components/PageSkeleton";
import Pagination from "../components/Pagination";
import PortfoliosView from "../components/PortfoliosView";
import Sectiontitle from "../components/Sectiontitle";
import { useProjectsQuery } from "../hooks/usePortfolioQueries";

function Portfolios({ lightMode }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [portfoliosPerPage] = useState(9);
  const { data: portfolios = [], isLoading } = useProjectsQuery();

  useEffect(() => {
    setCurrentPage(1);
  }, [portfolios.length]);

  const indexOfLastPortfolios = currentPage * portfoliosPerPage;
  const indexOfFirstPortfolios = indexOfLastPortfolios - portfoliosPerPage;
  const currentPortfolios = portfolios.slice(
    indexOfFirstPortfolios,
    indexOfLastPortfolios,
  );

  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <Layout>
      <Helmet>
        <title>Projects - Chester React Personal Portfolio Template</title>
        <meta
          name="description"
          content="Chester React Personal Portfolio Template Projects Page"
        />
      </Helmet>
      {isLoading ? (
        <GridPageSkeleton columns={3} />
      ) : (
        <div className="mi-about mi-section mi-padding-top mi-padding-bottom">
          <div className="container">
            <Sectiontitle title="Projects" />
            {
              <PortfoliosView
                portfolios={currentPortfolios}
                lightMode={lightMode}
              />
            }
            {!(portfolios.length > portfoliosPerPage) ? null : (
              <Pagination
                className="mt-50"
                itemsPerPage={portfoliosPerPage}
                totalItems={portfolios.length}
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

export default Portfolios;
