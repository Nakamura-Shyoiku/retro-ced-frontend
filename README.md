# Retroced Website
Retroced, an e-commerce website built on React and Go.
The website consists of several pages including home, products, trending etc.
Products found on the bags, shoes, clothing and accessories pages are loaded from MySQL through Go endpoints with the page's UI state managed by Redux. 
The website also contains basic and Facebook authentication to handle user logins as well as an Admin page. 

The Contact Us page has a form which needs to be connected to a endpoint.
This endpoint is provided using serverless AWS lambda, you will need a AWS account to deploy this, or you need to change the serverless.yml configuration file accordingly.

# General info
This project is build using create react app.

See: https://github.com/facebook/create-react-app for all avalible comands.

For full docs on
ReactJS see: https://reactjs.org/, and
ReduxJS see: https://redux.js.org/.

# Quickstart
Run locally
```bash
yarn install
yarn start
```

Create a production build.
```bash
yarn run build
```
This will create a folder called build.
This folder is static and can be deplyed to any object store such as S3 for
cheap and reliable hosting.
See https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html for more info about static websites.

Before commiting the code, run the following command:
```bash
yarn run lint
yarn run test
```
This will run the automated tests (if any) and eslint that makes sure that the code is following best practises.

# Styling
In `src/scenes/App/custom.css` is where all the custom css is located at, any style changes to nav etc will be found here.
The main css files is provided by bootstrap v4 see: http://getbootstrap.com/ for more info about avalible classes.

# Layout
The application is laid out according to the following logic.
* `src/Application`: This is the first component to be mounted, this is where you would setup things like
Redux, configure GA, etc.
* `src/components`: This is "global" components, this is where components used across multiple scenes recide.
* `src/scenes`: Aka "pages" this is where the compnes for the induvidual pages recide, such as Home, About etc.
* `src/utils`: This is for small pure JS helper functions, text formatting etc.
* `src/config.js`: Website configurations, such as DynamicDelta project ID etc.
* `src/index.js`: Main ReactJS entrypoint, calls `src/Application`.
* `src/polyfills.js`: To make sure ES6/7 functions works on older browsers.
* `src/registerServiceWorker.js`: Will cache the website on the users device for faster loading times.
* `src/routes.jsx`: Contans all the routes to the `src/scenes`.

# Serverless
Serverless is used for the contact us form, we recoment using AWS to host this single function.
This code is located at `/backend` folder.
You can read more about serverless framework here: https://serverless.com/framework/docs/
And you can read about AWS Lambda here: https://aws.amazon.com/lambda/
The main reason to use severless with AWS Lambda is that you pay per call (1,000,000 calls per month is free with AWS),
This is way cheaper and easier to manage then a full server just to enable a simple function such as a contact us form.
You can configure the required mailgun account (https://www.mailgun.com/) in `backend/config.json` before deploying your function.

## How to deploy serverless function
First you need to setup you AWS credentials.
Follow this guide: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html
After your credentials is confugured can run the following comands to deploy your serverless
function to the default AWS account you just configured.
```bash
// assuming project root path.
cd backend/
sls deploy
```
This will then upload your function and have a similar output to this.
```
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (11.62 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
..........................
Serverless: Stack update finished...
Service Information
service: contact
stage: dev
region: ap-southeast-1
stack: test-dev
api keys:
  None
endpoints:
  GET - https://oewunewunefwnu.execute-api.ap-southeast-1.amazonaws.com/dev/contact_us
functions:
  name: contact_us
Serverless Domain Manager Summary
Domain Name
  api.domain.com
Distribution Domain Name
  oewunewunefwnu.cloudfront.net
Serverless: Removing old service versions...
```
Now you want to configure ReactJS to use the API you just deployed.
Copy the endpoint from the deployment ex: `https://oewunewunefwnu.execute-api.ap-southeast-1.amazonaws.com/dev/contact_us`.
And pase the base path (the domain before the slashes) in the `src/config.js` file.
```
export const API_CONTACTUS = 'https://oewunewunefwnu.execute-api.ap-southeast-1.amazonaws.com/dev/contact_us';
// eslint-disable-next-line no-undef
export const DYNAMICDELTA_BASE = 'https://api.dynamicdelta.com';
export const DYNAMICDELTA_APP_ID = '132';
export const STATIC = 'https://static.dynamicdelta.com';
```

Now you should be ready to go.

# Pages
## Trending
Content in this section is loaded directly from DynamicDelta's Blog Posts once the post is published.

For separation of header images that appear in `/trending` from the detailed story, the chosen header image should be placed as the very first item in DD, followed by other content.
When done correctly, this image will appear in `/trending` and will not appear in the detailed story. Other images and content placed after the first image will not be affected. Be mindful that a line break placed before the image in DD will make it appear in the detailed story.