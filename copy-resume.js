import fs from 'fs';
import path from 'path';

const src = 'C:\\Users\\Desktop\\.gemini\\antigravity-ide\\brain\\9753361d-f451-405a-bef2-322fab181111\\media__1783601629163.pdf';
const dest = path.resolve('public', 'Aman_Daftarband_Resume.pdf');

try {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Successfully copied resume from ${src} to ${dest}`);
  } else {
    console.error(`Error: Source file does not exist at ${src}`);
  }
} catch (err) {
  console.error('Failed to copy file:', err);
}
