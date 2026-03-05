$filePath = "src/pages/ServiciosTelecom.tsx"
$content = Get-Content $filePath -Raw

$pattern = 'const operators = \[[\s\S]*?\];'
$replacement = 'const operators = [
    { name: ''Orange'', logo: ''https://upload.wikimedia.org/wikipedia/commons/c/c8/Orange_logo.svg'', color: ''#FF6600'' },
    { name: ''O2'', logo: ''/images/logo-o2-WJ0ZyWZ8.png'', color: ''#003087'' },
    { name: ''Lowi'', logo: ''/images/lowi.png'', color: ''#6B21A8'' },
  ];'

$newContent = $content -replace $pattern, $replacement
$newContent | Set-Content $filePath -NoNewline
Write-Host "SUCCESS: File updated."
