

# 🏢 SRC — Sri Radhey Consultancy

<div align="center">

### *Powering Industrial Consultancy Through Smart Business Automation*

<img src="https://img.shields.io/badge/Platform-Enterprise%20CRM-0A192F?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Stack-MERN-61DAFB?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge"/>
<img src="https://img.shields.io/badge/API-REST%20Architecture-FF6B35?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge"/>

</div>

---

```yaml id="src001"
Problem Statement:

Industries struggle with:
  - Managing subsidy applications manually
  - Tracking MSME registrations inefficiently
  - Handling compliance paperwork
  - Managing hundreds of client leads
  - Monitoring government policy changes
  - Automating repetitive business workflows

Solution:
  
  → SRC (Sri Radhey Consultancy CRM Platform)
```

SRC is a **full-scale enterprise CRM & consultancy management platform** built to automate industrial consultancy operations involving **government subsidies, MSME schemes, compliance management, client onboarding, policy administration, lead tracking, analytics, and automated business workflows**.

Designed for organizations that handle **high-volume consultancy operations**, SRC centralizes business processes into a single scalable digital ecosystem.

---

# 🎯 Business Problems Solved

```diff id="src002"
- Manual lead tracking through spreadsheets
- Slow subsidy documentation process
- Repetitive client follow-up operations
- Poor compliance deadline monitoring
- Lack of centralized business dashboard
- Unstructured policy administration process

+ Centralized enterprise CRM system
+ Automated subsidy workflow management
+ Smart lead tracking pipeline
+ Compliance monitoring automation
+ Data-driven business analytics
+ Scalable workflow automation
```

---

# ⚙️ Enterprise Modules

<table>
<tr>
<td width="50%">

### 👥 Client Relationship Management

* Client onboarding
* Customer lifecycle tracking
* Consultancy workflow management
* Communication history management

</td>

<td width="50%">

### 💼 Lead Management Engine

* Lead capture system
* Consultant assignment
* Conversion pipeline monitoring
* Automated lead status tracking

</td>
</tr>

<tr>
<td width="50%">

### 🏭 Industrial Subsidy Management

* Subsidy application tracking
* Documentation workflows
* Approval stage monitoring
* Government subsidy automation

</td>

<td width="50%">

### 🏢 MSME Scheme Management

* MSME registration handling
* Eligibility verification
* Scheme processing workflows
* Government scheme administration

</td>
</tr>

<tr>
<td width="50%">

### 📑 Compliance Management

* Compliance deadline tracking
* Regulatory document monitoring
* Certification workflows
* Automated compliance reminders

</td>

<td width="50%">

### 📊 Business Analytics Dashboard

* Revenue insights
* Consultant performance metrics
* Lead conversion analytics
* Operational KPI monitoring

</td>
</tr>
</table>

---

# 🏗️ Platform Architecture

```text id="src003"
                        ┌───────────────────────┐
                        │    React Frontend      │
                        │ Admin + Client Portal  │
                        └────────────┬──────────┘
                                     │
                                     ▼
                        ┌───────────────────────┐
                        │    Express Backend     │
                        │ Business Logic Engine  │
                        └────────────┬──────────┘
                                     │
             ┌───────────────────────┼────────────────────────┐
             ▼                       ▼                        ▼
   ┌────────────────┐      ┌────────────────┐      ┌────────────────┐
   │   MongoDB DB   │      │ Authentication │      │ Notification   │
   │ Business Data  │      │ JWT + Security │      │ Email Service  │
   └────────────────┘      └────────────────┘      └────────────────┘
                                     │
                                     ▼
                        ┌───────────────────────┐
                        │ Workflow Automation    │
                        │ Business Processes     │
                        └───────────────────────┘
```

---

# 🛠 Technology Stack

```typescript id="src004"
Frontend:
  React.js
  Tailwind CSS
  React Router
  Axios

Backend:
  Node.js
  Express.js

Database:
  MongoDB
  Mongoose ODM

Authentication:
  JWT Authentication
  Role Based Access Control

Integrations:
  Nodemailer
  Cloudinary
```

---

# 🔄 Workflow Automation Engine

```javascript id="src005"
const SRC_Workflow = {

  LeadGeneration: "Automated",

  ClientOnboarding: "Digitized",

  SubsidyProcessing: "Centralized",

  MSMEApplications: "Managed",

  ComplianceMonitoring: "Automated",

  PolicyManagement: "Dynamic",

  Notifications: "Email Triggered",

  AnalyticsDashboard: "Real Time"
}
```

---

# 📂 System Modules

```bash id="src006"
SRC/
│
├── frontend/
│   ├── components/
│   ├── dashboard/
│   ├── pages/
│   └── services/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utilities/
│
├── database/
│
└── README.md
```

---

# 🔐 Security Architecture

```bash id="src007"
✔ JWT Authentication
✔ Role-Based Authorization
✔ Protected API Routes
✔ Password Encryption (bcrypt)
✔ Request Validation Middleware
✔ Secure File Upload Validation
✔ Environment Variable Protection
✔ MongoDB Query Sanitization
```

---

# 📈 Operational Impact

```sql id="src008"
SELECT benefits FROM SRC;

+ Reduced Manual Operations
+ Faster Client Processing
+ Better Lead Conversion Rates
+ Improved Compliance Monitoring
+ Centralized Business Data
+ Automated Repetitive Workflows
+ Better Decision Making Through Analytics
```

---

# 💻 Core Engineering Concepts

```cpp id="src009"
Software Engineering:
→ REST API Architecture
→ Authentication Systems
→ Middleware Design
→ CRUD Operations
→ MVC Architecture

Backend Engineering:
→ Business Logic Processing
→ Workflow Automation
→ Database Optimization
→ API Security

System Design:
→ Scalable Architecture
→ Modular Code Structure
→ Separation Of Concerns
```

---

# 🚀 Future Scope

```bash id="src010"
[ ] AI Based Subsidy Recommendation Engine
[ ] Document OCR Verification System
[ ] WhatsApp Notification Integration
[ ] Government Policy Auto Sync
[ ] Smart Analytics Dashboard
[ ] AI Powered Client Support Assistant
[ ] Predictive Business Intelligence
```

---

# 🌍 Why This Project Matters

```bash id="src011"
Enterprise software is about solving scale problems.

SRC transforms traditional consultancy firms
from paperwork-heavy operations into
automated business ecosystems.

This project demonstrates real-world
enterprise software engineering principles.
```

---

<div align="center">

### Built for scalable enterprise automation ⚡

**Simona Singh**

*Building systems that optimize businesses, not just websites.*

</div>

---
