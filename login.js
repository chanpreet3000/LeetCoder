import {
  HOMEPAGE_LOGIN_BTN_XPATH,
  LOGIN_BTN_XPATH,
  LOGIN_EMAIL_INPUT_XPATH,
  LOGIN_PASSWORD_INPUT_XPATH,
} from "./constants.js";
import { getElementByXPath, sleep } from "./utils.js";
import chalk from "chalk";

const loginUserHandler = async (page, user) => {
  await page.goto(`https://leetcode.com/`, {
    waitUntil: "networkidle2",
  });
  try {
    const element = await getElementByXPath(page, HOMEPAGE_LOGIN_BTN_XPATH, 3, 0);
    await element[0].click();
    console.log(chalk.green(`Logging in ${user.email}`));

    //
    const emailInput = await getElementByXPath(page, LOGIN_EMAIL_INPUT_XPATH, 5, 0);
    const passwordInput = await getElementByXPath(page, LOGIN_PASSWORD_INPUT_XPATH, 5, 0);

    await emailInput[0].type(user.email);
    await sleep(1);

    await passwordInput[0].type(user.password);
    await sleep(1);

    const signInBtn = await getElementByXPath(page, LOGIN_BTN_XPATH, 3, 0);
    await signInBtn[0].click();

    console.log(chalk.green(`${user.email} is now logged in`));
    await sleep(4);
  } catch (e) {
    console.log(chalk.green(`${user.email} was already logged in`));
  }
};

export const loginUser = async (page, user) => {
  console.log(chalk.red("\n<<<< Starting Leetcode Authenticator >>>>\n"));
  await loginUserHandler(page, user);
  console.log(chalk.red("\n<<<< Exiting Leetcoder Authenticator >>>>\n"));
};
