const fs = require('fs');
const html = fs.readFileSync('e:\\Bloodeconnect\\index.html', 'utf8');
let idx = 0;
const regex = /<script\b[^>]*>([\s\S]*?)<\/script>/g;
let match;
while ((match = regex.exec(html)) !== null) {
  const code = match[1];
  if(code.trim().length > 0) {
    console.log(`Checking script ${idx}...`);
    try {
      // using acorn to just parse or Function if acorn isn't there
      new Function(code);
      console.log(`Script ${idx} passed syntax check.`);
    } catch (e) {
      console.error(`Script ${idx} SYNTAX ERROR: ${e.message}`);
      // Find approximate line
      const lines = code.split('\n');
      const errMatch = e.stack.match(/<anonymous>:(\d+)/);
      if(errMatch) {
          let lineNo = parseInt(errMatch[1]);
          console.log("Error around:");
          for(let i = Math.max(0, lineNo - 5); i <= Math.min(lines.length-1, lineNo + 5); i++) {
              console.log(`${i+1}: ${lines[i]}`);
          }
      }
    }
  }
  idx++;
}
