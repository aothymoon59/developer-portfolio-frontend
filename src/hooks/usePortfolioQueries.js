import { useQuery, useQueries } from "@tanstack/react-query";
import api from "../utils/api";

const getResponseData = async (path) => {
  const response = await api.get(path);
  return response.data?.data;
};

export const portfolioQueryKeys = {
  siteSettings: ["portfolio", "site-settings"],
  services: ["portfolio", "services"],
  reviews: ["portfolio", "reviews"],
  blogs: ["portfolio", "blogs"],
  blog: (blogId) => ["portfolio", "blogs", blogId],
  projects: ["portfolio", "projects"],
  skills: ["portfolio", "skills"],
  experiences: ["portfolio", "experiences"],
  education: ["portfolio", "education"],
};

export const useSiteSettingsQuery = () =>
  useQuery({
    queryKey: portfolioQueryKeys.siteSettings,
    queryFn: () => getResponseData("/portfolio/site-settings"),
  });

export const useAboutPageQuery = () => {
  const [siteSettingsQuery, servicesQuery, reviewsQuery] = useQueries({
    queries: [
      {
        queryKey: portfolioQueryKeys.siteSettings,
        queryFn: () => getResponseData("/portfolio/site-settings"),
      },
      {
        queryKey: portfolioQueryKeys.services,
        queryFn: () => getResponseData("/portfolio/services"),
      },
      {
        queryKey: portfolioQueryKeys.reviews,
        queryFn: () => getResponseData("/portfolio/reviews"),
      },
    ],
  });

  return {
    siteSettings: siteSettingsQuery.data || {},
    services: servicesQuery.data || [],
    reviews: reviewsQuery.data || [],
    isLoading:
      siteSettingsQuery.isLoading ||
      servicesQuery.isLoading ||
      reviewsQuery.isLoading,
    isFetching:
      siteSettingsQuery.isFetching ||
      servicesQuery.isFetching ||
      reviewsQuery.isFetching,
    error:
      siteSettingsQuery.error || servicesQuery.error || reviewsQuery.error,
  };
};

export const useBlogsQuery = () =>
  useQuery({
    queryKey: portfolioQueryKeys.blogs,
    queryFn: () => getResponseData("/portfolio/blogs"),
  });

export const useBlogDetailsQuery = (blogId) =>
  useQuery({
    queryKey: portfolioQueryKeys.blog(blogId),
    queryFn: () => getResponseData(`/portfolio/blogs/${blogId}`),
    enabled: Boolean(blogId),
  });

export const useProjectsQuery = () =>
  useQuery({
    queryKey: portfolioQueryKeys.projects,
    queryFn: () => getResponseData("/portfolio/projects"),
  });

export const useResumePageQuery = () => {
  const [skillsQuery, experiencesQuery, educationQuery] = useQueries({
    queries: [
      {
        queryKey: portfolioQueryKeys.skills,
        queryFn: () => getResponseData("/portfolio/skills"),
      },
      {
        queryKey: portfolioQueryKeys.experiences,
        queryFn: () => getResponseData("/portfolio/experiences"),
      },
      {
        queryKey: portfolioQueryKeys.education,
        queryFn: () => getResponseData("/portfolio/education"),
      },
    ],
  });

  return {
    skills: skillsQuery.data || [],
    workingExperience: experiencesQuery.data || [],
    educationExperience: educationQuery.data || [],
    isLoading:
      skillsQuery.isLoading ||
      experiencesQuery.isLoading ||
      educationQuery.isLoading,
    error: skillsQuery.error || experiencesQuery.error || educationQuery.error,
  };
};
