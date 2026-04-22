$proc = Start-Process -FilePath "npm" -ArgumentList "run","dev" -WorkingDirectory "C:\Users\TEJA\fitpdf" -PassThru -NoNewWindow
Start-Sleep -Seconds 5

try {
    Set-Location "C:\Users\TEJA\fitpdf"
    node stress-test.js
} finally {
    Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
}