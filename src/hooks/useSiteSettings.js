import { useSiteSettingsQuery } from "./usePortfolioQueries";

const useSiteSettings = () => {
  const query = useSiteSettingsQuery();

  return {
    siteSettings: query.data || {},
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};

export default useSiteSettings;
