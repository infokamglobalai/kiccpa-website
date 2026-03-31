const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Post = require('./models/Post');

dotenv.config();

const posts = [
  {
    title: "How Predictive Analytics is reshaping Gulf Enterprises",
    slug: "predictive-analytics-gulf",
    category: "AI Automation",
    author: "Tech Team",
    excerpt: "Discover how deep data insights are driving efficiency in the GCC's largest firms.",
    content: "The landscape of enterprise technology in the Gulf is shifting from reactive to predictive. By leveraging advanced machine learning models, companies are now able to anticipate market trends, optimize supply chains, and personalize customer experiences with surgical precision.",
    date: new Date("2026-03-25"),
    imageUrl: "/images/ultra_hero_ai_1774864436013.png"
  },
  {
    title: "Scaling EduAiTutors: Lessons in high-volume LMS streaming",
    slug: "scaling-eduaitutors-lms",
    category: "EdTech Growth",
    author: "Architecture Lead",
    excerpt: "Behind the scenes of our flagship platform's global concurrent user handling.",
    content: "Scaling an LMS for thousands of concurrent video sessions requires more than just cloud capacity. It requires intelligent edge caching, WebSocket optimization, and a resilient microservices architecture that can failover in milliseconds.",
    date: new Date("2026-03-18"),
    imageUrl: "/images/ultra_services_tech_1774864472836.png"
  },
  {
    title: "Why dedicated Retainer Squads beat Fixed-Bid contracts in 2026",
    slug: "dedicated-retainer-squads",
    category: "Agile Dev",
    author: "Project Manager",
    excerpt: "The shift in digital procurement: focus on velocity over fixed scope.",
    content: "In a world where technology moves faster than procurement cycles, the fixed-bid contract is becoming a liability. Dedicated squads offer the flexibility and continuous alignment needed for truly innovative software development.",
    date: new Date("2026-02-10"),
    imageUrl: "/images/ultra_about_team_1774864451077.png"
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");
    
    await Post.deleteMany({});
    console.log("Cleaned existing posts.");
    
    await Post.insertMany(posts);
    console.log("Seed data inserted successfully!");
    
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();
