import { ClassicModController } from '@game/controller/classicModController';

export class PlayGroundModeController extends ClassicModController {
  constructor({ row, column }: { row: number; column: number }) {
    super({ row, column });
  }
}
