import { fireEvent, render, screen } from '@testing-library/react';

import AuthForm from '@components/ui/AuthForm/AuthForm';

describe('Auth(login, register) 관련 기능을 테스트.', () => {
  test('AuthForm의 이름, 소속 input이 렌더링 되었는가', async () => {
    render(<AuthForm />);

    expect(
      await screen.findByLabelText<HTMLInputElement>(`이름`),
    ).toBeInTheDocument();
    expect(
      await screen.findByLabelText<HTMLInputElement>(`소속`),
    ).toBeInTheDocument();
  });

  test('이름과 소속에 대한 validation과 변경을 잘 수행하는가?', async () => {
    render(<AuthForm />);

    const name = await screen.getByLabelText<HTMLInputElement>(`이름`);
    const group = await screen.getByLabelText<HTMLInputElement>(`소속`);

    fireEvent.change(name, {
      target: { value: `김` },
    });

    expect(name.value).toBe(`김`);
    expect(
      await screen.getByText(
        `이름은 2글자 이상, 특수문자를 포함하지 않아야 해요.`,
      ),
    );

    fireEvent.change(name, {
      target: { value: `김희수` },
    });
    expect(name.value).toBe(`김희수`);

    fireEvent.change(group, {
      target: { value: `홍` },
    });

    expect(group.value).toBe(`홍`);
    expect(
      await screen.getByText(
        `소속은 2글자 이상, 특수문자를 포함하지 않아야 해요.`,
      ),
    );

    fireEvent.change(group, {
      target: { value: `홍천고` },
    });
    expect(group.value).toBe(`홍천고`);
  });

  // test('이름이 valid 해야만 버튼이 활성화 되는가?');
});
