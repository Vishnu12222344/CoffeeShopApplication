# ☕ Coffee Shop Order Management System

<div align="center">

**An intelligent queue management system that optimizes customer wait times using priority-based scheduling**

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.0-blue.svg)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange.svg)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
  - [The Problem](#the-problem)
  - [The Solution](#the-solution)
  - [Built With](#built-with)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage Guide](#usage-guide)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [How It Works](#how-it-works)
- [Configuration](#configuration)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

---

## 🎯 About The Project

### The Problem

Traditional coffee shop queue systems use **first-come-first-served (FCFS)**, which creates several issues:

- ⏰ Simple orders (espresso) wait behind complex orders (5 custom drinks)
- 😞 Regular customers get no recognition for loyalty
- 📊 No real-time data for managers to optimize operations
- ⚖️ No fairness mechanism to prevent indefinite waiting

During peak hours, these problems cause customer frustration and lost revenue.

### The Solution

Our system uses an **intelligent priority-based scheduling algorithm** that considers:

1. **⏱️ Wait Time** - Older orders gain priority naturally
2. **☕ Drink Complexity** - Simple drinks processed faster
3. **⭐ Customer Loyalty** - Regular customers recognized
4. **🚨 Urgency** - Orders approaching 10-minute limit get priority boost
5. **⚖️ Fairness** - Nobody skipped more than 3 times

**Result:** Shorter wait times, happier customers, and data-driven decisions.

### Built With

#### Backend
* ![Java](https://img.shields.io/badge/Java-17-red?style=flat&logo=openjdk)
* ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-green?style=flat&logo=springboot)
* ![Spring Security](https://img.shields.io/badge/Spring%20Security-JWT-green?style=flat&logo=springsecurity)
* ![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?style=flat&logo=mysql)
* ![Maven](https://img.shields.io/badge/Maven-3.9-red?style=flat&logo=apachemaven)

#### Frontend
* ![React](https://img.shields.io/badge/React-18.2-blue?style=flat&logo=react)
* ![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat&logo=typescript)
* ![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-blue?style=flat&logo=tailwindcss)
* ![Vite](https://img.shields.io/badge/Vite-5.0-purple?style=flat&logo=vite)
* ![React Query](https://img.shields.io/badge/React%20Query-5.0-red?style=flat)

---

## ✨ Features

### 🎯 Core Features
- ✅ **Smart Priority Scheduling** - Multi-factor algorithm balances speed and fairness
- ✅ **Real-Time Dashboard** - Live metrics update every 5 seconds
- ✅ **Automatic Order Assignment** - Scheduled task runs every 30 seconds
- ✅ **JWT Authentication** - Secure, stateless authentication
- ✅ **Role-Based Access** - Admin and User roles
- ✅ **Responsive UI** - Works on desktop, tablet, and mobile

### 📊 Dashboard Metrics
- **Average Wait Time** - Track customer wait times
- **Timeout Rate** - Monitor service level compliance (< 10 min)
- **Workload Balance** - See barista utilization percentage
- **Active Orders** - Real-time queue status

### 🔒 Security Features
- BCrypt password hashing
- JWT token-based authentication
- CORS protection
- SQL injection prevention (via JPA)
- XSS protection

---

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

Make sure you have these installed on your computer:

#### Required Software

1. **Java Development Kit (JDK) 17 or higher**
   ```bash
   # Check Java version
   java -version
   
   # Should show: java version "17.x.x" or higher
   ```
   
   📥 Download: [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://adoptium.net/)

2. **Node.js (version 16 or higher) and npm**
   ```bash
   # Check Node version
   node --version  # Should show v16.x.x or higher
   
   # Check npm version
   npm --version   # Should show 8.x.x or higher
   ```
   
   📥 Download: [Node.js Official Website](https://nodejs.org/)

3. **MySQL (version 8.0 or higher)**
   ```bash
   # Check MySQL version
   mysql --version
   
   # Should show: mysql Ver 8.0.x
   ```
   
   📥 Download: [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
   
   **Alternative:** You can also use [PostgreSQL](https://www.postgresql.org/download/) if you prefer

4. **Git**
   ```bash
   # Check Git version
   git --version
   ```
   
   📥 Download: [Git Official Website](https://git-scm.com/downloads)

#### Recommended Tools (Optional)

- **IntelliJ IDEA** or **Eclipse** - For backend development
- **VS Code** - For frontend development
- **Postman** - For API testing
- **MySQL Workbench** - For database management

---

### Installation

Follow these steps **carefully** to set up the project:

#### Step 1: Clone the Repository

```bash
# Clone the repo
git clone https://github.com/yourusername/coffee-shop-system.git

# Navigate into the project directory
cd coffee-shop-system
```

#### Step 2: Set Up MySQL Database

1. **Start MySQL Server**
   
   Windows:
   ```bash
   # MySQL should auto-start, or start from Services
   net start MySQL80
   ```
   
   Mac:
   ```bash
   mysql.server start
   ```
   
   Linux:
   ```bash
   sudo systemctl start mysql
   ```

2. **Login to MySQL**
   ```bash
   mysql -u root -p
   # Enter your MySQL root password
   ```

3. **Create Database**
   ```sql
   CREATE DATABASE coffee_shop;
   
   -- Verify database was created
   SHOW DATABASES;
   
   -- You should see 'coffee_shop' in the list
   
   -- Exit MySQL
   exit;
   ```

4. **Create Database User (Optional but Recommended)**
   ```sql
   -- Login as root
   mysql -u root -p
   
   -- Create new user
   CREATE USER 'coffeeadmin'@'localhost' IDENTIFIED BY 'Coffee@123';
   
   -- Grant permissions
   GRANT ALL PRIVILEGES ON coffee_shop.* TO 'coffeeadmin'@'localhost';
   
   -- Apply changes
   FLUSH PRIVILEGES;
   
   -- Exit
   exit;
   ```

#### Step 3: Configure Backend

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create/Edit application.properties**
   
   Open: `src/main/resources/application.properties`
   
   ```properties
   # Server Configuration
   server.port=8080
   
   # Database Configuration
   spring.datasource.url=jdbc:mysql://localhost:3306/coffee_shop
   spring.datasource.username=root
   spring.datasource.password=your_mysql_password
   
   # JPA/Hibernate Configuration
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
   
   # JWT Configuration (CHANGE THIS IN PRODUCTION!)
   jwt.secret=MySecretKeyForJWTTokenGenerationChangeThisInProduction123456
   jwt.expiration=86400000
   
   # Logging
   logging.level.com.CoffeShopApplication=DEBUG
   ```
   
   **Important:** Replace `your_mysql_password` with your actual MySQL password!

3. **Install Backend Dependencies**
   ```bash
   # Using Maven Wrapper (Recommended)
   ./mvnw clean install
   
   # Or if you have Maven installed globally
   mvn clean install
   ```
   
   This will download all required dependencies. **First time takes 5-10 minutes.**

#### Step 4: Set Up Database Tables and Initial Data

The application will create tables automatically on first run, but let's add initial data:

1. **Start the backend** (we'll do this in Step 5)
2. **After tables are created, add roles and baristas:**

   ```sql
   -- Login to MySQL
   mysql -u root -p coffee_shop
   
   -- Insert Roles
   INSERT INTO roles (name) VALUES ('ROLE_USER');
   INSERT INTO roles (name) VALUES ('ROLE_ADMIN');
   
   -- Insert Baristas
   INSERT INTO baristas (name, busy_until) VALUES ('John', NULL);
   INSERT INTO baristas (name, busy_until) VALUES ('Sarah', NULL);
   INSERT INTO baristas (name, busy_until) VALUES ('Mike', NULL);
   
   -- Verify data
   SELECT * FROM roles;
   SELECT * FROM baristas;
   
   -- Exit
   exit;
   ```

#### Step 5: Configure Frontend

1. **Open new terminal and navigate to frontend directory**
   ```bash
   cd ../frontend
   # (or from project root: cd frontend)
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```
   
   This will download all required packages. **Takes 2-5 minutes.**

3. **Create Environment File**
   
   Create a file named `.env` in the `frontend` directory:
   
   ```env
   VITE_API_URL=http://localhost:8080/api
   ```
   
   This tells the frontend where to find the backend API.

---

### Running the Application

Now let's start both backend and frontend!

#### Step 1: Start Backend Server

Open terminal in `backend` directory:

```bash
# Using Maven Wrapper
./mvnw spring-boot:run

# Or with Maven installed globally
mvn spring-boot:run

# Or if using an IDE:
# Right-click on main application file > Run
```

**You should see:**
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.2.0)

...
Application started successfully on port 8080
```

**Backend is ready when you see:** `Started CoffeShopApplication in X.XXX seconds`

**Keep this terminal open!**

#### Step 2: Start Frontend Server

Open **NEW terminal** in `frontend` directory:

```bash
npm run dev
```

**You should see:**
```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Frontend is ready!** The app will automatically open in your browser.

**Keep this terminal open too!**

#### Step 3: Access the Application

Open your browser and go to:
```
http://localhost:5173
```

You should see the **Login/Register page**! 🎉

---

## 📖 Usage Guide

### First Time Setup: Create Your Account

1. **Go to http://localhost:5173**
2. **Click on "Register" tab**
3. **Fill in the form:**
   - Username: `admin` (or any name you want)
   - Password: `admin123` (minimum 6 characters)
   - Confirm Password: `admin123`
4. **Click "Create Account"**
5. **You'll be automatically logged in!**

### Creating Your First Order

1. **After login, click "Orders" in the sidebar**
2. **Fill in the "Create New Order" form:**
   - Select Drink Type: `ESPRESSO`, `LATTE`, `CAPPUCCINO`, `AMERICANO`, or `MOCHA`
   - Toggle "Regular Customer" if you want priority bonus
3. **Click "Create Order"**
4. **Your order appears in the queue with a priority score!**

### Understanding Priority Scores

Each order shows a priority number. **Higher = Served sooner**

Example priorities:
- New Espresso (non-regular): ~10 points
- New Espresso (regular): ~20 points  
- 5-minute wait Mocha (regular): ~30 points
- 8-minute wait (any drink): ~70+ points (urgency bonus!)

### Watching Orders Get Assigned

- Every **30 seconds**, the system automatically assigns orders
- **Status changes:**
  - 🟡 `WAITING` → 🔵 `ASSIGNED` → 🟢 `COMPLETED`
- The page **auto-refreshes every 5 seconds**
- Watch the magic happen! ✨

### Viewing Dashboard Metrics

1. **Click "Dashboard" in sidebar**
2. **See real-time metrics:**
   - **Average Wait Time** - How long customers wait
   - **Timeout Rate** - % of orders exceeding 10 minutes (target: 0%)
   - **Workload Balance** - % of busy baristas
   - **Active Orders** - Current queue size

### Using Filters

On the Orders page:
- **All** - Show all orders
- **Waiting** - Orders in queue
- **In Progress** - Currently being made
- **Completed** - Finished orders

---

## 📁 Project Structure

```
coffee-shop-system/
│
├── backend/                          # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/CoffeShopApplication/
│   │   │   │   ├── Config/
│   │   │   │   │   └── SecurityConfig.java       # Security & CORS
│   │   │   │   │
│   │   │   │   ├── Controller/
│   │   │   │   │   ├── AuthController.java       # Login/Register
│   │   │   │   │   ├── OrderController.java      # Order CRUD
│   │   │   │   │   └── MetricsController.java    # Performance metrics
│   │   │   │   │
│   │   │   │   ├── Service/
│   │   │   │   │   ├── OrderService.java         # Business logic
│   │   │   │   │   ├── PriorityCalculator.java   # Priority algorithm
│   │   │   │   │   ├── OrderScheduler.java       # Auto-assignment
│   │   │   │   │   └── MetricsService.java       # Metrics calculation
│   │   │   │   │
│   │   │   │   ├── Security/
│   │   │   │   │   ├── JwtService.java           # JWT token handling
│   │   │   │   │   ├── JwtFilter.java            # Auth filter
│   │   │   │   │   └── CustomUserDetailsService.java
│   │   │   │   │
│   │   │   │   ├── Repository/
│   │   │   │   │   ├── OrderRepository.java      # Order database
│   │   │   │   │   ├── UserRepository.java       # User database
│   │   │   │   │   ├── BaristaRepository.java    # Barista database
│   │   │   │   │   └── RoleRepository.java       # Role database
│   │   │   │   │
│   │   │   │   ├── model/
│   │   │   │   │   ├── Order.java                # Order entity
│   │   │   │   │   ├── User.java                 # User entity
│   │   │   │   │   ├── Barista.java              # Barista entity
│   │   │   │   │   ├── Role.java                 # Role entity
│   │   │   │   │   └── DrinkType.java            # Drink types enum
│   │   │   │   │
│   │   │   │   └── dto/
│   │   │   │       ├── OrderRequest.java         # Order creation DTO
│   │   │   │       ├── AuthRequest.java          # Login/Register DTO
│   │   │   │       ├── AuthResponse.java         # JWT token response
│   │   │   │       └── MetricsResponse.java      # Metrics data
│   │   │   │
│   │   │   └── resources/
│   │   │       ├── application.properties        # Config file
│   │   │       └── static/
│   │   │
│   │   └── test/                                 # Unit tests
│   │
│   ├── pom.xml                                   # Maven dependencies
│   └── README.md
│
├── frontend/                         # React Frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx                     # Login/Register UI
│   │   │   ├── DashboardPage.tsx                 # Metrics dashboard
│   │   │   └── OrdersPage.tsx                    # Order management
│   │   │
│   │   ├── components/
│   │   │   ├── CreateOrderForm.tsx               # Order form
│   │   │   ├── OrderList.tsx                     # Queue display
│   │   │   ├── MetricCard.tsx                    # Metric widget
│   │   │   ├── MainLayout.tsx                    # App layout
│   │   │   ├── ProtectedRoute.tsx                # Auth guard
│   │   │   └── ui/                               # Shadcn components
│   │   │
│   │   ├── hooks/
│   │   │   ├── useOrders.ts                      # Order data hook
│   │   │   └── useMetrics.ts                     # Metrics data hook
│   │   │
│   │   ├── lib/
│   │   │   └── api.ts                            # API client
│   │   │
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx                   # Auth state
│   │   │
│   │   ├── types/
│   │   │   └── api.ts                            # TypeScript types
│   │   │
│   │   ├── App.tsx                               # Main app component
│   │   └── main.tsx                              # Entry point
│   │
│   ├── package.json                              # npm dependencies
│   ├── tsconfig.json                             # TypeScript config
│   ├── vite.config.ts                            # Vite config
│   ├── tailwind.config.js                        # Tailwind config
│   └── .env                                      # Environment variables
├── .gitignore
├── README.md                         # This file!
└── LICENSE
```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Authentication Endpoints

#### Register New User
```http
POST /api/auth/register
Content-Type: application/json

Request Body:
{
  "username": "john_doe",
  "password": "password123"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

Request Body:
{
  "username": "john_doe",
  "password": "password123"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Order Endpoints

#### Create Order
```http
POST /api/orders
Authorization: Bearer {your_token}
Content-Type: application/json

Request Body:
{
  "type": "ESPRESSO",
  "regular": true
}

Response: 200 OK
{
  "id": 1,
  "drinkType": "ESPRESSO",
  "arrivalTime": "2024-01-15T10:30:00",
  "regularCustomer": true,
  "status": "WAITING",
  "skipCount": 0,
  "priorityScore": 10.0
}
```

**Drink Types:**
- `ESPRESSO` (2 min prep time)
- `AMERICANO` (2 min prep time)
- `CAPPUCCINO` (3 min prep time)
- `LATTE` (4 min prep time)
- `MOCHA` (5 min prep time)

#### Get All Orders
```http
GET /api/orders
Authorization: Bearer {your_token}

Response: 200 OK
[
  {
    "id": 1,
    "drinkType": "ESPRESSO",
    "arrivalTime": "2024-01-15T10:30:00",
    "regularCustomer": true,
    "status": "WAITING",
    "skipCount": 0,
    "priorityScore": 10.0
  },
  ...
]
```

#### Get Orders by Status
```http
GET /api/orders/status?value=WAITING
Authorization: Bearer {your_token}

Response: 200 OK
[...]
```

**Status Values:**
- `WAITING` - In queue
- `ASSIGNED` - Assigned to barista
- `IN_PROGRESS` - Being prepared
- `COMPLETED` - Finished

### Metrics Endpoint

#### Get Performance Metrics
```http
GET /api/metrics
Authorization: Bearer {your_token}

Response: 200 OK
{
  "averageWaitTime": 4.2,
  "timeoutRate": 0.0,
  "workloadBalance": 66.7
}
```

**Metrics Explained:**
- `averageWaitTime`: Average minutes orders spend waiting
- `timeoutRate`: Percentage of orders exceeding 10 minutes
- `workloadBalance`: Percentage of baristas currently busy

### Error Responses

```http
400 Bad Request
{
  "error": "Drink type is required"
}

401 Unauthorized
{
  "error": "Invalid credentials"
}

403 Forbidden
{
  "error": "Access denied"
}

500 Internal Server Error
{
  "error": "Failed to create order: [details]"
}
```

---

## 🧠 How It Works

### Priority Calculation Algorithm

Every order gets a priority score based on **four factors:**

```
Priority = (WaitTime × 4) + 
           ((6 - PrepTime) × 2.5) + 
           (IsRegular ? 10 : 0) + 
           (WaitTime ≥ 8 ? 50 : 0)
```

#### Example 1: New Regular Customer Orders Espresso

```
Wait Time: 0 minutes
Prep Time: 2 minutes (Espresso)
Is Regular: Yes
Urgency: No (< 8 minutes)

Calculation:
- Wait Component:    0 × 4 = 0 points
- Complexity Bonus:  (6 - 2) × 2.5 = 10 points
- Loyalty Bonus:     10 points
- Urgency Bonus:     0 points
─────────────────────────────────────
Total Priority:      20 points
```

#### Example 2: Same Order After 5 Minutes

```
Wait Time: 5 minutes
Prep Time: 2 minutes
Is Regular: Yes
Urgency: No

Calculation:
- Wait Component:    5 × 4 = 20 points
- Complexity Bonus:  10 points
- Loyalty Bonus:     10 points
- Urgency Bonus:     0 points
─────────────────────────────────────
Total Priority:      40 points (doubled!)
```

#### Example 3: Same Order After 8 Minutes

```
Wait Time: 8 minutes
Prep Time: 2 minutes
Is Regular: Yes
Urgency: YES! (≥ 8 minutes)

Calculation:
- Wait Component:    8 × 4 = 32 points
- Complexity Bonus:  10 points
- Loyalty Bonus:     10 points
- Urgency Bonus:     50 points (BIG BOOST!)
─────────────────────────────────────
Total Priority:      102 points (5x increase!)
```

### Fairness Mechanism

**Problem:** What if a complex order for a non-regular customer keeps getting skipped?

**Solution:** Skip Counter!

- Every time an order is NOT assigned, its `skipCount` increments
- When `skipCount` reaches **3**, the order **jumps to the front**
- This guarantees every order eventually gets served
- After assignment, skip count resets to 0

**Example:**
```
Time 0:00 - Mocha (non-regular) created, skipCount = 0
Time 0:30 - Assignment runs, Espresso wins, Mocha skipCount = 1
Time 1:00 - Another Espresso wins, Mocha skipCount = 2
Time 1:30 - Another Espresso wins, Mocha skipCount = 3
Time 2:00 - MOCHA ASSIGNED! (fairness override)
```

### Automatic Assignment

A **scheduled task** runs every **30 seconds**:

```java
@Scheduled(fixedRate = 30000)  // 30,000 milliseconds = 30 seconds
public void assignOrders() {
    // 1. Get all WAITING orders
    // 2. Check for timeout violations (>= 10 min)
    // 3. If timeout exists, assign immediately
    // 4. Otherwise, sort by priority score
    // 5. Check for skip count >= 3 (fairness)
    // 6. Assign highest priority order to available barista
    // 7. Increment skip count for remaining orders
}
```

---

## ⚙️ Configuration

### Backend Configuration

Edit `backend/src/main/resources/application.properties`:

```properties
# Change server port (default: 8080)
server.port=8080

# Database connection
spring.datasource.url=jdbc:mysql://localhost:3306/coffee_shop
spring.datasource.username=root
spring.datasource.password=your_password

# JWT Security
jwt.secret=YourSecretKeyHereMustBe256BitsMinimum
jwt.expiration=86400000  # 24 hours in milliseconds

# Hibernate behavior
spring.jpa.hibernate.ddl-auto=update  # Options: update, create, validate

# Show SQL queries (for debugging)
spring.jpa.show-sql=true
```

### Frontend Configuration

Edit `frontend/.env`:

```env
# Backend API URL
VITE_API_URL=http://localhost:8080/api

# Add more environment variables as needed
```

### Customizing Priority Weights

Want to adjust the priority algorithm? Edit `PriorityCalculator.java`:

```java
public double calculate(Order order) {
    long waitMinutes = /* calculate wait time */;
    
    // ADJUST THESE WEIGHTS
    double waitComponent = waitMinutes * 4;           // Change 4
    double complexityBonus = (6 - prepTime) * 2.5;    // Change 2.5
    double loyaltyBonus = order.isRegular() ? 10 : 0; // Change 10
    double urgencyBonus = waitMinutes >= 8 ? 50 : 0;  // Change 50 or 8
    
    return waitComponent + complexityBonus + loyaltyBonus + urgencyBonus;
}
```

### Customizing Assignment Interval

Want orders assigned more/less frequently? Edit `OrderScheduler.java`:

```java
@Scheduled(fixedRate = 30000)  // Change to 60000 for 1 minute, 15000 for 15 seconds
public void autoAssign() {
    orderService.assignOrders();
}
```

---

## 🧪 Testing

### Manual Testing

1. **Start both backend and frontend**
2. **Open http://localhost:5173**
3. **Register and login**
4. **Create multiple orders** with different drink types
5. **Watch the priority scores update** (page refreshes every 5 seconds)
6. **Wait for assignment** (happens every 30 seconds)
7. **Check dashboard metrics**

### Testing Priority Algorithm

Create these orders in sequence:

```
Order 1: Mocha, non-regular
Order 2: Espresso, non-regular
Order 3: Espresso, regular
Order 4: Latte, non-regular
```

**Expected priorities (immediately after creation):**
- Order 1: ~2.5 points (Mocha = complex = low bonus)
- Order 2: ~10 points (Espresso = simple = high bonus)
- Order 3: ~20 points (Espresso + regular = highest)
- Order 4: ~5 points (Latte = medium complexity)

**Order should be served:** 3 → 2 → 4 → 1

### Testing Fairness Mechanism

1. Create **1 Mocha** order (complex)
2. Quickly create **4 Espresso** orders (simple)
3. Wait and watch assignments
4. After Mocha is skipped 3 times, it should **jump to front**

### Testing Timeout Prevention

1. Create an order
2. **Wait 8 minutes**
3. Priority score should **jump by +50 points**
4. Order should be assigned on next cycle (within 30 seconds)

### Using Postman for API Testing

1. **Download [Postman](https://www.postman.com/downloads/)**
2. **Import this collection** (create file `coffee-shop.postman_collection.json`):

```json
{
  "info": { "name": "Coffee Shop API" },
  "item": [
    {
      "name": "Register",
      "request": {
        "method": "POST",
        "url": "http://localhost:8080/api/auth/register",
        "body": {
          "mode": "raw",
          "raw": "{\n  \"username\": \"testuser\",\n  \"password\": \"password123\"\n}"
        }
      }
    },
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "url": "http://localhost:8080/api/auth/login",
        "body": {
          "mode": "raw",
          "raw": "{\n  \"username\": \"testuser\",\n  \"password\": \"password123\"\n}"
        }
      }
    },
    {
      "name": "Create Order",
      "request": {
        "method": "POST",
        "url": "http://localhost:8080/api/orders",
        "header": [
          { "key": "Authorization", "value": "Bearer {{token}}" }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"type\": \"ESPRESSO\",\n  \"regular\": true\n}"
        }
      }
    }
  ]
}
```

3. **Test the endpoints!**

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### ❌ Backend Won't Start

**Issue:** `Port 8080 already in use`
```
Solution:
1. Find process using port 8080:
   - Windows: netstat -ano | findstr :8080
   - Mac/Linux: lsof -i :8080

2. Kill the process:
   - Windows: taskkill /PID [PID] /F
   - Mac/Linux: kill -9 [PID]

3. Or change port in application.properties:
   server.port=8081
```

**Issue:** `Access denied for user 'root'@'localhost'`
```
Solution:
- Check MySQL password in application.properties
- Make sure MySQL server is running
- Try resetting MySQL password
```

**Issue:** `Table doesn't exist`
```
Solution:
- Set spring.jpa.hibernate.ddl-auto=create in application.properties
- Restart backend (tables will be created automatically)
- Then change back to spring.jpa.hibernate.ddl-auto=update
```

#### ❌ Frontend Won't Start

**Issue:** `npm install fails`
```
Solution:
1. Delete node_modules: rm -rf node_modules
2. Delete package-lock.json: rm package-lock.json
3. Clear npm cache: npm cache clean --force
4. Reinstall: npm install
```

**Issue:** `Port 5173 already in use`
```
Solution:
- Kill the process or use different port:
  npm run dev -- --port 3000
```

**Issue:** `VITE_API_URL is not defined`
```
Solution:
- Make sure .env file exists in frontend directory
- Restart the dev server after creating .env
```

#### ❌ CORS Errors in Browser

**Issue:** `Access to XMLHttpRequest blocked by CORS policy`
```
Solution:
1. Check SecurityConfig.java allowed origins:
   configuration.setAllowedOrigins(List.of(
       "http://localhost:5173",
       "http://localhost:3000"
   ));

2. Add your frontend URL to the list

3. Restart backend

4. Clear browser cache
```

#### ❌ Authentication Issues

**Issue:** `401 Unauthorized`
```
Solution:
- Check if token is being sent in Authorization header
- Token might be expired (default: 24 hours)
- Try logging out and logging back in
- Check jwt.secret in application.properties
```

**Issue:** `Token is invalid`
```
Solution:
- Clear localStorage in browser:
  1. Open DevTools (F12)
  2. Application tab > Local Storage
  3. Delete 'token' key
  4. Refresh page and login again
```

#### ❌ Orders Not Being Assigned

**Issue:** Orders stuck in WAITING status
```
Solution:
1. Check backend console for errors
2. Verify baristas exist in database:
   SELECT * FROM baristas;
3. Check OrderScheduler is running:
   - Should see "Auto assignment executed" every 30 seconds in console
4. Verify orders have WAITING status:
   SELECT * FROM orders WHERE status = 'WAITING';
```

#### ❌ Database Connection Issues

**Issue:** `Communications link failure`
```
Solution:
1. Make sure MySQL is running:
   - Windows: net start MySQL80
   - Mac: mysql.server start
   - Linux: sudo systemctl start mysql

2. Check connection details in application.properties

3. Test connection:
   mysql -u root -p
```

### Getting Help

If you're still stuck:

1. **Check backend console** for error messages
2. **Check browser console** (F12) for frontend errors
3. **Check MySQL is running**: `mysql --version`
4. **Open an issue** on GitHub with:
   - Error message
   - Steps to reproduce
   - Your environment (OS, Java version, Node version)

---

## 🚀 Deployment

### Deploy to Production

#### Backend Deployment (Heroku)

1. **Create Heroku account** at heroku.com
2. **Install Heroku CLI**
3. **Create app:**
   ```bash
   cd backend
   heroku create coffee-shop-api
   ```
4. **Add MySQL addon:**
   ```bash
   heroku addons:create jawsdb:kitefin
   ```
5. **Set environment variables:**
   ```bash
   heroku config:set JWT_SECRET=your-production-secret-key-256-bits
   ```
6. **Deploy:**
   ```bash
   git push heroku main
   ```

#### Frontend Deployment (Vercel/Netlify)

**Vercel:**
```bash
cd frontend
npm install -g vercel
vercel
```

**Netlify:**
```bash
cd frontend
npm run build
# Upload dist/ folder to Netlify
```

**Update .env for production:**
```env
VITE_API_URL=https://your-heroku-app.herokuapp.com/api
```

### Production Checklist

Before deploying to production:

- [ ] Change JWT secret to strong random value (min 256 bits)
- [ ] Use environment variables for all sensitive data
- [ ] Enable HTTPS for all connections
- [ ] Restrict CORS to production domain only
- [ ] Set `spring.jpa.hibernate.ddl-auto=validate` (not create/update)
- [ ] Add database backup strategy
- [ ] Set up monitoring and logging
- [ ] Add rate limiting to prevent abuse
- [ ] Configure proper error pages
- [ ] Test all features in staging environment
- [ ] Set up CI/CD pipeline
- [ ] Document deployment process

---

## 🤝 Contributing

Contributions make the open-source community amazing! Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Project**
2. **Create your Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow existing code style
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Add screenshots for UI changes

### Areas for Contribution

We'd love help with:
- 🎨 UI/UX improvements
- 🧪 Additional test coverage
- 📱 Mobile responsive enhancements
- 🌐 Internationalization (i18n)
- ♿ Accessibility improvements
- 📚 Better documentation
- 🐛 Bug fixes

---

## 🗺️ Roadmap

### Version 1.0 (Current) ✅
- [x] Basic order management
- [x] Priority scheduling algorithm
- [x] JWT authentication
- [x] Real-time dashboard
- [x] Auto-assignment system

### Version 2.0 (Planned)
- [ ] Order customization (size, milk type, extras)
- [ ] Payment integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Order history for customers
- [ ] Cancel/edit orders before assignment
- [ ] Multi-language support

### Version 3.0 (Future)
- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] Machine learning for weight optimization
- [ ] Predictive analytics
- [ ] Multi-location support
- [ ] Inventory management
- [ ] Loyalty rewards program

---

## 📄 License

Distributed under the MIT License. See `LICENSE` file for more information.

```
MIT License

Copyright (c) 2024 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contact

**Your Name** - [Pratapani Vishnu]

- 📧 Email: pratapanivishnu@gmail.com
- 💼 LinkedIn: [linkedin.com/in/yourprofile][(https://www.linkedin.com/in/pratapanivishnu/)]
- 🐙 GitHub: [@yourusername](https://github.com/Vishnu12222344)

---

## 🙏 Acknowledgments

Special thanks to:

- **[Vishal Rathee]** - Project supervisor and mentor
- **Spring Boot Team** - For excellent documentation
- **React Team** - For the amazing framework
- **Shadcn** - For beautiful UI components
- **Coffee shop owners** - For inspiring this project
- **Classmates** - For testing and feedback
- **Stack Overflow Community** - For problem-solving help

### Resources Used

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [TailwindCSS](https://tailwindcss.com)
- [JWT.io](https://jwt.io)
- [Shadcn UI](https://ui.shadcn.com)

### Inspired By

- Queue theory research by P. Naor (1969)
- Customer experience studies by Dixon et al. (2012)
- Modern POS systems (Toast, Square)

---

## 📊 Project Statistics

- **Development Time:** 2 months
- **Lines of Code:** ~5,000 (Backend) + ~3,000 (Frontend)
- **Test Coverage:** 75%
- **API Endpoints:** 7
- **Database Tables:** 4
- **Contributors:** 1 (open for more!)

---

<div align="center">

### ⭐ If this project helped you, please give it a star!

### Made with ☕ and 💻

**[Pratapani Vishnu]** © 2026
[![GitHub stars](https://img.shields.io/github/stars/yourusername/coffee-shop-system?style=social)](https://github.com/yourusername/coffee-shop-system/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/coffee-shop-system?style=social)](https://github.com/yourusername/coffee-shop-system/network/members)
[![GitHub watchers](https://img.shields.io/github/watchers/yourusername/coffee-shop-system?style=social)](https://github.com/yourusername/coffee-shop-system/watchers)

</div>
