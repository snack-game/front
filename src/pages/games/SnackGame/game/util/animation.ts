import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';

import { randomRange } from './random';

gsap.registerPlugin(CustomEase);

/** 커스텀 이즈의 고유 식별자 */
let customEaseUID = 1;

/**
 * 커스텀 이즈 곡선을 등록하는 함수. 이렇게 감싸는 이유는 다른 파일에서의 오버라이드를 방지하기 위함입니다.
 * @param curve 커브를 나타내는 문자열
 * @param name 트윈의 이름 (선택적), 지정하지 않으면 고유 ID가 생성됩니다
 * @returns 트윈에서 사용할 이즈 함수
 */
export function registerCustomEase(curve: string, name?: string) {
  if (!name) name = 'customEase' + customEaseUID++;
  if (CustomEase.get(name))
    throw new Error('Custom ease already registered: ' + name);
  return CustomEase.create(name, curve);
}

/**
 * 트윈의 프로미스가 깨지지 않도록 안전하게 트윈을 종료합니다. gsap에서 트윈을 종료하면
 * 해당 프로미스가 영원히 대기 상태로 남아 있어 해결되지도, 거부되지도 않는 것 같습니다.
 * @param targets 관련 트윈이 종료될 대상
 */
export async function resolveAndKillTweens(targets: gsap.TweenTarget) {
  const tweens = gsap.getTweensOf(targets);
  for (const tween of tweens) {
    // 존재하는 경우 트윈 프로미스를 강제로 해결
    if ((tween as any)['_prom']) (tween as any)['_prom']();
  }
  gsap.killTweensOf(targets);
}

/**
 * 대상의 모든 트윈을 일시 중지
 * @param targets 일시 중지될 트윈이 있는 대상
 */
export function pauseTweens(targets: gsap.TweenTarget) {
  const tweens = gsap.getTweensOf(targets);
  for (const tween of tweens) tween.pause();
}

/**
 * 대상의 모든 트윈을 재개
 * @param targets 재개될 트윈이 있는 대상
 */
export function resumeTweens(targets: gsap.TweenTarget) {
  const tweens = gsap.getTweensOf(targets);
  for (const tween of tweens) tween.resume();
}

/**
 * 재사용 가능한 흔들림 애니메이션, 일반적으로 충격파/지진 효과에 사용
 * @param target 흔들릴 객체의 x와 y
 * @param power 흔들림의 강도/범위
 * @param duration 흔들림이 지속되는 시간
 */
export async function earthquake(
  target: { x: number; y: number },
  power = 8,
  duration = 0.5,
) {
  const shake = { power };
  await gsap.to(shake, {
    power: 0,
    duration,
    ease: 'linear',
    onUpdate: () => {
      if (!target) return;
      target.x = randomRange(-shake.power, shake.power);
      target.y = randomRange(-shake.power, shake.power);
    },
  });
}
