# Technical Vocabulary Guide: Next.js & Database Integration

## **Table of Contents**
1. [Next.js Core Concepts](#nextjs-core-concepts)
2. [React Fundamentals](#react-fundamentals)
3. [Routing & Navigation](#routing--navigation)
4. [Database Concepts](#database-concepts)
5. [Prisma & ORM](#prisma--orm)
6. [API & HTTP](#api--http)
7. [JavaScript/Node.js](#javascriptnodejs)
8. [Development Tools](#development-tools)
9. [Deployment & Production](#deployment--production)

---

## **Next.js Core Concepts**

### **Next.js**
A React framework that provides server-side rendering, routing, and optimization out of the box.
```javascript
// Example: Basic Next.js app structure
// app/page.js - Home page
export default function Home() {
  return <h1>Welcome to Next.js</h1>
}
```

### **App Router**
The modern Next.js routing system using the `app/` directory (replaces old `pages/` directory).
```
app/
  page.js          -> Route: /
  about/
    page.js        -> Route: /about
  projects/
    page.js        -> Route: /projects
```

### **Server Components (RSC)**
React components that render on the server by default in Next.js 13+. They can directly access databases and APIs without exposing secrets to the client.
```javascript
// Server Component - runs on server
export default async function Projects() {
  const projects = await prisma.project.findMany(); // Direct DB access!
  return <div>{projects.map(p => <p>{p.title}</p>)}</div>
}
```

### **Client Components**
Components that run in the browser, needed for interactivity (useState, onClick, etc.). Must include `'use client'` at the top.
```javascript
'use client' // This directive makes it a client component

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>
}
```

### **SSR (Server-Side Rendering)**
HTML is generated on the server for each request, then sent to the browser.
```javascript
// Next.js does this automatically for Server Components
export default async function Page() {
  const data = await fetch('https://api.example.com/data')
  return <div>{data.title}</div> // Pre-rendered on server
}
```

### **SSG (Static Site Generation)**
HTML is generated at build time and reused for each request (super fast!).
```javascript
// Generated once at build time
export default function About() {
  return <h1>About Us</h1> // This becomes static HTML
}
```

### **ISR (Incremental Static Regeneration)**
Allows you to update static pages after build time without rebuilding the entire site.
```javascript
export const revalidate = 60 // Regenerate page every 60 seconds

export default async function Page() {
  const data = await fetch('https://api.example.com/data')
  return <div>{data.title}</div>
}
```

### **Hydration**
The process where React takes over the server-rendered HTML and makes it interactive in the browser.
```
1. Server sends HTML -> 2. Browser displays it -> 3. React "hydrates" (adds interactivity)
```

### **Layout**
A component that wraps multiple pages, used for shared UI elements like navigation bars.
```javascript
// app/layout.js - Wraps all pages
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <nav>Navigation Bar</nav>
        {children} {/* Each page renders here */}
        <footer>Footer</footer>
      </body>
    </html>
  )
}
```

### **Metadata**
SEO information (title, description) for each page.
```javascript
export const metadata = {
  title: 'My Portfolio',
  description: 'Welcome to my amazing portfolio'
}
```

### **Dynamic Routes**
Routes with variable segments, like `/projects/1` or `/projects/2`.
```javascript
// app/projects/[id]/page.js
export default function ProjectDetail({ params }) {
  return <h1>Project ID: {params.id}</h1>
}
// Route: /projects/123 -> params.id = "123"
```

### **Route Handlers**
Server-side API endpoints in Next.js using `route.js` files.
```javascript
// app/api/projects/route.js
export async function GET(request) {
  const projects = await prisma.project.findMany()
  return Response.json(projects)
}
```

---

## **React Fundamentals**

### **Component**
A reusable piece of UI (like a building block). Can be a function that returns JSX.
```javascript
function Button() {
  return <button>Click Me</button>
}
```

### **JSX (JavaScript XML)**
Syntax that looks like HTML but is actually JavaScript. Gets converted to `React.createElement()` calls.
```javascript
const element = <h1 className="title">Hello</h1>
// Becomes: React.createElement('h1', {className: 'title'}, 'Hello')
```

### **Props (Properties)**
Data passed from parent component to child component (one-way data flow).
```javascript
// Parent passes name prop
<Greeting name="John" />

// Child receives it
function Greeting({ name }) {
  return <h1>Hello {name}</h1>
}
```

### **State**
Data that can change over time in a component. Causes re-renders when updated.
```javascript
const [count, setCount] = useState(0)
// count = current value
// setCount = function to update it
```

### **Hook**
Special functions that let you use React features (start with "use"). Examples: `useState`, `useEffect`, `useRouter`.
```javascript
import { useState, useEffect } from 'react'

function Example() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    // Runs after component renders
    fetchData()
  }, [])
}
```

### **useEffect**
Hook that runs side effects (data fetching, subscriptions) after render.
```javascript
useEffect(() => {
  console.log('Component mounted or count changed')
  return () => console.log('Cleanup')
}, [count]) // Only re-run if 'count' changes
```

### **useState**
Hook that adds state to functional components.
```javascript
const [name, setName] = useState('John')
setName('Jane') // Updates name and re-renders component
```

### **useRouter**
Next.js hook for programmatic navigation.
```javascript
'use client'
import { useRouter } from 'next/navigation'

function MyComponent() {
  const router = useRouter()
  router.push('/about') // Navigate to /about
}
```

### **Event Handler**
Function that runs when user interacts with UI (click, type, submit, etc.).
```javascript
function handleClick() {
  alert('Button clicked!')
}

<button onClick={handleClick}>Click Me</button>
```

### **Controlled Component**
Form input whose value is controlled by React state.
```javascript
const [email, setEmail] = useState('')

<input 
  value={email} 
  onChange={(e) => setEmail(e.target.value)} 
/>
```

---

## **Routing & Navigation**

### **Route**
A URL path that maps to a specific page or component.
```
/               -> Home page
/about          -> About page
/projects       -> Projects list
/projects/1     -> Project detail (ID: 1)
```

### **Nested Routes**
Routes organized in a hierarchy using folder structure.
```
app/
  dashboard/
    page.js              -> /dashboard
    settings/
      page.js            -> /dashboard/settings
```

### **Link Component**
Next.js component for client-side navigation (faster than `<a>` tags).
```javascript
import Link from 'next/link'

<Link href="/about">About Us</Link>
// No full page reload!
```

### **Params**
Dynamic segments in a URL path.
```javascript
// URL: /projects/42
// In app/projects/[id]/page.js
function Page({ params }) {
  console.log(params.id) // "42"
}
```

### **Query Parameters (Search Params)**
Data passed in the URL after `?`.
```javascript
// URL: /search?query=nextjs&sort=date
// searchParams.get('query') -> "nextjs"
// searchParams.get('sort') -> "date"
```

### **Redirect**
Sending users from one route to another.
```javascript
import { redirect } from 'next/navigation'

if (!user) {
  redirect('/login')
}
```

---

## **Database Concepts**

### **Database**
Organized collection of structured data stored electronically. Think of it as an Excel spreadsheet on steroids.
```
Projects Table:
+----+----------+------------------+
| id | title    | description      |
+----+----------+------------------+
| 1  | Website  | A cool website   |
| 2  | App      | Mobile app       |
+----+----------+------------------+
```

### **Relational Database**
Database that stores data in tables with relationships between them. Uses SQL language.
```
Examples: PostgreSQL, MySQL, SQLite
```

### **PostgreSQL (Postgres)**
Powerful, open-source relational database system.
```
Features: ACID compliance, JSON support, array fields
Your project uses this!
```

### **Table**
A collection of related data organized in rows and columns (like a spreadsheet).
```sql
-- Project table
CREATE TABLE "Project" (
  id INT,
  title TEXT,
  description TEXT
)
```

### **Row (Record)**
A single entry in a table. One project = one row.
```
Row: { id: 1, title: "Portfolio", description: "My website" }
```

### **Column (Field)**
A single attribute/property in a table. Every row has this property.
```
Columns in Project table: id, title, description, technologies
```

### **Primary Key**
A unique identifier for each row in a table (usually `id`).
```javascript
// Every project has a unique id
{ id: 1, title: "Project A" }
{ id: 2, title: "Project B" }
// No two projects can have the same id
```

### **Foreign Key**
A column that references the primary key of another table (creates relationships).
```javascript
// Comments table references Projects table
{
  id: 1,
  text: "Great project!",
  projectId: 5 // Links to Project with id=5
}
```

### **Schema**
The structure/blueprint of your database (what tables exist, what columns they have).
```prisma
// Database schema
model Project {
  id          Int
  title       String
  description String
}
```

### **Migration**
A file that describes changes to your database schema (create table, add column, etc.).
```sql
-- Migration file
CREATE TABLE "Project" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL
)
```

### **Seeding**
Adding initial/sample data to your database for testing.
```javascript
// seed.js
await prisma.project.create({
  data: { title: "Sample Project", description: "For testing" }
})
```

### **CRUD Operations**
The four basic operations on data:
- **C**reate - Add new records
- **R**ead - Get/retrieve records
- **U**pdate - Modify existing records
- **D**elete - Remove records

```javascript
// Create
await prisma.project.create({ data: { title: "New" } })

// Read
await prisma.project.findMany()

// Update
await prisma.project.update({ where: { id: 1 }, data: { title: "Updated" } })

// Delete
await prisma.project.delete({ where: { id: 1 } })
```

### **Query**
A request to retrieve or manipulate data from a database.
```javascript
// Query: Get all projects where title contains "App"
const projects = await prisma.project.findMany({
  where: { title: { contains: "App" } }
})
```

### **SQL (Structured Query Language)**
Programming language for managing relational databases.
```sql
-- SQL query
SELECT * FROM "Project" WHERE title = 'Portfolio'
```

### **Connection String (DATABASE_URL)**
A URL that contains all info needed to connect to a database.
```
postgresql://username:password@localhost:5432/database_name
  ↑          ↑         ↑         ↑          ↑     ↑
protocol   user    password    host      port  database
```

---

## **Prisma & ORM**

### **ORM (Object-Relational Mapping)**
A tool that lets you interact with databases using JavaScript objects instead of SQL.
```javascript
// Without ORM (raw SQL)
db.query('SELECT * FROM Project WHERE id = 1')

// With ORM (Prisma)
prisma.project.findUnique({ where: { id: 1 } })
```

### **Prisma**
A modern ORM for Node.js and TypeScript. Makes database access type-safe and easy.
```javascript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
```

### **Prisma Client**
Auto-generated JavaScript library based on your schema that you use to query your database.
```javascript
// Generated based on your schema.prisma
const projects = await prisma.project.findMany()
const user = await prisma.user.create({ data: { name: "John" } })
```

### **Prisma Schema**
The `schema.prisma` file where you define your database structure.
```prisma
model Project {
  id    Int    @id @default(autoincrement())
  title String
}
```

### **Model**
A representation of a database table in Prisma schema.
```prisma
model Project {  // Creates "Project" table
  id          Int      @id
  title       String
  description String
}
```

### **Field**
A column/property in a Prisma model.
```prisma
model Project {
  id          Int     // Field: id, Type: Int
  title       String  // Field: title, Type: String
  isPublic    Boolean // Field: isPublic, Type: Boolean
}
```

### **Field Type**
The data type of a field (String, Int, Boolean, DateTime, etc.).
```prisma
title       String    // Text
age         Int       // Integer number
price       Float     // Decimal number
isActive    Boolean   // true/false
createdAt   DateTime  // Date and time
data        Json      // JSON object
```

### **Optional Field**
A field that can be `null` (marked with `?`).
```prisma
model Project {
  title    String   // Required
  imageUrl String?  // Optional (can be null)
}
```

### **Attribute**
Special markers in Prisma that add metadata to fields (start with `@`).
```prisma
model Project {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### **@id**
Marks a field as the primary key.
```prisma
id Int @id  // This field uniquely identifies each record
```

### **@default**
Sets a default value for a field if none is provided.
```prisma
createdAt DateTime @default(now())  // Auto-set to current time
id        Int      @default(autoincrement())  // Auto-increment
```

### **@updatedAt**
Automatically updates the timestamp whenever the record is modified.
```prisma
updatedAt DateTime @updatedAt  // Auto-updates on every change
```

### **autoincrement()**
Automatically generates sequential numbers (1, 2, 3...) for new records.
```prisma
id Int @id @default(autoincrement())
// First record: id=1, Second: id=2, Third: id=3...
```

### **Relation**
A connection between two models (tables) in your database.
```prisma
model User {
  id       Int       @id
  projects Project[] // One user has many projects
}

model Project {
  id      Int  @id
  userId  Int
  user    User @relation(fields: [userId], references: [id])
}
```

### **findMany()**
Prisma method to retrieve multiple records.
```javascript
const allProjects = await prisma.project.findMany()
const filtered = await prisma.project.findMany({
  where: { title: { contains: "App" } }
})
```

### **findUnique()**
Prisma method to retrieve a single record by unique identifier.
```javascript
const project = await prisma.project.findUnique({
  where: { id: 1 }
})
```

### **create()**
Prisma method to add a new record to the database.
```javascript
const newProject = await prisma.project.create({
  data: {
    title: "My Project",
    description: "A cool project"
  }
})
```

### **update()**
Prisma method to modify an existing record.
```javascript
const updated = await prisma.project.update({
  where: { id: 1 },
  data: { title: "Updated Title" }
})
```

### **delete()**
Prisma method to remove a record from the database.
```javascript
await prisma.project.delete({
  where: { id: 1 }
})
```

### **where**
Filter condition to specify which records to operate on.
```javascript
// Find projects where title is "Portfolio"
await prisma.project.findMany({
  where: { title: "Portfolio" }
})

// Find projects where id is greater than 5
await prisma.project.findMany({
  where: { id: { gt: 5 } }
})
```

### **include**
Include related data from other tables in your query.
```prisma
// Get project with all its comments
const project = await prisma.project.findUnique({
  where: { id: 1 },
  include: { comments: true }
})
```

### **select**
Choose specific fields to retrieve (instead of all fields).
```javascript
// Only get id and title
const projects = await prisma.project.findMany({
  select: { id: true, title: true }
})
```

---

## **API & HTTP**

### **API (Application Programming Interface)**
A way for different software to communicate. In web dev, usually means HTTP endpoints that return data.
```
Your frontend: "Hey API, give me all projects"
API: "Here's the data: [{id:1, title:"..."}, {id:2, title:"..."}]"
```

### **REST API**
An API design pattern using HTTP methods and URLs to perform operations on resources.
```
GET    /api/projects     -> Get all projects
GET    /api/projects/1   -> Get project with id 1
POST   /api/projects     -> Create new project
PUT    /api/projects/1   -> Update project 1
DELETE /api/projects/1   -> Delete project 1
```

### **Endpoint**
A specific URL path on your API that performs an operation.
```javascript
// Endpoint: /api/projects
// Location: app/api/projects/route.js
export async function GET() {
  return Response.json({ message: "Hello" })
}
```

### **HTTP (HyperText Transfer Protocol)**
The protocol browsers use to communicate with web servers.
```
Browser sends HTTP request -> Server processes -> Server sends HTTP response
```

### **HTTP Methods (Verbs)**
Different types of requests indicating what operation to perform:
- **GET** - Retrieve data (read)
- **POST** - Create new data
- **PUT/PATCH** - Update existing data
- **DELETE** - Remove data

```javascript
// In route.js
export async function GET() { /* return data */ }
export async function POST() { /* create data */ }
export async function PUT() { /* update data */ }
export async function DELETE() { /* delete data */ }
```

### **Request**
Data sent from client (browser) to server.
```javascript
// Browser sends request:
fetch('/api/projects', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: "New Project" })
})
```

### **Response**
Data sent from server back to client.
```javascript
// Server sends response:
export async function GET() {
  return Response.json({ 
    success: true, 
    data: projects 
  })
}
```

### **Status Code**
A number indicating the result of an HTTP request:
- **200** - OK (success)
- **201** - Created (successfully created)
- **400** - Bad Request (invalid data)
- **404** - Not Found
- **500** - Internal Server Error

```javascript
return Response.json({ error: "Not found" }, { status: 404 })
```

### **Headers**
Metadata sent with HTTP requests/responses.
```javascript
{
  'Content-Type': 'application/json',  // What type of data
  'Authorization': 'Bearer token123',   // Authentication
  'Accept': 'application/json'          // What type I want back
}
```

### **Body**
The actual data payload sent in a request or response.
```javascript
// Request body
{
  "title": "My Project",
  "description": "A cool project"
}
```

### **JSON (JavaScript Object Notation)**
A text format for transmitting data between client and server.
```json
{
  "id": 1,
  "title": "Portfolio",
  "technologies": ["React", "Next.js"]
}
```

### **Fetch API**
JavaScript function for making HTTP requests.
```javascript
const response = await fetch('/api/projects')
const data = await response.json()
console.log(data)
```

### **async/await**
Modern JavaScript syntax for handling asynchronous operations (like API calls).
```javascript
// async marks function as asynchronous
async function getData() {
  // await pauses until promise resolves
  const response = await fetch('/api/projects')
  const data = await response.json()
  return data
}
```

### **Promise**
An object representing the eventual completion (or failure) of an asynchronous operation.
```javascript
fetch('/api/projects')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))
```

### **CORS (Cross-Origin Resource Sharing)**
Security feature that controls which websites can access your API.
```javascript
// Allow requests from specific domains
headers: {
  'Access-Control-Allow-Origin': 'https://mysite.com'
}
```

---

## **JavaScript/Node.js**

### **Node.js**
JavaScript runtime that lets you run JavaScript on the server (outside the browser).
```bash
node app.js  # Run JavaScript file with Node.js
```

### **npm (Node Package Manager)**
Tool for installing and managing JavaScript libraries/packages.
```bash
npm install prisma        # Install a package
npm run dev              # Run a script
```

### **package.json**
File that lists your project's dependencies and scripts.
```json
{
  "name": "my-project",
  "scripts": {
    "dev": "next dev"
  },
  "dependencies": {
    "next": "14.0.0",
    "prisma": "5.0.0"
  }
}
```

### **Dependencies**
External libraries/packages your project needs to function.
```json
"dependencies": {
  "next": "14.0.0",      // Your project needs Next.js
  "react": "18.0.0",     // Your project needs React
  "@prisma/client": "5.0.0"
}
```

### **Environment Variables**
Configuration values stored outside your code (secrets, API keys, database URLs).
```bash
# .env file
DATABASE_URL="postgresql://localhost:5432/mydb"
API_KEY="secret123"
```

```javascript
// Access in code
const dbUrl = process.env.DATABASE_URL
```

### **.env File**
File containing environment variables (never commit to git!).
```
DATABASE_URL="postgresql://user:pass@localhost:5432/db"
NEXT_PUBLIC_API_URL="https://api.example.com"
```

### **Module**
A reusable piece of code in a separate file.
```javascript
// math.js (module)
export function add(a, b) {
  return a + b
}

// app.js (importing module)
import { add } from './math.js'
console.log(add(2, 3)) // 5
```

### **Import/Export**
Syntax for sharing code between files.
```javascript
// Exporting
export function myFunction() {}
export default MyComponent

// Importing
import { myFunction } from './file'
import MyComponent from './Component'
```

### **Destructuring**
Syntax to extract values from objects/arrays.
```javascript
// Object destructuring
const { title, description } = project
// Same as: const title = project.title

// Array destructuring
const [first, second] = array
// Same as: const first = array[0]
```

### **Spread Operator (...)**
Syntax to expand arrays/objects.
```javascript
// Copy array
const newArray = [...oldArray]

// Merge objects
const merged = { ...obj1, ...obj2 }

// Pass array as arguments
Math.max(...numbers)
```

### **Arrow Function**
Shorter syntax for writing functions.
```javascript
// Traditional function
function add(a, b) { return a + b }

// Arrow function
const add = (a, b) => a + b
```

### **Template Literal**
String syntax that allows embedded expressions (uses backticks).
```javascript
const name = "John"
const greeting = `Hello ${name}!`  // "Hello John!"
const url = `/api/projects/${id}`  // "/api/projects/5"
```

### **Callback**
A function passed as an argument to another function.
```javascript
array.map((item) => {
  return item * 2  // This is a callback function
})
```

### **Try/Catch**
Error handling syntax to catch and handle errors gracefully.
```javascript
try {
  const data = await riskyOperation()
} catch (error) {
  console.error("Something went wrong:", error)
}
```

---

## **Development Tools**

### **Git**
Version control system for tracking changes in code.
```bash
git add .              # Stage changes
git commit -m "msg"    # Save changes with message
git push               # Upload to GitHub
```

### **GitHub**
Website for hosting Git repositories and collaborating on code.
```
Your code lives locally + on GitHub (remote repository)
```

### **VSCode (Visual Studio Code)**
Popular code editor with tons of features and extensions.

### **Terminal/Command Line**
Text-based interface for running commands.
```bash
cd my-folder          # Change directory
ls                    # List files
npm run dev           # Run command
```

### **localhost**
Your own computer acting as a web server (for development).
```
http://localhost:3000  # Your Next.js app running locally
```

### **Port**
A number that identifies a specific service on a computer.
```
localhost:3000  # Port 3000 (Next.js default)
localhost:5432  # Port 5432 (PostgreSQL default)
```

### **Development Server**
A local server that runs your app during development with hot reloading.
```bash
npm run dev  # Starts server at localhost:3000
```

### **Hot Reload (HMR - Hot Module Replacement)**
Automatically updates your browser when you save code changes (no manual refresh needed).

### **Build**
The process of converting your source code into optimized production files.
```bash
npm run build  # Creates optimized production build
```

### **Console**
Browser developer tools for debugging (press F12).
```javascript
console.log("Debug info")
console.error("Error occurred")
```

### **Debugging**
The process of finding and fixing bugs in your code.
```javascript
console.log(variable)  // See what value it has
debugger               // Pause code execution here
```

---

## **Deployment & Production**

### **Production**
The live environment where real users access your app (opposite of development).

### **Build Time**
When you run `npm run build` to create optimized production files.

### **Runtime**
When your app is actually running and serving users.

### **Deployment**
Publishing your app to a hosting service so others can access it.
```
Local code -> Build -> Deploy to Vercel -> Live on the internet!
```

### **Vercel**
Hosting platform made by Next.js creators (easiest way to deploy Next.js apps).
```
Push to GitHub -> Vercel auto-deploys -> Live URL
```

### **Environment**
The context where your code runs (development, staging, production).
```
Development: localhost:3000
Production: yoursite.vercel.app
```

### **CI/CD (Continuous Integration/Continuous Deployment)**
Automated process of testing and deploying code when you push changes.
```
Push to GitHub -> Tests run -> Auto-deploy if tests pass
```

---

## **Key Concepts Integration**

### **Full Request Flow Example**
```
1. User clicks link to /projects/1
2. Next.js Router loads app/projects/[id]/page.js
3. Server Component runs on server
4. Fetches data: prisma.project.findUnique({ where: { id: 1 } })
5. PostgreSQL database returns project data
6. Server renders HTML with the data
7. HTML sent to browser
8. React hydrates the page
9. User sees the project details
```

### **Database to UI Flow**
```
PostgreSQL Database
  ↓ (Prisma Client queries)
Next.js API Route or Server Component
  ↓ (Returns JSON or JSX)
React Component
  ↓ (Renders)
Browser displays to user
```

### **Common File Patterns**
```
schema.prisma          -> Database structure definition
route.js               -> API endpoint
page.js                -> Webpage/route
layout.js              -> Shared wrapper for pages
.env                   -> Environment variables (secrets)
package.json           -> Project dependencies
```

---

## **Quick Reference Commands**

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Run production build

# Prisma
npx prisma generate      # Generate Prisma Client
npx prisma migrate dev   # Create and apply migration
npx prisma db push       # Push schema changes to DB
npx prisma db seed       # Run seed file
npx prisma studio        # Open database GUI

# Git
git status               # See changes
git add .                # Stage all changes
git commit -m "message"  # Commit with message
git push                 # Upload to GitHub
git pull                 # Download latest changes

# Package Management
npm install              # Install all dependencies
npm install package-name # Install specific package
```

---

## **Common Patterns You'll See**

### **Server Component Data Fetching**
```javascript
// app/projects/page.js
export default async function ProjectsPage() {
  const projects = await prisma.project.findMany()
  
  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>{project.title}</div>
      ))}
    </div>
  )
}
```

### **API Route Handler**
```javascript
// app/api/projects/route.js
import { prisma } from '@/lib/prisma'

export async function GET() {
  const projects = await prisma.project.findMany()
  return Response.json(projects)
}

export async function POST(request) {
  const body = await request.json()
  const project = await prisma.project.create({ data: body })
  return Response.json(project, { status: 201 })
}
```

### **Client-Side Form**
```javascript
'use client'
import { useState } from 'react'

export default function ProjectForm() {
  const [title, setTitle] = useState('')
  
  async function handleSubmit(e) {
    e.preventDefault()
    
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })
    
    const data = await response.json()
    console.log('Created:', data)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  )
}
```

---

## **Mental Models**

### **Next.js App Structure**
```
app/                      <- Everything goes here
  layout.js              <- Wraps all pages
  page.js                <- Home page (/)
  about/
    page.js              <- About page (/about)
  api/
    projects/
      route.js           <- API endpoint (/api/projects)
```

### **Server vs Client Components**
```
Server Components (default):
- Run on server
- Can access database directly
- Can't use useState, onClick
- Better performance
- No 'use client' needed

Client Components:
- Run in browser
- Need 'use client' at top
- Can use hooks, event handlers
- Interactive features
- Can't access database directly
```

### **Data Flow**
```
Database (PostgreSQL)
    ↕ (Prisma Client)
Server (Next.js API/Server Components)
    ↕ (HTTP/JSON)
Client (Browser/React Components)
    ↕ (User Interaction)
User Interface
```

---

**Pro Tip**: Bookmark this file! You'll reference it constantly while learning. Each term builds on others, so don't worry if it's overwhelming at first. Focus on understanding the concepts you're currently using, and the rest will click into place over time.
 
## Analogies & Interconnections

This section gives short everyday analogies for the key terms above and then maps how those terms relate to each other across Next.js, React, databases, Prisma, and HTTP. Use these analogies to form mental links — they make remembering and explaining the system much easier.

### How to read these analogies
- Short analogy: a one-line metaphor for the term.
- Why it maps: a sentence explaining the mapping.
- Interconnections: brief pointers to related terms (how they work together).

---

### Next.js Core Concepts (analogies)

- Next.js — "The bakery"
  - Why: Next.js is the place that builds and serves baked goods (pages) using recipes (components and routes) optimized for customers (users).
  - Interconnections: Bakery uses ovens (server-side rendering), storefront layout (layout.js), and delivery (routing/router).

- App Router — "The bakery floor plan"
  - Why: The floor plan tells customers where sections are (home, about, projects) and how to walk between them.
  - Interconnections: Works with dynamic routes (aisles with variable sections) and layouts (shared counters).

- Server Components — "The chef in the back kitchen"
  - Why: Chef prepares dishes (HTML) in the back where only staff (server) access secrets (DB credentials) and sends finished plates to customers.
  - Interconnections: Can access Prisma directly (kitchen uses pantry/database), doesn't handle customer interactions (no useState).

- Client Components — "The waiter"
  - Why: Waiters interact with customers (clicks/forms), take orders, and bring back results (interactivity in browser).
  - Interconnections: Communicates with API endpoints (kitchen) via fetch, uses hooks for state (memory of orders).

- SSR — "Made-to-order counter"
  - Why: Item is prepared when customer orders, served hot right away (HTML per request).
  - Interconnections: Server Components often produce SSR; hydration lets waiter (React) take over.

- SSG — "Pre-baked pastries on the shelf"
  - Why: Baked at opening (build time) and sold immediately — fast, but needs restocking to update.
  - Interconnections: ISR is the restocker that updates shelves periodically.

- ISR — "The rotating restock schedule"
  - Why: Allows shelves to be refreshed at intervals without closing the bakery.
  - Interconnections: SSG pages + periodic revalidation.

- Hydration — "The waiter adds the garnish"
  - Why: Server sends plate (HTML); waiter adds interactive touch (React binds events) in the dining area (browser).

- Layout — "Bakery counter and decor"
  - Why: Shared UI across pages like header/footer — like the consistent design of the shop.

---

### React Fundamentals (analogies)

- Component — "A building block toy (lego piece)"
  - Why: Small, reusable piece you can snap together to build a UI.
  - Interconnections: Components compose into pages, some are server-side (pre-built blocks), others client-side (interactive blocks).

- JSX — "Recipe card written in shorthand"
  - Why: Looks like HTML but is actually instructions the chef (React) understands.

- Props — "Ingredients passed to a recipe"
  - Why: Parent gives child the ingredients (data) it needs; child can't change parent's pantry.

- State — "The current temp of the oven"
  - Why: Dynamic value internal to a component; changes cause different outcomes (re-renders).

- Hook — "Special tools (thermometer, mixer)"
  - Why: Let you do special tasks (useState for mixing, useEffect for timers).

- useEffect — "Cleaning up after baking"
  - Why: Run side tasks (timers, subscriptions) after render and clean up when done.

- useState — "The bowl that holds the batter"
  - Why: Mutable container within component that changes over time.

- useRouter — "A delivery driver's GPS"
  - Why: Lets the app navigate programmatically to other pages.

- Event Handler — "Button the customer presses to ring the bell"
  - Why: Triggers actions in response to user interactions.

- Controlled Component — "A cake order form the waiter fills out"
  - Why: Form values controlled by app state so you always know what's in the order.

---

### Routing & Navigation (analogies)

- Route — "A labelled aisle or door"
  - Why: A path customers follow to reach a section.

- Nested Routes — "Departments inside a store"
  - Why: Hierarchical organization so you can go from bakery -> breads -> sourdough.

- Link Component — "A signpost that points customers without opening doors"
  - Why: Quick client-side navigation without full reloads.

- Params — "A locker number on a ticket"
  - Why: Variable slot pointing to a specific item (e.g., project id).

- Query Params — "Special instructions written on the receipt"
  - Why: Extra data that modifies the request (sort, filter).

- Redirect — "A staff member guiding you to another counter"
  - Why: Moves a customer to the correct page automatically.

---

### Database Concepts (analogies)

- Database — "The pantry / storeroom"
  - Why: Where all ingredients (data) are kept, organized in shelves (tables).

- Relational Database — "A well-organized warehouse with labeled shelves and cross-references"
  - Why: Tables relate to each other via shelves that reference others (foreign keys).

- PostgreSQL — "A high-end commercial pantry"
  - Why: Powerful, supports many formats, can handle lots of orders.

- Table — "A shelf"
  - Why: Holds rows (items) that share the same structure.

- Row / Record — "A can on the shelf"
  - Why: One item with all its attributes (label, expiry date).

- Column / Field — "Label printed on each can"
  - Why: Describes each attribute of items on a shelf.

- Primary Key — "SKU barcode"
  - Why: Unique identifier—scans find the exact item.

- Foreign Key — "Shelf tag that points to another shelf's SKU"
  - Why: Connects items across shelves.

- Schema — "The warehouse blueprint"
  - Why: Map of shelves and their labels.

- Migration — "A construction order to add/remove shelves"
  - Why: Changes the warehouse layout (schema) safely and versioned.

- Seeding — "Stocking the pantry with sample items"
  - Why: Fill with starter items so the shop can demo features.

- CRUD — "Restock, check stock, edit labels, remove expired cans"
  - Why: Core operations you do in the pantry.

- Query — "Asking the pantry manager for items that match a filter"
  - Why: Retrieve specific records using filters.

- SQL — "The formal language staff use in inventory orders"
  - Why: Commands to manipulate the warehouse.

- Connection String — "Delivery instructions (address + gate code) to reach the pantry"
  - Why: Provides host, port, and credentials so your app can connect.

---

### Prisma & ORM (analogies)

- ORM — "A forklift that understands your app's object names and maps them to warehouse boxes"
  - Why: Lets developers talk in objects while the ORM handles SQL and the mapping.

- Prisma — "A smart inventory system tied to your warehouse blueprint"
  - Why: Generates safe, typed helpers to move items around.

- Prisma Client — "The touchscreen terminal staff use to run inventory commands"
  - Why: Auto-generated interface based on `schema.prisma` to query data.

- Prisma Schema — "The inventory configuration file / blueprint"
  - Why: Defines which shelves (tables) exist and what each holds.

- Model — "Shelf type definition"
  - Why: Describes fields (columns) and behavior of a table.

- Field / Field Type — "Label and allowed value types printed on each shelf"
  - Why: Ensures data stored matches expectations.

- Optional Field — "Optional sticker on a product"
  - Why: Present sometimes, absent other times.

- Attribute (@id, @default, @updatedAt) — "Shelf rules (scanning, expiry auto-update)"
  - Why: Metadata that imposes behavior (autoincrement SKUs, auto timestamps).

- Relation — "A conveyor belt linking two shelves"
  - Why: Moves or references items between tables.

- findMany / findUnique / create / update / delete — "Terminal commands: list items, lookup single item, add item, edit label, remove item"
  - Why: Common inventory operations via Prisma Client.

- where / include / select — "Filtering options and display fields on the terminal"
  - Why: Choose which items to fetch and which details to show.

---

### API & HTTP (analogies)

- API — "The intercom system between dining area and kitchen"
  - Why: Frontend asks for actions; backend responds with data or actions.

- REST API — "A menu of standardized requests (order, change order, cancel)"
  - Why: Each HTTP method has an expected purpose.

- Endpoint — "A specific order window"
  - Why: A place to drop a certain type of request.

- HTTP Methods — "Order verbs: get (look), post (place order), put/patch (change order), delete (cancel)"

- Request / Response — "Customer request and kitchen reply"

- Status Code — "Receipt codes telling whether order succeeded (200), created (201), wrong order (400), not found (404), kitchen error (500)"

- Headers — "Notes on the order (gluten-free, allergies)"

- Body / JSON — "Order details (what to prepare)"

- Fetch API / async-await / Promise — "Waiter making a call and waiting for kitchen confirmation"

- CORS — "Which outside delivery services are allowed to leave packages at the door"

---

### JavaScript / Node.js (analogies)

- Node.js — "The delivery truck that runs code around the clock"
  - Why: Runs server-side JavaScript outside the browser.

- npm — "The supplier catalog and ordering system"
  - Why: Install packages you need.

- package.json — "Project manifest / inventory list"
  - Why: Declares dependencies and scripts.

- Environment Variables / .env — "Locked safe with credentials the kitchen needs"
  - Why: Keep secrets out of code.

- Module / Import-Export — "Recipe cards you share between chefs"

- Destructuring / Spread / Arrow functions / Template literals — "Concise shorthand and tools chefs use to prepare orders faster"

---

### Development Tools & Deployment (analogies)

- Git / GitHub — "Versioned recipe book with a remote archive"
  - Why: Track changes and collaborate.

- VSCode / Terminal — "Chef's workstation and stove"

- localhost / Port — "Your test kitchen and bench number"

- Build / Production / Vercel / CI-CD — "Final inspections, packaging, and shipping the baked goods to stores"

---

## Interconnections: how the analogies map together (flows)

Below are condensed interconnected analogies that show how terms work together across the full stack — from user click to database.

1) User request flow (Dining example)
   - Customer (User) sits at table (Browser) and asks the waiter (Client Component) for a menu item.
   - Waiter uses the intercom/API (Fetch) to ask kitchen (Next.js server or API route).
   - Chef (Server Component or API route) checks pantry (Database) through the inventory terminal (Prisma Client).
   - Prisma (Terminal) translates the chef's request into pallet movements (SQL) and returns items.
   - Chef prepares plate (HTML or JSON) and sends it back. Waiter garnishes (Hydration) and serves.

2) Development to production (Deployment example)
   - You code recipes (components) and update the blueprint (schema.prisma).
   - Run migrations (construction orders) to change the warehouse (DB schema).
   - Seed the pantry so the shop has demo stock.
   - Build (packaging) and deploy via Vercel (shipping company) to put the bakery live.

3) Data fetching choices (Shelf strategies)
   - SSG (pre-baked shelf): Fast for common items, but updates slowly.
   - SSR (made-to-order): Fresh every request, uses kitchen time.
   - ISR: Best of both — pre-bake but restock automatically on a schedule.

4) Security & separation (Back vs Front)
   - Server Components (chef's back kitchen) hold secrets (DB credentials) and do heavy lifting.
   - Client Components (front waitstaff) handle interactions, never go into the back.

5) Prisma & Schema (Inventory safety)
   - `schema.prisma` is the official blueprint — if you change it, you submit a migration (construction order) so everyone knows where to find things.
   - Prisma Client is generated from the blueprint — like printing new terminal menus after a remodel.

---

## Quick memory hooks (one-line mnemonics)

- Next.js = Bakery; React Components = staff and tools; Prisma = inventory terminal; PostgreSQL = pantry; API = intercom.
- SSR = made-to-order; SSG = pre-baked shelf; ISR = scheduled restock.
- Props = ingredients; State = oven temperature; Hooks = special tools.

---

If you'd like, I can now:
- Expand this into a printable cheat-sheet PDF.
- Inline these analogies next to each term in `terms.md` (instead of a separate section).
- Generate flashcards from these analogies for quick study.

Tell me which option you prefer and I'll finish the todo list.
