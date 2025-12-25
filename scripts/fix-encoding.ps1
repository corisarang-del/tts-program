# JSON 파일 인코딩 수정 스크립트
# UTF-8로 파일을 다시 저장하여 인코딩 문제 해결

$files = @(
    "data\intents.json",
    "data\situations.json"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Processing $file..."
        
        # UTF-8 BOM 없이 읽기
        $content = Get-Content $file -Raw -Encoding UTF8
        
        # UTF-8 BOM 없이 저장
        $utf8NoBom = New-Object System.Text.UTF8Encoding $false
        [System.IO.File]::WriteAllText((Resolve-Path $file), $content, $utf8NoBom)
        
        Write-Host "Fixed encoding for $file"
    } else {
        Write-Host "File not found: $file"
    }
}

Write-Host "Encoding fix completed!"

