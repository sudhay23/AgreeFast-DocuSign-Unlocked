import fs from 'fs';

export const writeToFile = (Guid: string, data: string) => {
  const buffer = Buffer.from(data, 'base64');
  const fileName = `${Guid}.pdf`;
  fs.writeFile(`./docs/${fileName}`, buffer, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`File: ${fileName} has been saved!`);
    }
  });
};
