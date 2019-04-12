import { spawn } from 'child_process';

export async function getCommandOutput(command: string, parameters?: string[], options?: any): Promise<string> {
  const dataHolder = [];
  const child = spawn(command, parameters, options);
  child.stdout.on('data', data => dataHolder.push(data));
  child.stderr.on('data', data => dataHolder.push(data));

  return new Promise<string>((resolve, reject) => {
    child.on('close', (code) => {
      if (code === 0) {
        resolve(dataHolder.join('').trim());
      } else {
        reject({ message: dataHolder.join('').trim() });
      }
    });
  });
}

export async function executeCommand(command: string, parameters?: string[], options?: any): Promise<any> {
  const child = spawn(command, parameters, options);
  child.stdout.setEncoding('utf8');
  child.stderr.setEncoding('utf8');
  child.stdout.on('data', data => process.stdout.write(data));
  child.stderr.on('data', data => process.stdout.write(data));
  child.stderr.on('error', error => process.stdout.write(error.toString()));

  return new Promise((resolve, reject) => {
    child.on('close', (code) => {
      if (code === 0) {
        resolve('Success');
      } else {
        reject(`Failure: ${code}`);
      }
    });
  });
}
