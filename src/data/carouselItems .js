
export const carouselItems = [
    {
      title: "Modern 3D Experience",
      description: "Built with React 19 and Three.js for optimal performance."
    },
    {
      title: "Smooth Animations",
      description: "Framer Motion powered transitions for buttery smooth effects."
    },
    {
      title: "React 19 Compatible",
      description: "Designed specifically to work with the latest React version."
    }
  ];


  export const TECH_STACKS = [
    {
      id: 1,
      name: "MongoDB",
      icon: <SiMongodb size={40} />,
      description: "NoSQL document database with flexible schemas for modern applications",
      codeExample: `// Create a new document
  db.users.insertOne({
    name: "John Doe",
    email: "john@example.com",
    age: 30,
    skills: ["JavaScript", "Node.js"]
  });`,
      proficiency: 85,
      useCases: ["User profiles", "Product catalogs", "Content management"],
      projectIdeas: [
        "Blog with user comments",
        "E-commerce product database",
        "Real-time analytics dashboard"
      ],
      color: "#4DB33D",
      docsLink: "https://docs.mongodb.com/",
      githubLink: "https://github.com/mongodb/mongo"
    },
    {
      id: 2,
      name: "Express.js",
      icon: <SiExpress size={40} />,
      description: "Fast, unopinionated web framework for Node.js",
      codeExample: `// Basic Express server
  const express = require('express');
  const app = express();
  
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });`,
      proficiency: 80,
      useCases: ["REST APIs", "Server-side rendering", "Middleware systems"],
      projectIdeas: [
        "Authentication service",
        "File upload API",
        "Payment gateway integration"
      ],
      color: "#000000",
      docsLink: "https://expressjs.com/",
      githubLink: "https://github.com/expressjs/express"
    },
    {
      id: 3,
      name: "React",
      icon: <SiReact size={40} />,
      description: "Declarative component-based UI library for building interactive interfaces",
      codeExample: `// Functional component with hooks
  import { useState } from 'react';
  
  function Counter() {
    const [count, setCount] = useState(0);
  
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }`,
      proficiency: 90,
      useCases: ["Single page apps", "Interactive dashboards", "Progressive web apps"],
      projectIdeas: [
        "Task management app",
        "Real-time chat interface",
        "Data visualization dashboard"
      ],
      color: "#61DAFB",
      docsLink: "https://reactjs.org/docs/getting-started.html",
      githubLink: "https://github.com/facebook/react"
    },
    {
      id: 4,
      name: "Node.js",
      icon: <SiNodedotjs size={40} />,
      description: "JavaScript runtime built on Chrome's V8 engine for server-side applications",
      codeExample: `// Read a file asynchronously
  const fs = require('fs').promises;
  
  async function readFile() {
    try {
      const data = await fs.readFile('file.txt', 'utf8');
      console.log(data);
    } catch (err) {
      console.error('Error reading file:', err);
    }
  }
  
  readFile();`,
      proficiency: 75,
      useCases: ["Backend services", "CLI tools", "Web servers"],
      projectIdeas: [
        "API gateway",
        "Web scraper",
        "Automation scripts"
      ],
      color: "#339933",
      docsLink: "https://nodejs.org/en/docs/",
      githubLink: "https://github.com/nodejs/node"
    }
  ];