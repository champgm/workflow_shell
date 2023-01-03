import path from 'path';
import fs from 'fs';
import Zip from 'node-7z';

import { Option } from '../../common/interface/Option';
import { SuperCommand } from '../../common/SuperCommand';
import { Argument } from '../../common/interface/Argument';
import { Names } from '../../common/interface/Names';
import { executeCommand } from '../../common/Cli';
import { spawn } from 'child_process';

const argumentss: Argument[] = [];
const options: Option[] = [];

class TileKey {
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  x: number;
  y: number;
}

export class Command extends SuperCommand {
  description: string = 'Does some temp stuff';
  alias: string = 'temp';
  public async execute(vital?: boolean, input?: any) {
    await super.executeWithInput(argumentss, options, input, vital, async () => {

      const tileKeys: TileKey[] = [];

      for (var x = 4; x < 145; x += 8) {
        for (var y = 4; y < 155; y += 8) {
          tileKeys.push(new TileKey(x, y));
        }
      };

      let sortedTileKeys = tileKeys.sort((a, b) => {
        if (a.y > b.y) return 1;
        if (a.y < b.y) return -1;
        if (a.y == b.y) return 0;
      });

      // TileKey(35,20),
      for (const tileKey of sortedTileKeys) {
        console.log(`TileKey(${tileKey.x},${tileKey.y}),`);
      }

    });
  }
}
