import { build } from 'vite';

async function run() {
  try {
    const result = await build();
    console.log('Build successful!');
  } catch (err) {
    console.error('Build failed with error:');
    console.error(JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
  }
}

run();
