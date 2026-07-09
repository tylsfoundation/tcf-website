# New Laptop Setup Environment

Use these steps to set up a new laptop with the same Codex/local repository workflow for the Tyls Foundation website.

## 1. Install The Basics

Install:

- Git
- Python 3
- A code editor, usually VS Code
- Codex app
- A browser, such as Chrome or Edge
- Optional: GitHub Desktop, if you prefer visual Git tools

## 2. Sign In

Sign in to:

- GitHub account that has access to `tylsfoundation/tcf-website`
- Codex app
- Vercel, if you manage deployments from that laptop

## 3. Clone The Repo

Open PowerShell and choose a folder, for example:

```powershell
mkdir C:\home
cd C:\home
git clone https://github.com/tylsfoundation/tcf-website.git
cd C:\home\tcf-website
```

Then switch to the working branch:

```powershell
git checkout preview/home-page-footer-updates
```

## 4. Start The Local Website

Run:

```powershell
python -m http.server 8000 --directory C:\home\tcf-website\modernsite
```

Then open:

```text
http://localhost:8000/index.html
```

## 5. Open The Repo In Codex

In Codex, open/select:

```text
C:\home\tcf-website
```

Then tell Codex:

```text
This is the Tyls Foundation website repo. The working site is in modernsite. The local server runs with:
python -m http.server 8000 --directory C:\home\tcf-website\modernsite
```

## 6. Verify Git Works

Run:

```powershell
git status
git pull
```

If Git asks who you are:

```powershell
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

## 7. Helpful Reference

Keep these details handy:

```text
Repo:
C:\home\tcf-website

Local site:
http://localhost:8000/index.html

Server command:
python -m http.server 8000 --directory C:\home\tcf-website\modernsite

Branch:
preview/home-page-footer-updates
```

This gives the new laptop the same working setup: local files, local preview, Codex editing, GitHub push/pull, and the Vercel deployment path.
