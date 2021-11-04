import axios from "axios";
import {
  createSignature,
  generatePublicAndPrivateKey,
  SignatureMessage,
} from "crypto-helper";
import Task from "../models/task";
import { getCurrentDateString, getUserId } from "./util";
// var Mnemonic = require("crypto-helper/node_modules/bitcore-mnemonic");
// var bitcore = require("crypto-helper/node_modules/bitcore-lib");
//sweesen99:123
// physical option stage siren use bronze pipe stable rescue bag aunt fine

// sweesen100:123
// ethics differ achieve tip door can length service negative either ignore tonight
const baseURL = "http://localhost:3000";

export async function fetchTaskList() {
  var result = await fetch(`${baseURL}/task`);
  var jsonResult: Task[] = await result.json();
  return jsonResult;
}

export async function fetchTaskDetail(taskId: number): Promise<Task> {
  var result = await fetch(`${baseURL}/task/${taskId.toString()}`);
  var jsonResult: Task = await result.json();
  return jsonResult;
}

export async function createDraft(taskId: number, mnemonic: string) {
  try {
    const body = {
      userid: getUserId(),
      taskid: taskId,
      mnemonic: mnemonic,
    };
    var result = await axios.post(`${baseURL}/draft`, body);
    return result;
  } catch (error) {
    console.log(error);
    // throw new Error(error);
  }
}

export async function createTask(
  userId: number,
  taskName: string,
  description: string
) {
  try {
    const body = {
      userid: userId,
      taskname: taskName,
      description: description,
    };
    var result = await axios.post(`${baseURL}/task`, body);
    return result;
  } catch (error) {
    throw new Error("Error creating a new task, please try again");
  }
}

export async function createUser(
  name: string,
  password: string
): Promise<string> {
  try {
    var result = await axios.post(`${baseURL}/users`, {
      name: name,
      password: password,
    });
    return result.data as string;
  } catch (error) {
    throw new Error("Error has occured");
  }
}

export async function loginUser(
  name: string,
  password: string
): Promise<number> {
  try {
    var result: any = await axios.post(`${baseURL}/users/login`, {
      name: name,
      password: password,
    });
    return result.data.id as number;
  } catch (error) {
    throw new Error("Error has occured");
  }
}
