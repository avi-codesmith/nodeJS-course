import fs from 'fs';
import http from 'http';

const server = http.createServer();

server.on('request', (req, res) => {
  ////////////////////////////////
  // Solution 1
  fs.readFile('HOW-NODE-WORKS/test-file.txt', 'utf-8', (error, data) => {
    if (error) console.log(error);
    res.end(data);
  });
  // Node have to load entire file in the memory and then only it can send the data

  ////////////////////////////////
  // Solution 2: Streams
  const readable = fs.createReadStream('HOW-NODE-WORKS/test-file.txt');
  // // Creates a readable stream to read the file in chunks (pieces).
  // // Each chunk emits a "data" event.

  readable.on('data', (chunk) => {
    console.log(chunk);
    res.write(chunk);
  }); // Whenever a chunk is read, it is immediately written (sent) to the browser.

  readable.on('end', () => {
    res.end();
  }); // After the entire file has been read, the stream emits the "end" event.
  // res.end() tells the browser that the response is complete.

  readable.on('error', (error) => {
    console.log(error);
    res.statusCode = 500;
    res.end('File not found');
  }); // Streams emmits the "error" event whenever a error occured in reading file.

  ////////////////////////////////
  // Solution 3: Pipe() method
  const readable2 = fs.createReadStream('HOW-NODE-WORKS/test-file.txt');
  readable2.pipe(res);
  // readableSource.pipe(writableDestination)

  // Automatically:
  // 1. Reads data in chunks from the readable stream.
  // 2. Writes each chunk to the writable stream.
  // 3. Handles backpressure** automatically.
  // 4. Ends the writable stream when the readable stream finishes.
});

server.listen(8080, 'localhost', () => {
  console.log('Listening requests on port 8080');
});

/* Problem with solution 1 

            Disk
             │
             ▼
     Read Entire 5 GB File
             │
             ▼
     Store Entire 5 GB in RAM
             │
             ▼
       Send to Client
 
  - Huge memory consumption
  - Takes a lot of time for big files
  - Multiple users mean multiple large copies in memory, increasing RAM usage.

*/

/* Drawback of solution 2

**One problem with streams is that if data is produced faster than
the browser can receive it, data starts accumulating in memory.
This can increase memory usage and may eventually crash the server. 

To solve this problem, Node.js uses backpressure, or efficient pipe() function
which slows down or pauses the readable stream until the writable stream catches up.

*/

// SIDENOTE: res is a writable stream
