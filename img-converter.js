import sharp from 'sharp';
import { globSync } from 'glob';
import cliProgress from 'cli-progress';
// Get all files with extensions jpg and png
const root = 'src/';
const files = globSync(`${root}/assets/img/**/*.{png,jpg,jpeg}`);
console.log(files);
const cliProgressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
// Convert all files to webp
cliProgressBar.start(files.length, 0);
const work = files.map(async (file) => {
  const [fileName] = file.split('.');
  const webpFileName = `${fileName}.webp`;
  // Convert the file to webp
  await sharp(file)
    .webp()
    .toFile(webpFileName);
  // todo resize from 2x
  cliProgressBar.increment();
});
Promise.all(work).then(() => {
  cliProgressBar.stop();
});
