## Tech Stack Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs (password hashing)

---

## Key Features

### 1. User and Role Management
- User registration and login
- Roles supported: `viewer`, `analyst`, `admin`
- User status supported: active / inactive
- Admin-only APIs to update role and status

### 2. Financial Records Management
- Create, read, update, and delete records
- Each record contains:
  - amount
  - type (`income` / `expense`)
  - category
  - date
  - notes
- Filtering supported using query parameters

### 3. Dashboard Summary APIs
Analytics endpoints were added to support dashboard-level insights:
- total income
- total expense
- net balance
- category-wise totals
- recent activity
- monthly trends

Aggregation is handled using MongoDB aggregation pipelines.

### 4. Access Control (RBAC)
Role-based access control is implemented using middleware.  
Every protected route checks:
- JWT authentication
- role permissions

### 5. Validation and Error Handling
- Required field validation is implemented for important APIs
- Standard JSON response format is maintained
- Proper status codes are returned for errors (400, 401, 403, 404)

---
I kept the structure simple so that it is easy to understand and maintain.

---


create .env file and write the below stuffs

PORT=5000
MONGO_URI=mongodb://localhost:27017/finance_dashboard
JWT_SECRET=zorvyn_secret_key_123
## Setup Instructions (Run Locally)

### 1. Clone the repository
```bash
git clone https://github.com/ritvikbharti/FINANCE-BACKEND.git
cd FINANCE-BACKEND
npm install
npm run dev





API Endpoints
User APIs
Method	Endpoint	Access
POST	/api/users/register	Public
POST	/api/users/login	Public
GET	/api/users	Admin only
PATCH	/api/users/:id/role	Admin only
PATCH	/api/users/:id/status	Admin only
Record APIs
Method	Endpoint	Access
GET	/api/records	Viewer/Analyst/Admin
GET	/api/records/:id	Viewer/Analyst/Admin
POST	/api/records	Admin only
PUT	/api/records/:id	Admin only
DELETE	/api/records/:id	Admin only
Dashboard APIs
Method	Endpoint	Access
GET	/api/dashboard/recent	Viewer/Analyst/Admin
GET	/api/dashboard/summary	Analyst/Admin
GET	/api/dashboard/category-totals	Analyst/Admin
GET	/api/dashboard/monthly-trends	Analyst/Admin


Role Based Access Summary
Endpoint	Viewer	Analyst	Admin
GET /api/records	Allowed	Allowed	Allowed
POST /api/records	Not Allowed	Not Allowed	Allowed
PUT /api/records/:id	Not Allowed	Not Allowed	Allowed
DELETE /api/records/:id	Not Allowed	Not Allowed	Allowed
GET /api/dashboard/recent	Allowed	Allowed	Allowed
GET /api/dashboard/summary	Not Allowed	Allowed	Allowed
GET /api/users	Not Allowed	Not Allowed	Allowed