$ErrorActionPreference = "Stop"
$ServerJob = Start-Job -ScriptBlock {
    Set-Location "C:\Users\TEJA\fitpdf"
    npm run dev
} -Name "NextDevServer"

Start-Sleep -Seconds 6

Set-Location "C:\Users\TEJA\fitpdf"
node stress-test.js

Stop-Job -Name "NextDevServer" -ErrorAction SilentlyContinue
Remove-Job -Name "NextDevServer" -Force