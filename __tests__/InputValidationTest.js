import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import { ERROR_MESSAGES } from "../src/constants/message.js";

const mockQuestions = (input) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    return Promise.resolve(input);
  });
};

describe("입력값 유효성 검사", () => {
  const CAR_ERROR_CASE = [
    ["car1,carcar2", ERROR_MESSAGES.LIMIT],
    ["car, ", ERROR_MESSAGES.NO_BLANK],
  ];
  test.each(CAR_ERROR_CASE)("자동차 이름에 대한 예외 처리", async (inputs, message) => {
    mockQuestions(inputs);
    const app = new App();
    await expect(app.play()).rejects.toThrow(message);
  });

  const TRIAL_ERROR_CASE = [
    ["hi", ERROR_MESSAGES.NOT_NUMBER],
    [" ", ERROR_MESSAGES.NO_BLANK],
    ["0", ERROR_MESSAGES.NO_UNDER_1],
  ];
  test.each(TRIAL_ERROR_CASE)("시도 횟수에 대한 예외 처리", async (inputs, message) => {
    mockQuestions(inputs);
    const app = new App();
    await expect(app.play()).rejects.toThrow(message);
  });
});
