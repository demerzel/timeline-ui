# GitHub Pages Troubleshooting Guide

## Getting a 404 Error?

Here are the most common causes and solutions:

### Issue 1: GitHub Pages Not Enabled

**Solution:**

1. Go to: `https://github.com/demerzel/timeline-ui/settings/pages`
2. Under "Build and deployment":
   - **Source**: Select **"GitHub Actions"** (not "Deploy from a branch")
3. The page will automatically save

### Issue 2: Workflow Hasn't Run Yet

**Check Status:**

1. Go to: `https://github.com/demerzel/timeline-ui/actions`
2. Look for the "Deploy to GitHub Pages" workflow
3. Check if it has run and completed successfully (green checkmark)

**Manually Trigger:**

1. Go to Actions tab
2. Click "Deploy to GitHub Pages" on the left
3. Click "Run workflow" button
4. Select branch: `claude/timeline-ui-component-lWva9`
5. Click "Run workflow"

### Issue 3: Workflow Failed

**If the workflow has a red X:**

1. Click on the failed workflow run
2. Check the error message
3. Common issues:
   - **Permissions**: Ensure the workflow has "Read and write permissions" in Settings → Actions → General
   - **Pages not enabled**: Follow Issue 1 solution
   - **Branch protection**: Check that the branch allows workflow runs

### Issue 4: Incorrect URL

The correct URL format should be:
```
https://<username>.github.io/<repository-name>/
```

For this repository:
```
https://demerzel.github.io/timeline-ui/
```

**Note:** Replace `demerzel` with your actual GitHub username if different.

### Issue 5: Deployment is Pending

After enabling Pages or running the workflow:
- Wait 2-5 minutes for the first deployment
- Subsequent deployments are faster (30-60 seconds)
- Check the Actions tab to see the deployment progress

## Quick Verification Checklist

- [ ] Repository Settings → Pages → Source is set to "GitHub Actions"
- [ ] Workflow has run at least once (check Actions tab)
- [ ] Workflow completed successfully (green checkmark)
- [ ] Waited at least 2-3 minutes after workflow completion
- [ ] Using the correct URL format

## Alternative: View Locally

If GitHub Pages isn't working yet, you can view the demo locally:

1. Clone the repository
2. Open `index.html` in your web browser
3. All features work exactly the same locally

## Still Having Issues?

1. Check repository visibility (must be public for free GitHub Pages)
2. Ensure you have admin access to the repository
3. Try disabling and re-enabling GitHub Pages
4. Check GitHub Status page for any outages: https://www.githubstatus.com/

## Get the Deployment URL

After successful deployment, you can find the exact URL:

1. Go to Settings → Pages
2. You'll see: "Your site is live at `https://...`"
3. Or check the Actions tab → Latest workflow run → Deploy step

## Need More Help?

- Check the workflow logs in the Actions tab for detailed error messages
- Verify the `.github/workflows/deploy.yml` file exists
- Make sure the `index.html` file exists in the repository root
