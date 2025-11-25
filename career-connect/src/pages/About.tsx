// src/pages/About.tsx

import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">About Career Connect</h1>
      <p className="text-lg text-gray-700 mb-6">
        Career Connect is an interactive platform built to demonstrate proficiency in modern frontend development techniques, focusing on efficient data handling, state management, and user experience.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 border-b pb-2">Technical Features</h2>
      
      <ul className="list-disc list-inside text-gray-700 space-y-3 pl-4">
        <li>
          **Advanced Filtering:** State management handled by the **React Context API** allows for simultaneous, real-time filtering by search query, location, and experience level.
        </li>
        <li>
          **Efficient Data Loading:** Designed to handle large volumes of data from the **JSearch API** by employing **Pagination** and **Incremental Loading** strategies, avoiding browser storage limits and maximizing initial load speed.
        </li>
        <li>
          **Robust Architecture:** The entire application is written in **TypeScript** for type safety, ensuring a stable and maintainable codebase.
        </li>
        <li>
          **User Interface:** Utilizes **Tailwind CSS** to deliver a fully responsive, clean, and modern layout across all device sizes.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 border-b pb-2">Technologies Used</h2>
      <p className="text-lg text-gray-700">
        React, TypeScript, Tailwind CSS, React Router DOM, and the Context API.
      </p>
    </div>
  );
};

export default About;