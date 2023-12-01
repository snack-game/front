import { ChangeEvent, useState } from 'react';

import styled from '@emotion/styled';

import { AppleData } from '@game/game.type';
import AppleGame from '@game/view/AppleGame';

const PlayGroundMode = () => {
  const [time, setTime] = useState(120);
  const [row, setRow] = useState(10);
  const [column, setColumn] = useState(12);

  const startLogic = (): AppleData[][] => {
    const apples = [];
    for (let i = 0; i < row; i++) {
      const row = [];
      for (let j = 0; j < column; j++) {
        row.push({ number: Math.floor(Math.random() * 9) + 1 });
      }
      apples.push(row);
    }

    return apples;
  };

  const refreshLogic = (): AppleData[][] => {
    return startLogic();
  };

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTime(parseInt(event.target.value));
  };

  const handleRowChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRow(parseInt(event.target.value));
  };

  const handleColumnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setColumn(parseInt(event.target.value));
  };

  return (
    <>
      <SliderContainer>
        <Slider>
          <label>
            시간: {time}
            <input
              type="range"
              min="10"
              max="1000"
              value={time}
              onChange={handleTimeChange}
            />
          </label>
        </Slider>
        <Slider>
          <label>
            행: {row}
            <input
              type="range"
              min="5"
              max="50"
              value={row}
              onChange={handleRowChange}
            />
          </label>
        </Slider>
        <Slider>
          <label>
            열: {column}
            <input
              type="range"
              min="5"
              max="50"
              value={column}
              onChange={handleColumnChange}
            />
          </label>
        </Slider>
      </SliderContainer>
      <AppleGame
        startLogic={startLogic}
        refreshLogic={refreshLogic}
        gameMode={'classic'}
        row={row}
        time={time}
        column={column}
      />
    </>
  );
};

const SliderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin: auto;
`;

const Slider = styled.div`
  & > label {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    color: ${(props) => props.theme.colors.titleText};
  }
`;

export default PlayGroundMode;
