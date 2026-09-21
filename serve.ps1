# JOVI Aura - Servidor HTTP com suporte a Ctrl+C limpo
$port = 8085
$folder = $PSScriptRoot

$listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Any, $port)
try {
    $listener.Start()
    Write-Host "====================================================" -ForegroundColor Cyan
    Write-Host "  JOVI Aura - Servidor Web Ativo na porta $port" -ForegroundColor Green
    Write-Host "  Pressione Ctrl+C para ENCERRAR o servidor." -ForegroundColor Yellow
    Write-Host "====================================================" -ForegroundColor Cyan
} catch {
    Write-Host "Porta $port em uso. Encerrando." -ForegroundColor Red
    exit 1
}

# Graceful cancellation on Ctrl+C
[Console]::TreatControlCAsInput = $false
$script:running = $true

try {
    while ($script:running) {
        if ($listener.Pending()) {
            $client = $listener.AcceptTcpClient()
            $stream = $client.GetStream()
            $buffer = New-Object byte[] 4096
            $bytesRead = $stream.Read($buffer, 0, $buffer.Length)
            
            if ($bytesRead -gt 0) {
                $requestText = [System.Text.Encoding]::UTF8.GetString($buffer, 0, $bytesRead)
                $firstLine = $requestText.Split("`n")[0]
                $parts = $firstLine.Split(" ")
                
                if ($parts.Length -ge 2) {
                    $rawUrl = $parts[1]
                    $localPath = $rawUrl.Split('?')[0].TrimStart('/')
                    if ([string]::IsNullOrEmpty($localPath)) { $localPath = "index.html" }
                    $filePath = Join-Path $folder $localPath

                    if (Test-Path $filePath -PathType Leaf) {
                        $fileBytes = [System.IO.File]::ReadAllBytes($filePath)
                        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                        
                        $contentType = switch ($ext) {
                            ".html" { "text/html; charset=utf-8" }
                            ".css"  { "text/css" }
                            ".js"   { "application/javascript" }
                            ".png"  { "image/png" }
                            ".jpg"  { "image/jpeg" }
                            ".json" { "application/json" }
                            default { "application/octet-stream" }
                        }

                        $header = "HTTP/1.1 200 OK`r`nContent-Type: $contentType`r`nContent-Length: $($fileBytes.Length)`r`nAccess-Control-Allow-Origin: *`r`nConnection: close`r`n`r`n"
                        $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
                        
                        $stream.Write($headerBytes, 0, $headerBytes.Length)
                        $stream.Write($fileBytes, 0, $fileBytes.Length)
                    } else {
                        $notFound = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain`r`nConnection: close`r`n`r`n404 File Not Found"
                        $notFoundBytes = [System.Text.Encoding]::UTF8.GetBytes($notFound)
                        $stream.Write($notFoundBytes, 0, $notFoundBytes.Length)
                    }
                }
            }
            $stream.Flush()
            $client.Close()
        } else {
            Start-Sleep -Milliseconds 100
        }
    }
} finally {
    $listener.Stop()
    Write-Host "`nServidor encerrado com sucesso!" -ForegroundColor Red
}
