import fs from 'fs';
import crypto from 'crypto';

const start = Date.now();

// We can customize our no. of thread working at the same time like:
process.env.UV_THREADPOOL_SIZE = 1;

setTimeout(() => {
  console.log('Timer - 1 finished');
}, 0);

setImmediate(() => console.log('immidiate function'));

fs.readFile('./test-file.txt', () => {
  console.log(' I/O file readed!');

  console.log('---------------------------------');

  // In the event loop - after the execution of top level code this code executes
  setTimeout(() => {
    console.log('Timer - 2 finished');
  }, 0);
  // The setImmediate function execute "2ndly" in I/O operation
  // Because in the eventloop it goes into the "Timer phase"
  // While this ain't case at synchronous global level

  setTimeout(() => {
    console.log('Timer - 3 finished');
  }, 3000);
  // executes at "4rd" position

  setImmediate(() => console.log('immidiate function'));
  // The setImmediate function execute "1st" in I/O operation
  // Because in the eventloop it goes into the "Check phase"
  // While this ain't case at synchronous global level

  setTimeout(() => {
    console.log('Timer - 2.5 finished');
  }, 0);
  // executes at "3rd" position

  process.nextTick(() => console.log('nextTick function'));
  // Have its own queue called NextTick queue (first priority)

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password Encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password Encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password Encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password Encrypted');
  });
  // These four executes almost at the same time
  // Because "Libuv" have four same time working threads

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password Encrypted');
  });
  // But this will execute after those four would get execute!
});

console.log('Top level hello');

/*


# The top level code execute first

  # Then the event loop starts (if needed)
   → Check phase: (execute first)
   → Timer phase: (execute at second)

  # NextTick queue
   → Executes before any other timer and check (first priority)

  # Threads
   → Used for blocking or time-consuming tasks.
   → Prevent blocking the main JavaScript thread (Event Loop).
   → At the same time 4 threads work in "Libuv (a dependency of node.js)" thread pool
   → We can customize our no. of thread working at the same time (given above)

*/
