var FileSaver = {
    "Queue": [],
    "RunnerRunning": false
}


FileSaver._Sleep = function(Delay) {
    return new Promise(Resolve => setTimeout(Resolve, Delay));
}

FileSaver._RequestWriteFile = function(Data, FileName) {
    var TempElement = document.createElement("a");
    var URL = window.URL.createObjectURL(new Blob([Data], { type: "application/octet-stream" }))

    TempElement.setAttribute("href", URL);
    TempElement.setAttribute("download", FileName);

    document.body.appendChild(TempElement);
    TempElement.click();
    document.body.removeChild(TempElement);

    window.URL.revokeObjectURL(URL)
}


FileSaver._StartRunner = function() {
    (async function() {
        while (FileSaver.Queue.length > 0) {
            var File = FileSaver.Queue.pop()
            FileSaver._RequestWriteFile(File[0], File[1])
            await FileSaver._Sleep(100)
        }
    })()
}

FileSaver.AddToQueue = function(FileData, FileName) {
    FileSaver.Queue.push([FileData, FileName])
    FileSaver._StartRunner()
}
