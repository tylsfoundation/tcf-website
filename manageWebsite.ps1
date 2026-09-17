param(
  [string]$Repo = "C:\home\tcf-website",
  [string]$ModernSite = "C:\home\tcf-website\modernsite"
)

function Write-Title {
  param([string]$Text)
  Write-Host ""
  Write-Host $Text -ForegroundColor Yellow
  Write-Host ("=" * $Text.Length) -ForegroundColor DarkYellow
}

function Read-Default {
  param(
    [string]$Prompt,
    [string]$Default
  )

  $Value = Read-Host "$Prompt [$Default]"
  if ([string]::IsNullOrWhiteSpace($Value)) {
    return $Default
  }
  return $Value
}

function New-Slug {
  param([string]$Text)

  $Slug = $Text.ToLowerInvariant()
  $Slug = $Slug -replace "[^a-z0-9]+", "-"
  $Slug = $Slug.Trim("-")

  if ([string]::IsNullOrWhiteSpace($Slug)) {
    return "website-update"
  }

  return $Slug
}

function Show-Menu {
  Write-Title "TCF Website Manager"
  Write-Host "1. Start local preview"
  Write-Host "2. Publish changes to a Vercel preview branch"
  Write-Host "3. Make a preview branch live"
  Write-Host "4. Check website git status"
  Write-Host "5. Exit"
  Write-Host ""
}

function Start-LocalPreview {
  Set-Location $ModernSite
  Write-Title "Starting Local Preview"
  Write-Host "Website URL: http://localhost:8123/index.html" -ForegroundColor Green
  Write-Host "Keep this window open. Press Ctrl+C to stop the server."
  Write-Host ""
  py -m http.server 8123 --bind 127.0.0.1
}

function Show-Status {
  Set-Location $Repo
  Write-Title "Git Status"
  Write-Host "Current branch:" -ForegroundColor Yellow
  git branch --show-current
  Write-Host ""
  git status
}

function Publish-Preview {
  Set-Location $Repo
  Write-Title "Publish Preview"

  $Description = Read-Default "Short name for this update" "website update"
  $CommitMessage = Read-Default "Commit message" "Update website"
  $BranchName = "preview/" + (New-Slug $Description)

  Write-Host ""
  Write-Host "Preview branch will be: $BranchName" -ForegroundColor Green
  $Confirm = Read-Host "Publish modernsite changes to this preview branch? Type yes to continue"
  if ($Confirm -ne "yes") {
    Write-Host "Cancelled."
    return
  }

  $CurrentBranch = git branch --show-current
  if ($CurrentBranch -ne $BranchName) {
    git switch $BranchName 2>$null
    if ($LASTEXITCODE -ne 0) {
      git checkout -b $BranchName
      if ($LASTEXITCODE -ne 0) {
        Write-Host "Could not create preview branch. Please check git status." -ForegroundColor Red
        return
      }
    }
  }

  git add modernsite
  git commit -m $CommitMessage
  if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "Nothing may have been committed. Check status below." -ForegroundColor Yellow
    git status
    return
  }

  git push -u origin $BranchName
  if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Preview branch pushed. Check Vercel Deployments for the preview URL." -ForegroundColor Green
  }
}

function Publish-Live {
  Set-Location $Repo
  Write-Title "Make Preview Live"

  $CurrentBranch = git branch --show-current
  $DefaultBranch = if ($CurrentBranch -like "preview/*") { $CurrentBranch } else { "preview/home-page-footer-updates" }
  $BranchName = Read-Default "Preview branch to make live" $DefaultBranch

  Write-Host ""
  Write-Host "This will merge $BranchName into main and push main to GitHub." -ForegroundColor Yellow
  $Confirm = Read-Host "Type yes to make this live"
  if ($Confirm -ne "yes") {
    Write-Host "Cancelled."
    return
  }

  git checkout main
  if ($LASTEXITCODE -ne 0) { return }

  git pull origin main
  if ($LASTEXITCODE -ne 0) { return }

  git merge $BranchName
  if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "Merge did not complete. Resolve the message above before pushing live." -ForegroundColor Red
    return
  }

  git push origin main
  if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Pushed to main. Vercel should start the production deployment." -ForegroundColor Green
  }
}

Show-Menu
$Choice = Read-Host "Choose an option"

switch ($Choice) {
  "1" { Start-LocalPreview }
  "2" { Publish-Preview }
  "3" { Publish-Live }
  "4" { Show-Status }
  "5" { Write-Host "Goodbye." }
  default { Write-Host "Unknown option. Run .\manageWebsite again." -ForegroundColor Yellow }
}
