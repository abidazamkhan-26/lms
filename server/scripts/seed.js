require("dotenv").config({ path: "./.env" });
const mongoose = require("mongoose");
const Course = require("../models/Course");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const mockCourses = [
  {
    instructorId: "64f0f1234567890abcdef123",
    instructorName: "John Doe",
    date: new Date(),
    title: "Complete Web Development Bootcamp",
    category: "Development",
    level: "Beginner",
    primaryLanguage: "English",
    subtitle: "Learn HTML, CSS, JavaScript, React, Node.js and more!",
    description: "This is a comprehensive course on web development covering all the essential technologies. From basics to advanced concepts, you will learn everything needed to become a full-stack developer.",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    welcomeMessage: "Welcome to the course! Get ready to become a web developer.",
    pricing: 49.99,
    objectives: "Build real-world web applications, understand backend and frontend integration.",
    students: [],
    curriculum: [
      {
        title: "Introduction to HTML",
        videoUrl: "https://www.youtube.com/watch?v=pQN-pnXPaVg",
        public_id: "video_1",
        freePreview: true,
      },
      {
        title: "CSS Basics",
        videoUrl: "https://www.youtube.com/watch?v=yfoY53QXEnI",
        public_id: "video_2",
        freePreview: false,
      },
    ],
    isPublised: true,
  },
  {
    instructorId: "64f0f1234567890abcdef456",
    instructorName: "Jane Smith",
    date: new Date(),
    title: "Python for Data Science",
    category: "Data Science",
    level: "Intermediate",
    primaryLanguage: "English",
    subtitle: "Master Python and libraries like Pandas, NumPy, and Matplotlib.",
    description: "Learn how to analyze data and build machine learning models using Python. This course covers data manipulation, visualization, and statistical analysis.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    welcomeMessage: "Welcome! Let's dive into the world of data.",
    pricing: 59.99,
    objectives: "Analyze datasets, create visualizations, build predictive models.",
    students: [],
    curriculum: [
      {
        title: "Python Syntax",
        videoUrl: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
        public_id: "video_3",
        freePreview: true,
      },
    ],
    isPublised: true,
  },
  {
    instructorId: "64f0f1234567890abcdef789",
    instructorName: "Alice Johnson",
    date: new Date(),
    title: "Mastering React",
    category: "Development",
    level: "Advanced",
    primaryLanguage: "English",
    subtitle: "Build complex SPAs with React, Redux, and React Router.",
    description: "Deep dive into React ecosystem and advanced patterns. Learn state management, performance optimization, and custom hooks.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    welcomeMessage: "Welcome to advanced React training.",
    pricing: 69.99,
    objectives: "Master hooks, context API, and state management.",
    students: [],
    curriculum: [
      {
        title: "Advanced Hooks",
        videoUrl: "https://www.youtube.com/watch?v=TNhaISOUy6Q",
        public_id: "video_4",
        freePreview: true,
      },
    ],
    isPublised: true,
  },
  {
    instructorId: "64f0f1234567890abcdef101",
    instructorName: "Michael Brown",
    date: new Date(),
    title: "Digital Marketing Masterclass",
    category: "Business",
    level: "Beginner",
    primaryLanguage: "English",
    subtitle: "Learn SEO, Social Media Marketing, Email Marketing, and more!",
    description: "A complete guide to digital marketing strategies that work in 2024. Grow your business and brand online.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    welcomeMessage: "Ready to grow your brand? Let's get started.",
    pricing: 39.99,
    objectives: "Create marketing campaigns, optimize for SEO, manage social media.",
    students: [],
    curriculum: [
      {
        title: "SEO Fundamentals",
        videoUrl: "https://www.youtube.com/watch?v=DvwS7cV9GmQ",
        public_id: "video_5",
        freePreview: true,
      },
    ],
    isPublised: true,
  },
  {
    instructorId: "64f0f1234567890abcdef102",
    instructorName: "Sarah Wilson",
    date: new Date(),
    title: "Graphic Design Bootcamp",
    category: "Design",
    level: "Beginner",
    primaryLanguage: "English",
    subtitle: "Learn Photoshop, Illustrator, and InDesign from scratch.",
    description: "Become a professional graphic designer. Master the tools and principles of design.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799314346d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    welcomeMessage: "Unleash your creativity!",
    pricing: 44.99,
    objectives: "Create logos, edit photos, design layouts.",
    students: [],
    curriculum: [
      {
        title: "Photoshop Basics",
        videoUrl: "https://www.youtube.com/watch?v=IyR_uYsRdPs",
        public_id: "video_6",
        freePreview: true,
      },
    ],
    isPublised: true,
  },
  {
    instructorId: "64f0f1234567890abcdef103",
    instructorName: "David Miller",
    date: new Date(),
    title: "Financial Analysis & Valuation",
    category: "Finance",
    level: "Advanced",
    primaryLanguage: "English",
    subtitle: "Learn Excel, Financial Modeling, and Valuation methods.",
    description: "A comprehensive course for aspiring financial analysts and investment bankers.",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    welcomeMessage: "Welcome to the world of finance.",
    pricing: 79.99,
    objectives: "Build financial models, analyze company performance, value businesses.",
    students: [],
    curriculum: [
      {
        title: "Excel for Finance",
        videoUrl: "https://www.youtube.com/watch?v=nmbaA2yvW4I",
        public_id: "video_7",
        freePreview: true,
      },
    ],
    isPublised: true,
  },
  {
    instructorId: "64f0f1234567890abcdef104",
    instructorName: "Emily Davis",
    date: new Date(),
    title: "Photography Masterclass",
    category: "Photography",
    level: "Beginner",
    primaryLanguage: "English",
    subtitle: "A complete guide to photography. Master your camera.",
    description: "Learn composition, lighting, and editing. Take stunning photos with any camera.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    welcomeMessage: "Capture the world through your lens.",
    pricing: 34.99,
    objectives: "Master manual mode, understand lighting, edit photos in Lightroom.",
    students: [],
    curriculum: [
      {
        title: "Camera Basics",
        videoUrl: "https://www.youtube.com/watch?v=V7z7BAZdt2M",
        public_id: "video_8",
        freePreview: true,
      },
    ],
    isPublised: true,
  },
  {
    instructorId: "64f0f1234567890abcdef105",
    instructorName: "Robert Taylor",
    date: new Date(),
    title: "Machine Learning A-Z",
    category: "Data Science",
    level: "Advanced",
    primaryLanguage: "English",
    subtitle: "Hands-on Python & R In Data Science, Machine Learning & Deep Learning.",
    description: "Build robust machine learning models and deep learning algorithms.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    welcomeMessage: "Welcome to the future of AI.",
    pricing: 89.99,
    objectives: "Build regression, classification, and clustering models.",
    students: [],
    curriculum: [
      {
        title: "Introduction to ML",
        videoUrl: "https://www.youtube.com/watch?v=Gv9_4yMHFhI",
        public_id: "video_9",
        freePreview: true,
      },
    ],
    isPublised: true,
  },
  {
    instructorId: "64f0f1234567890abcdef106",
    instructorName: "Lisa Anderson",
    date: new Date(),
    title: "Personal Branding System",
    category: "Business",
    level: "Intermediate",
    primaryLanguage: "English",
    subtitle: "Build a personal brand that attracts opportunities.",
    description: "Learn how to position yourself as an authority in your field.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    welcomeMessage: "Let's build your brand.",
    pricing: 54.99,
    objectives: "Define your niche, create content, network effectively.",
    students: [],
    curriculum: [
      {
        title: "Brand Identity",
        videoUrl: "https://www.youtube.com/watch?v=0j3e7F18wY0",
        public_id: "video_10",
        freePreview: true,
      },
    ],
    isPublised: true,
  },
  {
    instructorId: "64f0f1234567890abcdef107",
    instructorName: "James Wilson",
    date: new Date(),
    title: "Docker and Kubernetes",
    category: "Development",
    level: "Intermediate",
    primaryLanguage: "English",
    subtitle: "The complete guide to Docker, Kubernetes, and DevOps.",
    description: "Master containerization and orchestration. deploy scalable applications.",
    image: "https://images.unsplash.com/photo-1667372393119-c81c0e8303f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    welcomeMessage: "Welcome to the world of DevOps.",
    pricing: 64.99,
    objectives: "Build Docker images, deploy to Kubernetes clusters.",
    students: [],
    curriculum: [
      {
        title: "Docker Basics",
        videoUrl: "https://www.youtube.com/watch?v=zJpMT-tbgiw",
        public_id: "video_11",
        freePreview: true,
      },
    ],
    isPublised: true,
  }
];

const seedCourses = async () => {
  try {
    await connectDB();
    
    // Clear existing data to avoid duplicates when re-running
    // Uncomment this if you want to wipe the DB before seeding
    // await Course.deleteMany({});
    // console.log("Existing courses cleared");

    await Course.insertMany(mockCourses);
    console.log(`Successfully inserted ${mockCourses.length} mock courses!`);
    
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedCourses();
