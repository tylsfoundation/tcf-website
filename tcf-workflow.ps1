param(
  [ValidateSet("help", "server", "status", "preview", "live")]
  [string]$Action = "help",

  [string]$BranchName = "preview/home-page-footer-updates",
  [string]$CommitMessage = "Update website"
)

$Repo = "C:\home\tcf-website"
$ModernSite = "C:\home\tcf-website\modernsite"

function Show-Help {
  Write-Host ""
  Write-Host "TCF Website Workflow" -ForegroundColor Yellow
  Write-Host ""
  Write-Host "Start local preview:"
  Write-Host "  .\tcf-workflow.ps1 server"
  Write-Host ""
  Write-Host "Check current git status:"
  Write-Host "  .\tcf-workflow.ps1 status"
  Write-Host ""
  Write-Host "Create/update a preview branch:"
  Write-Host "  .\tcf-workflow.ps1 preview -BranchName preview/my-change -CommitMessage ""Describe changes"""
  Write-Host ""
  Write-Host "Deploy preview branch to production main:"
  Write-Host "  .\tcf-workflow.ps1 live -BranchName preview/my-change"
  Write-Host ""
}

switch ($Action) {
  "server" {
    Set-Location $ModernSite
    Write-Host "Starting local site at http://localhost:8123/index.html" -ForegroundColor Yellow
    Write-Host "Press Ctrl+C to stop the server."
    py -m http.server 8123 --bind 127.0.0.1
  }

  "status" {
    Set-Location $Repo
    git branch --show-current
    git status
  }

  "preview" {
    Set-Location $Repo
    $CurrentBranch = git branch --show-current

    if ($CurrentBranch -ne $BranchName) {
      git switch $BranchName 2>$null
      if ($LASTEXITCODE -ne 0) {
        git checkout -b $BranchName
      }
    }

    git add modernsite
    git commit -m $CommitMessage
    git push -u origin $BranchName
  }

  "live" {
    Set-Location $Repo
    git checkout main
    git pull origin main
    git merge $BranchName
    git push origin main
  }

  default {
    Show-Help
  }
}
