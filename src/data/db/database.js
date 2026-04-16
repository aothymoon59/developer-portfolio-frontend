import Mock from "../mock";

const database = {
  information: {
    name: "Md Saidul  Islam",
    aboutContent:
      "Senior PHP-Laravel Web Application Developer with 5+ years of experience building scalable, secure, and high-performance systems including ERP, POS, RMS, marketplace platforms, and AI-powered modules for data analysis, workflow automation, and intelligent report generation. Proven expertise in leading engineering teams, designing robust system architectures, optimizing database and query performance, and delivering complex business solutions end-to-end. Highly skilled in Laravel, CodeIgniter, REST APIs, MySQL, and server deployment. Proficient in Python, Node.js, React.js, JavaScript, and modern AI integrations. Successfully completed 100+ professional projects with consistent quality and on-time delivery.",
    age: 29,
    phone: "+8801770496250",
    nationality: "Bangladeshi",
    language: "English, Bangla, Hindi",
    email: "saidulislam197120@gmail.com",
    address: "Alif Housing Society, Road No. 6, Adabor, Dhaka-1207, Bangladesh",
    freelanceStatus: "Available",
    socialLinks: {
      facebook: "https://www.facebook.com/md.saidul.islam.hafeez/",
      twitter: "",
      pinterest: "",
      behance: "",
      linkedin: "https://www.linkedin.com/in/saidul1996/?locale=en",
      dribbble: "",
      github: "https://github.com/saidulerpseopage1",
    },
    brandImage: "/images/brand-image.jpg",
    aboutImage: "/images/about-image.jpg",
    aboutImageLg: "/images/about-image-lg.jpg",
    cvfile: "/files/Saidul_Islam_CV (Senior Software Developer).pdf",
  },
  services: [
    {
      title: "Frontend Development",
      icon: "brush-alt",
      details:
        "Build modern, responsive, and high-performance user interfaces using React.js, JavaScript, Tailwind CSS, and Bootstrap with a strong focus on UI/UX and cross-device compatibility.",
    },
    {
      title: "Full-Stack Web Application",
      icon: "code",
      details:
        "Develop scalable and secure full-stack applications using Laravel, CodeIgniter, REST APIs, and MySQL including ERP, POS, RMS, and marketplace systems with optimized performance.",
    },
    {
      title: "Desktop Application (Python)",
      icon: "laptop",
      details:
        "Develop robust desktop applications using Python for automation, data processing, reporting, system integration, and custom business solutions with efficient performance and usability.",
    },
  ],
  reviews: [
    {
      id: 1,
      content:
        "Highly skilled developer with strong expertise in Laravel and full-stack systems. Delivered high-quality work with clean architecture and timely communication.",
      author: {
        name: "Riadus Salehin",
        designation: "Senior Software Engineer, Seopage1",
      },
    },
    {
      id: 2,
      content:
        "Excellent problem-solving ability and strong backend development skills. Very reliable for complex enterprise-level projects.",
      author: {
        name: "Iqbal Hasan",
        designation: "Technical Lead Engineer, Bdtask",
      },
    },
    {
      id: 3,
      content:
        "Delivered a secure and well-optimized payment system with great attention to detail. Highly recommended for financial platforms.",
      author: {
        name: "KM Iftekhar Ahmed",
        designation: "Product Owner, PaymentBD Platform",
      },
    },
    {
      id: 4,
      content:
        "Built a complete ERP business automation system with smooth workflows and scalable architecture. Very professional and efficient work.",
      author: {
        name: "Md. Mohoshin Shohel",
        designation: "Business Automation Client (ERP Systems)",
      },
    },
    {
      id: 5,
      content:
        "Developed a restaurant management system for UAE operations. Excellent communication and delivered exactly as required.",
      author: {
        name: "Mohammad Abbas",
        designation: "Operations Manager, Restaurant Management System (UAE)",
      },
    },
  ],
  skills: [
    { title: "Laravel", value: 95 },
    { title: "PHP", value: 95 },
    { title: "MySQL", value: 90 },
    { title: "REST APIs", value: 90 },
    { title: "React.js", value: 85 },
    { title: "JavaScript", value: 85 },
    { title: "Node.js", value: 75 },
    { title: "CodeIgniter", value: 85 },
    { title: "Tailwind CSS", value: 80 },
    { title: "System Design", value: 90 },
  ],
  portfolios: [
    {
      id: 1,
      title: "T-shirt Mockup",
      subtitle: "A beautiful t-shirt mockup.",
      imageUrl: "/images/portfolio-image-1.jpg",
      largeImageUrl: ["/images/portfolio-image-1-lg.jpg"],
      url: "https://dribbble.com",
    },
    {
      id: 2,
      title: "Coffee Mug",
      subtitle: "Awesome coffee mug design.",
      imageUrl: "/images/portfolio-image-4.jpg",
      largeImageUrl: [
        "/images/portfolio-image-4-lg.jpg",
        "/images/portfolio-image-4-lg2.jpg",
      ],
      url: "https://facebook.com",
    },
    {
      id: 3,
      title: "Tea & Coffee Mug",
      subtitle: "Beautiful mug with logo.",
      imageUrl: "/images/portfolio-image-2.jpg",
      url: "https://pinterest.com",
    },
    {
      id: 4,
      title: "Pen Holder",
      subtitle: "A pen holder with beautiful design.",
      imageUrl: "/images/portfolio-image-3.jpg",
      largeImageUrl: ["/images/portfolio-image-3-lg.jpg"],
      url: "#",
    },
    {
      id: 5,
      title: "Mug",
      subtitle: "Mug with awesome style",
      imageUrl: "/images/portfolio-image-5.jpg",
      largeImageUrl: ["/images/portfolio-image-5-lg.jpg"],
    },
    {
      id: 6,
      title: "Pendrive",
      subtitle: "Free pendrive mockup design.",
      imageUrl: "/images/portfolio-image-6.jpg",
      largeImageUrl: ["/images/portfolio-image-6-lg.jpg"],
    },
    {
      id: 7,
      title: "Beautiful Pendrive",
      subtitle: "Pendrive with great design & flexible.",
      imageUrl: "/images/portfolio-image-7.jpg",
      largeImageUrl: ["/images/portfolio-image-7-lg.jpg"],
      url: "https://twitter.com",
    },
    {
      id: 8,
      title: "Sticker",
      subtitle: "Clip sticker mockup design.",
      imageUrl: "/images/portfolio-image-8.jpg",
      largeImageUrl: ["/images/portfolio-image-8-lg.jpg"],
    },
    {
      id: 9,
      title: "Packet",
      subtitle: "Beautiful packet & product design.",
      imageUrl: "/images/portfolio-image-9.jpg",
      largeImageUrl: ["/images/portfolio-image-9-lg.jpg"],
    },
    {
      id: 10,
      title: "Pen Holder",
      subtitle: "A pen holder with beautiful design.",
      imageUrl: "/images/portfolio-image-3.jpg",
      largeImageUrl: ["/images/portfolio-image-3-lg.jpg"],
      url: "#",
    },
    {
      id: 11,
      title: "Coffee Mug",
      subtitle: "Awesome coffee mug design.",
      imageUrl: "/images/portfolio-image-4.jpg",
      largeImageUrl: [
        "/images/portfolio-image-4-lg.jpg",
        "/images/portfolio-image-4-lg2.jpg",
      ],
      url: "https://facebook.com",
    },
    {
      id: 12,
      title: "Tea & Coffee Mug",
      subtitle: "Beautiful mug with logo.",
      imageUrl: "/images/portfolio-image-2.jpg",
      url: "https://pinterest.com",
    },
    {
      id: 13,
      title: "T-shirt Mockup",
      subtitle: "A beautiful t-shirt mockup.",
      imageUrl: "/images/portfolio-image-1.jpg",
      largeImageUrl: ["/images/portfolio-image-1-lg.jpg"],
      url: "https://dribbble.com",
    },
    {
      id: 14,
      title: "Mug",
      subtitle: "Mug with awesome style",
      imageUrl: "/images/portfolio-image-5.jpg",
      largeImageUrl: ["/images/portfolio-image-5-lg.jpg"],
    },
    {
      id: 15,
      title: "Pendrive",
      subtitle: "Free pendrive mockup design.",
      imageUrl: "/images/portfolio-image-6.jpg",
      largeImageUrl: ["/images/portfolio-image-6-lg.jpg"],
    },
    {
      id: 16,
      title: "Beautiful Pendrive",
      subtitle: "Pendrive with great design & flexible.",
      imageUrl: "/images/portfolio-image-7.jpg",
      largeImageUrl: ["/images/portfolio-image-7-lg.jpg"],
      url: "https://twitter.com",
    },
    {
      id: 17,
      title: "Sticker",
      subtitle: "Clip sticker mockup design.",
      imageUrl: "/images/portfolio-image-8.jpg",
      largeImageUrl: ["/images/portfolio-image-8-lg.jpg"],
    },
    {
      id: 18,
      title: "Packet",
      subtitle: "Beautiful packet & product design.",
      imageUrl: "/images/portfolio-image-9.jpg",
      largeImageUrl: ["/images/portfolio-image-9-lg.jpg"],
    },
    {
      id: 19,
      title: "T-shirt Mockup",
      subtitle: "A beautiful t-shirt mockup.",
      imageUrl: "/images/portfolio-image-1.jpg",
      largeImageUrl: ["/images/portfolio-image-1-lg.jpg"],
      url: "https://dribbble.com",
    },
    {
      id: 20,
      title: "Coffee Mug",
      subtitle: "Awesome coffee mug design.",
      imageUrl: "/images/portfolio-image-4.jpg",
      largeImageUrl: [
        "/images/portfolio-image-4-lg.jpg",
        "/images/portfolio-image-4-lg2.jpg",
      ],
      url: "https://facebook.com",
    },
    {
      id: 21,
      title: "Tea & Coffee Mug",
      subtitle: "Beautiful mug with logo.",
      imageUrl: "/images/portfolio-image-2.jpg",
      url: "https://pinterest.com",
    },
    {
      id: 22,
      title: "Pen Holder",
      subtitle: "A pen holder with beautiful design.",
      imageUrl: "/images/portfolio-image-3.jpg",
      largeImageUrl: ["/images/portfolio-image-3-lg.jpg"],
      url: "#",
    },
    {
      id: 23,
      title: "Mug",
      subtitle: "Mug with awesome style",
      imageUrl: "/images/portfolio-image-5.jpg",
      largeImageUrl: ["/images/portfolio-image-5-lg.jpg"],
    },
  ],
  experience: {
    workingExperience: [
      {
        id: 1,
        year: "Mar 2024 - Present",
        position: "Senior Software Developer (Team Lead)",
        company: "Seopage1",
        details:
          "Leading a team of 10+ developers, building ERP systems, integrating AI modules, optimizing databases, and designing scalable architectures.",
      },
      {
        id: 2,
        year: "Mar 2023 - Feb 2024",
        position: "Sr. Laravel Developer",
        company: "Bdtask Ltd",
        details:
          "Worked on ERP and RMS systems, implemented scalable features, integrated modules, and improved system performance.",
      },
      {
        id: 3,
        year: "Oct 2020 - Feb 2023",
        position: "Laravel Developer",
        company: "MMIT Soft Ltd",
        details:
          "Developed POS, RMS, eCommerce, and management systems with full-stack responsibilities and API integrations.",
      },
    ],

    educationExperience: [
      {
        id: 1,
        year: "2017 - 2020",
        graduation: "B.Sc in Computer Science",
        university: "Eastern University",
        details: "CGPA: 3.75 out of 4.0",
      },
    ],
  },
  blogs: [
    {
      id: 1,
      title: "Building Scalable ERP Systems with Laravel: Architecture & Best Practices",
      featuredImage: "/images/blog-1.jpg",
      filesource: "../../blog/1.md",
      createDay: "08",
      createMonth: "March",
      createYear: "2026",
    },
    {
      id: 2,
      title: "Optimizing MySQL Queries for High-Performance Web Applications",
      featuredImage: "/images/blog-2.jpg",
      filesource: "../../blog/2.md",
      createDay: "02",
      createMonth: "January",
      createYear: "2026",
    },
    {
      id: 3,
      title: "Designing REST APIs in Laravel for Scalable Applications",
      featuredImage: "/images/blog-3.jpg",
      filesource: "../../blog/3.md",
      createDay: "20",
      createMonth: "December",
      createYear: "2025",
    },
    {
      id: 4,
      title: "Integrating AI Modules into Web Applications: Practical Use Cases",
      featuredImage: "/images/blog-4.jpg",
      filesource: "../../blog/4.md",
      createDay: "12",
      createMonth: "October",
      createYear: "2025",
    },
    {
      id: 5,
      title: "How to Build a Complete POS System with Laravel & React",
      featuredImage: "/images/blog-5.jpg",
      filesource: "../../blog/5.md",
      createDay: "04",
      createMonth: "October",
      createYear: "2025",
    },
    {
      id: 6,
      title: "Laravel Performance Optimization: From Beginner to Advanced",
      featuredImage: "/images/blog-6.jpg",
      filesource: "../../blog/6.md",
      createDay: "11",
      createMonth: "September",
      createYear: "2025",
    },
    {
      id: 7,
      title: "Building Multi-Module Systems using HMVC Architecture in Laravel",
      featuredImage: "/images/blog-7.jpg",
      filesource: "../../blog/7.md",
      createDay: "15",
      createMonth: "July",
      createYear: "2025",
    },
    {
      id: 8,
      title: "Deploying Laravel Applications on VPS with CI/CD Pipeline",
      featuredImage: "/images/blog-8.jpg",
      filesource: "../../blog/8.md",
      createDay: "18",
      createMonth: "June",
      createYear: "2025",
    },
    {
      id: 9,
      title: "Team Leadership in Software Development: Lessons from Real Projects",
      featuredImage: "/images/blog-9.jpg",
      filesource: "../../blog/9.md",
      createDay: "09",
      createMonth: "June",
      createYear: "2025",
    },
    {
      id: 10,
      title: "Building Secure Payment Gateway Integration in Laravel",
      featuredImage: "/images/blog-10.jpg",
      filesource: "../../blog/10.md",
      createDay: "10",
      createMonth: "February",
      createYear: "2025",
    },
    {
      id: 11,
      title: "From Monolith to Scalable System: Refactoring Large Laravel Projects",
      featuredImage: "/images/blog-11.jpg",
      filesource: "../../blog/11.md",
      createDay: "01",
      createMonth: "February",
      createYear: "2025",
    },
    {
      id: 12,
      title: "Full-Stack Development Workflow: Laravel + React + API Integration",
      featuredImage: "/images/blog-12.jpg",
      filesource: "../../blog/12.md",
      createDay: "14",
      createMonth: "January",
      createYear: "2025",
    }
  ],
  contactInfo: {
    phoneNumbers: ["+8801770496250", "+8801603482058"],
    emailAddress: ["saiudlislam197120@gmail.com", "mdsaidulislam.dev@gmail.com"],
    address: "Alif Housing Society, Road No. 6, Adabor, Dhaka-1207, Bangladesh",
  },
};

Mock.onGet("/api/information").reply((config) => {
  const response = database.information;
  return [200, response];
});

Mock.onGet("/api/services").reply((config) => {
  const response = database.services;
  return [200, response];
});

Mock.onGet("/api/reviews").reply((config) => {
  const response = database.reviews;
  return [200, response];
});

Mock.onGet("/api/skills").reply((config) => {
  const response = database.skills;
  return [200, response];
});

Mock.onGet("/api/portfolios").reply((config) => {
  const response = database.portfolios;
  return [200, response];
});

Mock.onGet("/api/experience").reply((config) => {
  const response = database.experience;
  return [200, response];
});

Mock.onGet("/api/blog").reply((config) => {
  const response = database.blogs;
  return [200, response];
});

Mock.onGet("/api/contactinfo").reply((config) => {
  const response = database.contactInfo;
  return [200, response];
});
