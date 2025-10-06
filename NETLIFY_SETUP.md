# Netlify Deployment Guide for DMPro

## Current Status
✅ Configuration files ready
✅ Next.js optimized for Netlify
✅ Git repository up to date

---

## Setup Instructions

### Step 1: Connect to Netlify

1. Go to: **https://app.netlify.com/**
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub account
5. Select your **DMPro** repository

### Step 2: Configure Build Settings

Netlify should auto-detect these settings from `netlify.toml`:

```
Base directory: (leave blank)
Build command: npm run build
Publish directory: .next
```

**Important**: Click **"Show advanced"** and verify:
- ✅ Node version: 18.17.0 (set in netlify.toml)
- ✅ Install command: npm install

### Step 3: Deploy

1. Click **"Deploy site"**
2. Wait 2-3 minutes for the build to complete
3. Your site will be live at: `https://[random-name].netlify.app`

### Step 4: Custom Domain (Optional)

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow the instructions to configure DNS

---

## Verification Checklist

After deployment, verify these features:

### Dashboard Page
- [ ] Dashboard loads correctly
- [ ] Sidebar navigation works
- [ ] All 7 menu items visible (Dashboard, Model Explorer, Reverse Engineering, Complete Compare, Users, Settings, **Diagram**)

### Diagram Page (NEW FEATURES)
- [ ] Click "Diagram" in sidebar
- [ ] **Left toolbar shows:**
  - [ ] Pointer/Select Tool
  - [ ] Add Entity/Table
  - [ ] Identifying Relationship
  - [ ] Non-Identifying Relationship
  - [ ] Add Note/Annotation
  - [ ] Group/Ungroup buttons
  - [ ] **Shapes dropdown** (Rectangle, Circle, Line)
  - [ ] **Undo button**
  - [ ] **Redo button**
- [ ] Bottom toolbar shows zoom controls
- [ ] Canvas is interactive
- [ ] Model tree panel on left
- [ ] Properties panel on right

### Settings Page
- [ ] Settings page loads
- [ ] Theme toggle works
- [ ] All 11 configuration sections visible

---

## Troubleshooting

### Build Fails

**Error**: "Module not found"
```bash
# Solution: Ensure all dependencies are in package.json
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push origin main
```

**Error**: "Next.js build failed"
```bash
# Solution: Test build locally first
npm run build

# If it works locally, clear Netlify cache:
# Go to Netlify Dashboard → Site settings → Build & deploy
# Click "Clear cache and deploy site"
```

### Old Version Deployed

**Issue**: Latest changes not showing

**Solution 1**: Clear browser cache
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Or use Incognito/Private mode

**Solution 2**: Trigger redeploy
```bash
# Make an empty commit to trigger fresh build
git commit --allow-empty -m "Trigger Netlify redeploy"
git push origin main
```

**Solution 3**: Clear Netlify cache
1. Go to **Deploys** tab in Netlify dashboard
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**

### Diagram Page Not Working

**Check these:**
1. Verify `src/components/Diagram.tsx` exists
2. Check browser console for errors (F12)
3. Ensure `lucide-react` is installed
4. Clear browser cache

---

## Force Fresh Deployment

If you're still seeing old content:

### Option 1: Via Netlify Dashboard
```
1. Go to Deploys tab
2. Click "Trigger deploy" dropdown
3. Select "Clear cache and deploy site"
4. Wait 2-3 minutes
```

### Option 2: Via Git
```bash
# Delete local build cache
rm -rf .next

# Commit and push
git commit --allow-empty -m "Force Netlify rebuild"
git push origin main
```

### Option 3: Environment Variable
```
1. Go to Site settings → Build & deploy → Environment
2. Add new variable:
   Key: NETLIFY_CACHE
   Value: false
3. Trigger new deploy
```

---

## Performance Optimization

Your `netlify.toml` is already optimized with:

✅ **Node 18.17.0** - Latest stable version
✅ **Security headers** - XSS, clickjacking protection
✅ **Static asset caching** - 1 year cache for _next/static/*
✅ **Next.js plugin** - Automatic optimization

---

## Deployment URLs

After setup, you'll have:

- **Production URL**: `https://[your-site-name].netlify.app`
- **Deploy previews**: Automatic for pull requests
- **Branch deploys**: Optional for staging

---

## Current Commit

**Latest**: `2fcc778` - Netlify configuration added
**Diagram Updates**: `a7a464e` - Toolbar optimization with Undo/Redo

Make sure Netlify is deploying from the **main** branch and using commit `2fcc778` or later.

---

## Next Steps

1. ✅ Deploy to Netlify (follow steps above)
2. ✅ Verify Diagram page shows new toolbar
3. ✅ Test Undo/Redo buttons
4. ✅ Set up custom domain (optional)
5. ✅ Configure automatic deploys

---

## Support

**Netlify Docs**: https://docs.netlify.com/
**Next.js on Netlify**: https://docs.netlify.com/integrations/frameworks/next-js/

**Project Docs**: See `PROJECT_DOCUMENTATION.md` for full feature list

---

*Last Updated: October 6, 2025*
*Configuration: netlify.toml v1.1*
