$root = $PSScriptRoot
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "Server running at http://localhost:8080/"
Write-Host "Serving files from: $root"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $localPath = [System.Uri]::UnescapeDataString($request.Url.LocalPath)
    if ($localPath -eq "/") { $localPath = "/booking.html" }
    
    $relativePath = $localPath.TrimStart('/').Replace('/', '\')
    $filePath = [System.IO.Path]::Combine($root, $relativePath)
    
    Write-Host "Request: $localPath -> $filePath (Exists: $(Test-Path -LiteralPath $filePath))"

    if (Test-Path -LiteralPath $filePath) {
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        $contentType = switch ($ext) {
            ".html" { "text/html; charset=utf-8" }
            ".css"  { "text/css" }
            ".js"   { "application/javascript" }
            ".png"  { "image/png" }
            ".jpg"  { "image/jpeg" }
            ".jpeg" { "image/jpeg" }
            ".gif"  { "image/gif" }
            ".svg"  { "image/svg+xml" }
            ".ico"  { "image/x-icon" }
            default { "application/octet-stream" }
        }
        $response.ContentType = $contentType
        $buffer = [System.IO.File]::ReadAllBytes($filePath)
        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
    } else {
        $response.StatusCode = 404
        $msg = [System.Text.Encoding]::UTF8.GetBytes("Not Found: $filePath")
        $response.ContentLength64 = $msg.Length
        $response.OutputStream.Write($msg, 0, $msg.Length)
    }
    $response.Close()
}
