# RepairDesk - CarParts & User Management System

## Overview

RepairDesk-CarParts-and-User-Management-System is a **web-based platform** designed for automobile workshops and spare parts shops.
It enables efficient tracking of car parts, user role management, and maintaining sales/inventory records.

The system provides centralized management to improve workshop operations, reduce paperwork, and ensure better customer service.


## Features

### Inventory / Parts Management

* Add, update, and delete spare parts.
* Track sales and usage of parts in vehicles.
* Real-time stock management.
* Search and filter parts by ID, name, or category.

### User Management

* Role-based access (Admin, Staff, Mechanic).
* Secure login and authentication.
* Track user activities.

### Sales and Records

* Maintain sales records with customer details.
* Track part usage per vehicle.
* Generate sales and usage reports.

### Additional

* Dashboard with analytics and insights.
* Export records (CSV, Excel, PDF).
* Mobile-responsive interface.


## System Architecture

```mermaid
flowchart TD
    A[Frontend - React/HTML/CSS/JS] -->|HTTP Requests| B[Backend - Node.js/Express]
    B -->|Queries| C[Database - MySQL/MongoDB]
    B -->|Auth Requests| D[Authentication - JWT/Session]
    B -->|API Data| A
    C -->|Inventory and Sales Data| B
    D -->|Access Tokens| B
```


## Use Case Diagram

```mermaid
flowchart TD
    subgraph Users
        Admin
        Staff
        Mechanic
    end

    subgraph System[RepairDesk-CarParts-and-User-Management-System]
        U1[Manage Users & Roles]
        U2[Manage Car Parts Inventory]
        U3[Track Sales & Usage]
        U4[Generate Reports]
        U5[View Dashboard]
    end

    Admin --> U1
    Admin --> U2
    Admin --> U4
    Admin --> U5

    Staff --> U2
    Staff --> U3
    Staff --> U5

    Mechanic --> U2
    Mechanic --> U3
```

## Tech Stack Overview

| Technology | Description | Role in Project | 
| ---------------------------------------------------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------- | 
| <div align="center">![React](https://skillicons.dev/icons?i=react)<br>React</div> | Frontend library for building UIs | Builds the user interface and handles client-side routing & rendering | | <div align="center">![Vite](https://skillicons.dev/icons?i=vite)<br>Vite</div> | Frontend build tool | Extremely fast dev server & bundler for React | 
| <div align="center">![Tailwind](https://skillicons.dev/icons?i=tailwind)<br>Tailwind CSS</div> | Utility-first CSS framework | Styles the app responsively and cleanly, with DaisyUI components | | <div align="center">![JavaScript](https://skillicons.dev/icons?i=js)<br>JavaScript</div> | Programming language | Core language used across frontend (React) and backend (Node.js) | 
| <div align="center">![Node.js](https://skillicons.dev/icons?i=nodejs)<br>Node.js</div> | JavaScript runtime | Runs the Express backend server for APIs and Socket.io | 
| <div align="center">![Express](https://skillicons.dev/icons?i=express)<br>Express</div> | Node.js web framework | Handles HTTP requests, user auth, routing, and initializes Socket.io | 
| <div align="center"><br>Socket.io</div> | Real-time WebSocket library | Enables bi-directional communication for live chat, uses Redis adapter to scale | 
| <div align="center">![MongoDB](https://skillicons.dev/icons?i=mongodb)<br>MongoDB</div> | NoSQL database | Stores users, chat history, and other app data | 
| <div align="center">![Kafka](https://skillicons.dev/icons?i=kafka)<br>Kafka</div> | Distributed event streaming platform | Handles message brokering; ensures messages are decoupled & can be processed reliably | 
| <div align="center">![Redis](https://skillicons.dev/icons?i=redis)<br>Redis</div> | In-memory data store | Enables Socket.io pub/sub for scaling across servers | 
| <div align="center">![Docker](https://skillicons.dev/icons?i=docker)<br>Docker</div> | Container platform | Runs Kafka, Zookeeper, and Redis services for consistent local dev & deployment | 
| <div align="center">![pnpm](https://skillicons.dev/icons?i=pnpm)<br>pnpm</div> | Fast JS package manager | Installs project dependencies quickly and efficiently | 
| <div align="center">![Postman](https://skillicons.dev/icons?i=postman)<br>Postman</div> | API testing tool | Tests REST APIs during development | 
| <div align="center">![Git](https://skillicons.dev/icons?i=git)<br>Git</div> | Version control | Tracks code changes in the project | 
| <div align="center">![GitHub](https://skillicons.dev/icons?i=github)<br>GitHub</div> | Code hosting platform | Hosts repository for collaboration, CI/CD, and backups |

## DevOps & Observability Stack (Yet to be added...) 
| Technology | Description | Role in Project | 
| -------------------------------------------------------------------------------------------------- | --------------------------- | ---------------------------------------------------------------------------- | 
| <div align="center">![Jenkins](https://skillicons.dev/icons?i=jenkins)<br>Jenkins</div> | Automation server | CI/CD pipeline to build, test, and deploy the application | 
| <div align="center">![Docker](https://skillicons.dev/icons?i=docker)<br>Docker</div> | Image registry | Stores built container images for consistent deployments | <div align="center">![Prometheus](https://skillicons.dev/icons?i=prometheus)<br>Prometheus</div> | Metrics monitoring system | Collects and stores time-series data, powering Grafana dashboards for system metrics | 
| <div align="center">![Grafana](https://skillicons.dev/icons?i=grafana)<br>Grafana</div> | Visualization tool | Dashboards for monitoring metrics & logs | 
| <div align="center">![Sentry](https://skillicons.dev/icons?i=sentry)<br>Sentry</div> | Error tracking & monitoring | Captures exceptions, frontend & backend errors, with alerts and stack traces | 
| <div align="center"><br>Trivy</div> | Security scanner | Scans Docker images for vulnerabilities before pushing to prod |

## Installation & Setup

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/RepairDesk-CarParts-and-User-Management-System.git
   cd RepairDesk-CarParts-and-User-Management-System
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Configure environment variables in `.env`

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=yourpassword
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

5. Start the application

   ```bash
   npm start
   ```

6. Open in browser

   ```
   http://localhost:5000
   ```


## Usage

* **Admin**

  * Manage users and roles
  * Add or remove spare parts
  * Access reports and analytics

* **Staff/Mechanic**

  * Record part usage and sales
  * Search and update inventory
  * Maintain service records


## Future Enhancements

* QR/Barcode scanning for quick part entry.
* Automated billing and invoicing.
* Multi-shop synchronization.
* AI-powered stock forecasting.
* Mobile app integration.

