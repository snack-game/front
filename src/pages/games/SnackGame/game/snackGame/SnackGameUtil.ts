/** 각 그리드 내부 스낵 타입 */
export type SnackType = number;

/** 스낵게임 board를 표현하는 2차원 배열 타입 */
export type SnackGameGrid = SnackType[][];

/** 그리드 내부 좌표 타입 */
export type SnackGamePosition = { row: number; column: number };

/** 게임 모드 */
export const snackGameModes = ['default', 'inf'] as const;

/** 게임 모드 타입 */
export type SnackGameMode = (typeof snackGameModes)[number];

/** 각 게임 모드에 사용되는 snack 타입 배열 */
const snacks: Record<SnackGameMode, string[]> = {
  /** 기본 모드 */
  default: ['snack', 'golden_snack'],
  /** 무한 모드 */
  inf: ['snack'],
};

/** 스낵게임 기본 설정 */
export const defaultConfig = {
  /** 게임의 row 개수 */
  rows: 8,
  /** 게임의 column 개수 */
  columns: 6,
  /** 그리드의 각 격자 영역의 크기  */
  tileSize: 50,
  /** 게임 플레이 시간 (seconde) */
  duration: 120,
  /** 스낵게임 모드 설정 */
  mode: <SnackGameMode>'default',
};

/** 스낵게임 설정 타입 */
export type SnackGameConfig = typeof defaultConfig;

/** 기본 설정 옵션과 함께 선택적으로 스낵게임을 설정할 수 있는 함수*/
export function snackGameGetConfig(
  customConfig: Partial<SnackGameConfig> = {},
): SnackGameConfig {
  return { ...defaultConfig, ...customConfig };
}

/** 스낵게임에 필요한 스낵들을 모드 기준으로 구별해 반환합니다. */
export function snackGameGetSnack(mode: SnackGameMode): string[] {
  return [...snacks[mode]];
}

/**
 * 주어진 스낵 타입을 바탕으로 2차원 배열 그리드를 생성합니다.
 * 기믹을 가진 요소는 초기 실행 시 생성될 랜덤한 index를 초기화 합니다.
 * @param rows row 개수
 * @param columns columns 개수
 * @param types 채워야 하는 스낵 타입들
 * @returns 스낵 타입들로 채워진 2차원 배열
 */
export function snackGameCreateGrid(rows = 6, columns = 6, types: SnackType[]) {
  const grid: SnackGameGrid = [];
  const gimmickSnackIndex = [];

  /**
   * SnackType이 1보다 길다면 기믹을 가진 스낵이 존재함을 의미합니다.
   * 해당 기믹 스낵이 생성될 위치를 미리 계산합니다.
   * type은 1부터 시작하며 1은 기본 스낵 2부터는 기믹 스낵 입니다.
   */
  if (types.length > 1) {
    for (let i = 2; i <= types.length; i++) {
      // TODO 기믹을 가진 스낵이 중복된 위치를 가지지 못 하도록 해야합니다.
      const randomRow = Math.floor(Math.random() * rows);
      const randomColumn = Math.floor(Math.random() * columns);

      gimmickSnackIndex.push({ row: randomRow, column: randomColumn, type: i });
    }
  }

  for (let r = 0; r < rows; r++) {
    const types = [];

    for (let c = 0; c < columns; c++) {
      let currentType = 1;
      const position: SnackGamePosition = { row: r, column: c };

      for (const gimmick of gimmickSnackIndex) {
        if (
          position.row === gimmick.row &&
          position.column === gimmick.column
        ) {
          currentType = gimmick.type;
        }
      }

      types.push(currentType);
    }

    grid[r] = types;
  }

  return grid as SnackGameGrid;
}

/**
 * 그리드 전체를 순환하는 함수
 * @param grid SnackGame 그리드
 * @param fn 각 그리드 요소에 수행할 콜백
 */
export function snackGameForEach(
  grid: SnackGameGrid,
  fn: (position: SnackGamePosition, type: SnackType) => void,
) {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      fn({ row: r, column: c }, grid[r][c]);
    }
  }
}

/**
 * 그리드에서 주어진 position의 type을 반환합니다.
 * @param grid 살펴볼 그리드
 * @param position position{ row: number, column: number}
 * @returns 주어진 포지션의 type, 불가능한 영역의 경우 undefined
 */
export function snackGameGetSnackType(
  grid: SnackGameGrid,
  position: SnackGamePosition,
) {
  return grid?.[position.row]?.[position.column];
}

/**
 * Set the piece type in the grid, by position
 * @param grid The grid to be changed
 * @param position The position to be changed
 * @param type The new type for given position
 */
export function snackGameSetPieceType(
  grid: SnackGameGrid,
  position: SnackGamePosition,
  type: number,
) {
  grid[position.row][position.column] = type;
}
