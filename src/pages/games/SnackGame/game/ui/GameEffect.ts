import gsap from 'gsap';
import { Container } from 'pixi.js';

import { PopExplosion } from './PopExplosion';
import { GameScreen } from '../screen/GameScreen';
import { Snack } from '../snackGame/Snack';
import { SnackGameOnPopData } from '../snackGame/SnackGame';
import { registerCustomEase, earthquake } from '../util/animation';
import { waitFor } from '../util/asyncUtils';
import { sfx } from '../util/audio';
import { pool } from '../util/pool';
import { randomRange } from '../util/random';

/** 조각이 솥으로 날아가는 x 트윈을 위한 커스텀 이즈 곡선 */
const easeJumpToCauldronX = registerCustomEase(
  'M0,0,C0,0,0.063,-0.304,0.374,-0.27,0.748,-0.228,1,1,1,1',
);

/** 조각이 솥으로 날아가는 y 트윈을 위한 커스텀 이즈 곡선 */
const easeJumpToCauldronY = registerCustomEase(
  'M0,0 C0,0 0.326,1.247 0.662,1.29 0.898,1.32 1,1 1,1 ',
);

/** 조각이 솥으로 날아가는 스케일 트윈을 위한 커스텀 이즈 곡선 */
const easeJumpToCauldronScale = registerCustomEase(
  'M0,0,C0,0,0.043,-1.694,0.356,-1.694,1.026,-1.694,1,1,1,1',
);

/**
 * 모든 게임 플레이 특수 효과를 독립된 클래스로 분리하여, 게임 플레이에 영향을 주지 않고 자유롭게 변경할 수 있도록 함.
 * 이 클래스의 특수 효과 목록:
 * - 조각 이동 - 이동이 허용되는지 여부에 따라 짧은 효과음을 재생
 * - 조각 폭발 - 조각이 팝될 때 해당 위치에서 작은 폭발 애니메이션 재생
 * - 조각 팝 - 비특수 조각이 팝될 때 솥으로 날아감
 * - 매치 완료 - 매치가 발생하면 콤보 레벨에 따라 효과음 재생 및 게임 "흔들기"
 * - 그리드 폭발 - 게임 플레이가 종료될 때 모든 조각을 그리드 밖으로 폭발시킴
 */
export class GameEffects extends Container {
  /** 게임 화면 인스턴스 */
  private game: GameScreen;

  constructor(game: GameScreen) {
    super();
    this.game = game;
    this.sortableChildren = true;
    this.onRender = () => this.renderUpdate();
  }

  /** 매 프레임마다 자동 업데이트 */
  public renderUpdate() {
    // 자식들의 z 인덱스를 업데이트하여 스케일에 따라 자동으로 순서를 정리,
    // "3D 깊이" 시뮬레이션을 생성
    for (const child of this.children) {
      child.zIndex = child.scale.x;
    }
  }

  /** 조각이 그리드에서 팝될 때 실행 */
  public async onPop(data: SnackGameOnPopData) {
    const position = this.toLocal(data.snack.getGlobalPosition());
    this.playPopExplosion(position);

    const x = this.game.score.x + randomRange(-20, 20);
    const y = this.game.score.y - 55;

    const snack = pool.get(Snack);
    snack.setup({
      name: data.snack.name,
      snackNum: data.snack.snackNum,
      type: data.snack.type,
      size: this.game.snackGame.board.tileSize,
      interactive: false,
    });
    snack.visible = true;
    snack.position.copyFrom(position);
    this.addChild(snack);
    await this.playFlyToTarget(snack, { x, y });
    this.removeChild(snack);
    pool.giveBack(snack);
  }

