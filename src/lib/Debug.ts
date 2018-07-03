import * as LibUtil from 'util';
import * as LibFs from 'fs';

const LOG_PATH = './protoc-gen-ts.debug.log';

export function log(info: any): void {
    LibFs.appendFileSync(LOG_PATH, LibUtil.inspect(info, {showHidden: true, depth: null}) + '\n');
}
