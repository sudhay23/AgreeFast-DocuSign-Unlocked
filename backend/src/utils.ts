import fs from 'fs';

export const writeToFile = (name: string, data: string) => {
  const buffer = Buffer.from(data, 'base64');
  const fileName = name.endsWith('.pdf') ? name : `${name}.pdf`;

  fs.writeFile(`./docs/${fileName}`, buffer, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`File: ${fileName} has been saved!`);
    }
  });
};
