# Project Image Speaks

A modern portfolio website for a photography studio. Built with React, styled with a minimalist design, and enhanced with GSAP animations. The project serves as a practice project and demonstrates integration of Firebase for dynamic content.

## Features

### Global Components
- **Navigation Bar (Navbar)** – Provides easy navigation across pages. Integrated with the theme context to update according to dark/light mode.  
- **Footer Component** – Displayed consistently across all pages.  

### Homepage
- **Hero Section** – Minimalist homepage introducing the studio.  
- **About Component** – Dedicated section describing the photography studio and its services.  
- **GSAP Animations** – Smooth entry animations for sections and text.  

### Portfolio Page
- **Photography Portfolio** – Displays all work done by the studio.  
- **Category Filtering** – Photos can be filtered into three categories for easier browsing.  
- **Dark/Light Mode** – Users can toggle between themes, implemented using a custom **Theme Context**.  

### Reviews Page
- **Review Submission** – Visitors can submit reviews, which are stored in Firebase Firestore.  
- **Real-Time Updates** – Submitted reviews instantly appear on the page without reload.  
- **Ratings System** – Users can rate their experience alongside leaving a review.  
- **Review Counter** – Displays how many reviews a user has submitted, tracked by their email.  


## Tech Stack
- React (frontend)
- GSAP (animations)
- Firebase Firestore (database)

## Status
Currently live on GitHub as a practice project. Deployment to Netlify or Firebase Hosting is planned soon.

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/project-image-speaks.git

2.Install Dependencies
```bash
npm install
```

3.Create a .env file in the root of the project and add your Firebase configuration:

REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
REACT_APP_FIREBASE_PROJECT_ID=your_project_id_here
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
REACT_APP_FIREBASE_APP_ID=your_app_id_here

4.Start the development server
```bash
npm start
```

