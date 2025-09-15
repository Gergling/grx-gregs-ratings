import { schema } from '../sanity-studio/sanity-typegen.json';
import path from 'path';
import fs from 'fs';

const fullSchemaPath = path.resolve(process.cwd(), 'sanity-studio', schema);
const schemaDirectory = path.dirname(fullSchemaPath);

console.log('+ Checking schema directory exists at', schemaDirectory);

if (!fs.existsSync(schemaDirectory)) {
  console.log('+ No directory found. Creating directory:', schemaDirectory);
  fs.mkdirSync(schemaDirectory, { recursive:true });
}

console.log('+ Done.')
