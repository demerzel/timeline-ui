# GitHub Pages Setup Instructions

The Timeline UI component is ready to be hosted on GitHub Pages! Follow these steps to enable it:

## Automatic Deployment (Recommended)

A GitHub Actions workflow has been created that will automatically deploy the demo when you push to the branch.

### Steps to Enable:

1. **Go to your GitHub repository settings**
   - Navigate to: `https://github.com/demerzel/timeline-ui/settings/pages`

2. **Configure GitHub Pages**
   - Under "Build and deployment"
   - **Source**: Select "GitHub Actions"
   - Save the settings

3. **Trigger deployment**
   - The workflow will automatically run on the next push
   - Or manually trigger it from the "Actions" tab

4. **Access your demo**
   - Once deployed, your site will be available at:
   - `https://demerzel.github.io/timeline-ui/`

## Manual Deployment (Alternative)

If you prefer to deploy from a branch instead of GitHub Actions:

1. **Go to repository settings**
   - Navigate to: `https://github.com/demerzel/timeline-ui/settings/pages`

2. **Configure GitHub Pages**
   - **Source**: Deploy from a branch
   - **Branch**: Select `claude/timeline-ui-component-lWva9`
   - **Folder**: Select `/ (root)`
   - Click "Save"

3. **Wait for deployment**
   - GitHub will build and deploy your site
   - This usually takes 1-2 minutes

4. **Access your demo**
   - Your site will be available at: `https://demerzel.github.io/timeline-ui/`

## What's Deployed

The GitHub Pages site includes:

- **index.html** - Enhanced interactive demo with beautiful gradient design
- **src/timeline.js** - The full Timeline component
- **src/timeline.css** - Complete styling
- **demo/index.html** - Original demo page (also accessible)

## Features of the Live Demo

- 150+ sample timeline items spanning 1995-2024
- All three zoom levels (months, years, decades)
- Interactive controls to test all features
- Responsive design that works on all devices
- Dark mode support

## Updating the Demo

Any time you push changes to the branch, the GitHub Actions workflow will automatically rebuild and redeploy the site (if GitHub Actions deployment is enabled).

## Troubleshooting

**Workflow not running?**
- Make sure GitHub Actions are enabled in your repository settings
- Check the Actions tab for any error messages

**404 error when accessing the site?**
- Verify GitHub Pages is enabled in repository settings
- Wait a few minutes for the initial deployment
- Check that the workflow completed successfully

**Custom domain?**
- You can configure a custom domain in the GitHub Pages settings
- Add a CNAME file to the repository root with your domain

## Files Created

- `.github/workflows/deploy.yml` - GitHub Actions deployment workflow
- `index.html` - Main demo page for GitHub Pages
- `GITHUB_PAGES_SETUP.md` - This setup guide
