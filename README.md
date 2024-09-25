<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Observation Management System</title>
</head>
<body>

<h1>Observation Management System</h1>
<p>A React application integrated with AWS Amplify that allows users to add, update, and manage observations (sightings) of species. The application supports uploading media files, collecting metadata, and interacting with AWS services for data storage and retrieval.</p>

<h2>Table of Contents</h2>
<ul>
    <li><a href="#features">Features</a></li>
    <li><a href="#prerequisites">Prerequisites</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#aws-amplify-configuration">AWS Amplify Configuration</a></li>
    <li><a href="#running-the-application">Running the Application</a></li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#technologies-used">Technologies Used</a></li>
    <li><a href="#usage">Usage</a></li>
</ul>

<h2 id="features">Features</h2>
<ul>
    <li><strong>Multi-Step Forms</strong>: Guided forms for adding and updating observations with validation at each step.</li>
    <li><strong>Media Upload</strong>: Support for uploading images and videos associated with observations.</li>
    <li><strong>Metadata Collection</strong>: Collect detailed metadata for each media file, including life stage, activity, characters, and behavior.</li>
    <li><strong>AWS Integration</strong>: Seamless integration with AWS Amplify services for authentication, API, and storage.</li>
    <li><strong>Dynamic Rendering</strong>: Components render dynamically based on user interactions and data provided.</li>
    <li><strong>Responsive UI</strong>: User-friendly interface built with React Bootstrap and PrimeReact.</li>
</ul>

<h2 id="prerequisites">Prerequisites</h2>
<p>Before you begin, ensure you have met the following requirements:</p>
<ul>
    <li><strong>Node.js</strong>: Install Node.js (version 12 or later).</li>
    <li><strong>npm</strong>: Node.js installation should include npm.</li>
    <li><strong>AWS Account</strong>: An AWS account with permissions to use AWS Amplify services.</li>
    <li><strong>AWS CLI</strong>: Install and configure the AWS CLI.</li>
    <li><strong>AWS Amplify CLI</strong>: Install the Amplify CLI globally:</li>
</ul>
<pre><code>npm install -g @aws-amplify/cli</code></pre>
<ul>
    <li><strong>Git</strong>: Install Git.</li>
</ul>

<h2 id="installation">Installation</h2>
<h3>Clone the Repository</h3>
<pre><code>git clone https://github.com/TaliTversky/Sighting_Web_App.git
cd Sighting_Web_App</code></pre>
<h3>Install Dependencies</h3>
<pre><code>npm install</code></pre>

<h2 id="aws-amplify-configuration">AWS Amplify Configuration</h2>
<h3>Initialize Amplify</h3>
<pre><code>amplify init</code></pre>
<p>Enter the following when prompted:</p>
<pre><code>Enter a name for the project: observationManagementSystem
Enter a name for the environment: dev
Choose your default editor: [Select your preferred editor]
Choose the type of app that you're building: javascript
What javascript framework are you using: react
Source Directory Path: src
Distribution Directory Path: build
Build Command: npm run build
Start Command: npm start
Do you want to use an AWS profile?: Yes
Please choose the profile you want to use: [Select your AWS profile]</code></pre>

<h3>Add Authentication</h3>
<pre><code>amplify add auth</code></pre>
<p>Respond to the prompts:</p>
<pre><code>Do you want to use the default authentication and security configuration?: Default configuration
How do you want users to be able to sign in?: Username
Do you want to configure advanced settings?: No, I am done</code></pre>

<h3>Add API</h3>
<pre><code>amplify add api</code></pre>
<p>Respond to the prompts:</p>
<pre><code>Please select from one of the below mentioned services: GraphQL
Provide API name: observationAPI
Choose the default authorization type: API key
Enter a description for the API key: default
After how many days from now the API key should expire: 7
Do you want to configure advanced settings for the GraphQL API: No, I am done
Do you have an annotated GraphQL schema?: No
Do you want a guided schema creation?: Yes
What best describes your project: Single object with fields (e.g., "Todo" with ID, name, description)</code></pre>

<h3>Add Storage</h3>
<pre><code>amplify add storage</code></pre>
<p>Respond to the prompts:</p>
<pre><code>Please select from one of the below mentioned services: Content (Images, audio, video, etc.)
Provide a friendly name for your resource: mediaStorage
Provide bucket name: [Press Enter to accept the default]
Who should have access: Auth and guest users
What kind of access do you want for Authenticated users: create/update, read, delete
What kind of access do you want for Guest users: read
Do you want to add a Lambda Trigger for your S3 Bucket?: No</code></pre>

<h3>Push Amplify Configuration</h3>
<pre><code>amplify push</code></pre>
<p>Confirm when prompted.</p>

<h2 id="running-the-application">Running the Application</h2>
<p>Start the development server:</p>
<pre><code>npm start</code></pre>
<p>Open your browser and navigate to <a href="http://localhost:3000">http://localhost:3000</a> to view the application.</p>

<h2 id="project-structure">Project Structure</h2>
<pre><code>
├── src
│   ├── components
│   ├── graphql
│   ├── images
│   ├── pages
│   ├── ui-components
│   ├── amplifyconfiguration.json
│   ├── App.css
│   ├── App.js
│   ├── aws-exports.js
│   ├── index.css
│   ├── index.js
├── amplify
├── build
├── node_modules
├── public
├── .eslintrc.json
├── .gitignore
├── .graphqlconfig.yml
├── package-lock.json
├── package.json
└── README.md

</code></pre>

<h2 id="technologies-used">Technologies Used</h2>
<ul>
    <li><strong>React</strong>: Front-end library for building user interfaces.</li>
    <li><strong>AWS Amplify</strong>: Provides authentication, API, and storage services.</li>
    <li><strong>GraphQL</strong>: API query language used with AWS AppSync.</li>
    <li><strong>AWS AppSync</strong>: Managed GraphQL service.</li>
    <li><strong>AWS S3</strong>: Storage service for media files.</li>
    <li><strong>React Bootstrap</strong>: UI components for responsive design.</li>
    <li><strong>PrimeReact</strong>: UI components library.</li>
    <li><strong>UUID</strong>: Library for generating unique identifiers.</li>
    <li><strong>React Hooks</strong>: Custom hooks for state and validation management.</li>
</ul>

<h2 id="usage">Usage</h2>
<h3>Adding a New Observation</h3>
<ol>
    <li>Click on the "+ New Observation" button.</li>
    <li><strong>Step 1</strong>: Enter basic observation details such as date, time, site, and species.</li>
    <li><strong>Step 2</strong>: Provide additional attributes like count, stage, sex, and physical measurements.</li>
    <li><strong>Step 3</strong>: Enter reporter information and upload media files.</li>
    <li><strong>Media Metadata</strong>: For each uploaded media file, provide metadata.</li>
    <li>Submit the observation.</li>
</ol>

<h3>Updating an Observation</h3>
<ol>
    <li>Navigate to the observation you wish to update.</li>
    <li>Click on the "Update" button.</li>
    <li>The <code>UpdateObservationForm</code> modal will appear.</li>
    <li>Edit the necessary fields across the form steps.</li>
    <li>Add or remove media files and update their metadata.</li>
    <li>Submit the updates.</li>
</ol>

</body>
</html>
