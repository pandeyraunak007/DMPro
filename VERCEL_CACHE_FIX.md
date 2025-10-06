# Vercel Cache Issue - Complete Fix Guide

## Problem
Vercel is serving cached/old version of the Diagram page despite latest code being pushed to GitHub.

## Verified Working
✅ **Netlify**: Toolbar changes (Shapes dropdown, Undo/Redo) are visible
✅ **Local**: Changes work correctly on localhost:3000
✅ **Git**: Latest code is in commit a7a464e

## Solutions (Try in Order)

---

## Solution 1: Redeploy with Cache Clear (Easiest)

### Via Vercel Dashboard:
1. Go to: https://vercel.com/dashboard
2. Select your **dm-pro** project
3. Click on **"Deployments"** tab
4. Find the latest deployment
5. Click the **3-dot menu** (⋯) on the right
6. Select **"Redeploy"**
7. **IMPORTANT**: **UNCHECK** "Use existing Build Cache"
8. Click **"Redeploy"**
9. Wait 2-3 minutes

---

## Solution 2: Delete Vercel Cache via CLI

### Install Vercel CLI:
```bash
npm install -g vercel
```

### Login and Redeploy:
```bash
# Login to Vercel
vercel login

# Link to your project
vercel link

# Deploy with no cache
vercel --prod --force
```

---

## Solution 3: Environment Variable to Disable Cache

### Add Environment Variable:
1. Go to Vercel Dashboard → Your Project
2. Click **Settings** → **Environment Variables**
3. Add new variable:
   - **Name**: `VERCEL_FORCE_NO_BUILD_CACHE`
   - **Value**: `1`
4. Save and trigger new deployment

---

## Solution 4: Modify vercel.json to Force Rebuild

Create or update vercel.json to disable caching:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install",
  "regions": ["iad1"],
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

Then commit and push:
```bash
git add vercel.json
git commit -m "Add Vercel config to disable aggressive caching"
git push origin main
```

---

## Solution 5: Change Project Settings

### Framework Detection:
1. Go to Vercel Dashboard → Project Settings
2. Click **General** tab
3. Scroll to **Framework Preset**
4. Change to: **Other** (then back to **Next.js**)
5. Save and trigger new deployment

### Root Directory:
1. Check **Root Directory** setting
2. Should be: `.` (blank or single dot)
3. NOT: `data-modeling-dashboard`

---

## Solution 6: Disconnect and Reconnect

### Last Resort (Most Effective):
1. Go to Vercel Dashboard → Project Settings
2. Scroll to **Dangerous** section
3. Click **"Disconnect Git Repository"**
4. Confirm disconnection
5. Go back to Vercel Dashboard
6. Click **"Add New Project"**
7. Select your **DMPro** repository again
8. Let Vercel auto-detect settings
9. Click **"Deploy"**

**Note**: This creates a fresh deployment with no cache

---

## Solution 7: Purge CDN Cache

### Via Vercel Dashboard:
1. Go to your deployment
2. Open deployment details
3. Look for **"Purge Cache"** or **"Invalidate Cache"** button
4. Click to purge CDN cache

### Via API:
```bash
# Get your project ID and token from Vercel dashboard
curl -X POST \
  "https://api.vercel.com/v1/deployments/[DEPLOYMENT_ID]/purge" \
  -H "Authorization: Bearer [YOUR_TOKEN]"
```

---

## Solution 8: Delete .next and Redeploy

### Via Git:
```bash
# Ensure .next is in .gitignore (it should be)
echo ".next/" >> .gitignore

# Commit .gitignore if changed
git add .gitignore
git commit -m "Ensure .next is ignored"
git push origin main

# Trigger empty commit to redeploy
git commit --allow-empty -m "Force Vercel rebuild - clear .next cache"
git push origin main
```

---

## Prevention: Update Vercel Configuration

### Create vercel.json (if doesn't exist):
```json
{
  "buildCommand": "rm -rf .next && npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm ci",
  "framework": "nextjs"
}
```

This ensures:
- `.next` is deleted before each build
- Clean install with `npm ci`
- No cache persistence

---

## Verification Steps

After applying any solution:

1. **Wait 3-5 minutes** for Vercel to rebuild
2. **Clear browser cache**: `Ctrl+Shift+R` or Incognito mode
3. Visit: `https://dm-pro.vercel.app`
4. Navigate to **Diagram** page
5. **Check left toolbar** for:
   - Shapes dropdown (instead of individual Rectangle, Circle, Line)
   - Undo button (below shapes)
   - Redo button (below undo)

---

## Expected vs Actual

### ❌ Old Version (Cached):
```
Left Toolbar:
- Pointer
- Entity
- Identifying Rel
- Non-Identifying Rel
- Note
- Group
- Ungroup
- Rectangle    ← Individual buttons
- Circle       ← Individual buttons
- Line         ← Individual buttons
```

### ✅ New Version (Correct):
```
Left Toolbar:
- Pointer
- Entity
- Identifying Rel
- Non-Identifying Rel
- Note
- Group
- Ungroup
- Shapes ▼     ← Dropdown (NEW)
- Undo         ← Button (NEW)
- Redo         ← Button (NEW)
```

---

## Still Not Working?

### Check Deployment Logs:
1. Go to Vercel Dashboard → Deployments
2. Click on latest deployment
3. Click **"View Function Logs"**
4. Look for build errors or warnings

### Check Commit Hash:
1. View page source on Vercel
2. Look for Next.js build ID
3. Compare with local build

### Contact Vercel Support:
If all else fails:
- Vercel Support: https://vercel.com/support
- Community: https://github.com/vercel/next.js/discussions

---

## Recommended Solution

**For immediate fix**: Use **Solution 1** (Redeploy with cache clear)

**For permanent fix**: Use **Solution 4** (Add vercel.json with cache control)

---

## Current Status

- **Local**: ✅ Working (commit: a7a464e)
- **Netlify**: ✅ Working (deploy shows new features)
- **Vercel**: ⚠️ Caching old version
- **GitHub**: ✅ Latest code pushed (commit: 8776ff9)

---

*Last Updated: October 6, 2025*
*Issue: Vercel CDN/Build Cache*
*Status: Awaiting cache clear*
