import { useState, useEffect } from "react";
import api from "../utils/api";

const useSiteSettings = () => {
  const [siteSettings, setSiteSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        setLoading(true);
        const response = await api.get("/portfolio/site-settings");
        setSiteSettings(response.data.data);
        setError(null);
      } catch (err) {
        setError(err);
        console.error("Error fetching site settings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSiteSettings();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      const response = await api.get("/portfolio/site-settings");
      setSiteSettings(response.data.data);
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Error refetching site settings:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    siteSettings,
    loading,
    error,
    refetch,
  };
};

export default useSiteSettings;