  /** 게임 시작 전 스낵이 위치를 찾아가는 애니메이션 */
  public async animationBeforStart(snack: Snack) {
    const position = this.toLocal(snack.getGlobalPosition());

    const copySnack = pool.get(Snack);
    copySnack.setup({
      name: snack.name,
      snackNum: snack.snackNum,
      type: snack.type,
      size: this.game.snackGame.board.tileSize,
      interactive: false,
    });
    copySnack.visible = true;
    copySnack.position.x = this.game.score.x;
    copySnack.position.y = this.game.score.y;
    this.addChild(copySnack);
    await this.playFlyToTarget(copySnack, { x: position.x, y: position.y });
    snack.visible = true;
    this.removeChild(copySnack);
    pool.giveBack(copySnack);
  }

  /** a, b 사이의 거리 계산 */
  public getDistance(ax: number, ay: number, bx = 0, by = 0) {
    const dx = bx - ax;
    const dy = by - ay;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /** 조각을 복사하여 원래 위치에서 목표 지점으로 날아가게 함 */
  public async playFlyToTarget(snack: Snack, to: { x: number; y: number }) {
    const distance = this.getDistance(snack.x, snack.y, to.x, to.y);

    gsap.killTweensOf(snack);
    gsap.killTweensOf(snack.scale);
    const duration = distance * 0.001 + randomRange(0.2, 0.8);

    gsap.to(snack, {
      x: to.x,
      duration: duration,
      ease: easeJumpToCauldronX,
    });

    gsap.to(snack, {
      y: to.y,
      duration: duration,
      ease: easeJumpToCauldronY,
    });

    await gsap.to(snack.scale, {
      x: 0.5,
      y: 0.5,
      duration: duration,
      ease: easeJumpToCauldronScale,
    });
    sfx.play('common/sfx-buble.mp3', { volume: 0.3 });
  }

  /** 주어진 위치에서 짧은 폭발 효과 재생 */
  public async playPopExplosion(position: { x: number; y: number }) {
    const explosion = pool.get(PopExplosion);
    explosion.x = position.x;
    explosion.y = position.y;
    this.addChild(explosion);
    await explosion.play();
    this.removeChild(explosion);
    pool.giveBack(explosion);
  }

  /** 보드에서 조각을 폭발시키는 애니메이션 재생 */
  private async playsnackExplosion(snack: Snack) {
    const position = this.toLocal(snack.getGlobalPosition());
    const x = position.x + snack.x * 2 + randomRange(-100, 100);
    const yUp = position.y + randomRange(-100, -200);
    const yDown = yUp + 600;
    const animatedSnack = pool.get(Snack);
    const duration = randomRange(0.5, 0.8);
    gsap.killTweensOf(animatedSnack);
    gsap.killTweensOf(animatedSnack.scale);
    animatedSnack.setup({
      name: snack.name,
      type: snack.type,
      size: this.game.snackGame.board.tileSize,
      interactive: false,
    });
    animatedSnack.position.copyFrom(position);
    animatedSnack.alpha = 1;
    this.addChild(animatedSnack);
    await waitFor(randomRange(0, 0.3));
    this.playPopExplosion(position);
    const upTime = duration * 0.4;
    const downTime = duration * 0.6;
    gsap.to(animatedSnack, { y: yUp, duration: upTime, ease: 'circ.out' });
    gsap.to(animatedSnack, {
      y: yDown,
      duration: downTime,
      ease: 'circ.in',
      delay: upTime,
    });
    gsap.to(animatedSnack, {
      alpha: 0,
      duration: 0.2,
      ease: 'linear',
      delay: duration - 0.2,
    });
    gsap.to(animatedSnack.scale, { x: 2, y: 2, duration, ease: 'linear' });
    await gsap.to(animatedSnack, { x, duration, ease: 'linear' });
    this.removeChild(animatedSnack);
    pool.giveBack(snack);
  }

  /** 게임 플레이가 종료될 때 보드에서 모든 조각을 폭발시키는 애니메이션 */
  public async playGridExplosion() {
    earthquake(this.game.pivot, 10);
    const animPromises: Promise<void>[] = [];
    this.game.snackGame.board.snacks.forEach((snack) => {
      animPromises.push(this.playsnackExplosion(snack));
    });
    this.game.snackGame.board.snacksContainer.visible = false;
    await Promise.all(animPromises);
  }
}
