import axios from "axios";
import Draft from "../models/draft";
import Job from "../models/job";
import Task from "../models/task";
import { getUserId } from "./util";
// var Mnemonic = require("crypto-helper/node_modules/bitcore-mnemonic");
// var bitcore = require("crypto-helper/node_modules/bitcore-lib");
//sweesen100:123
// siren world drive old pepper shoulder best issue abuse faculty canal kangaroo

var url = new URL(window.location.href);
url.port = "3000";
export const baseURL = url.origin;

const mock = false;

export async function fetchTaskList(jobId: number) {
  if (mock) {
    return require("../mocks/tasks.json");
  }
  var result = await fetch(`${baseURL}/task/job/${jobId}`);
  var jsonResult: Task[] = await result.json();
  console.log(jsonResult);
  return jsonResult;
}

export async function fetchJobList() {
  if (mock) {
    return require("../mocks/jobs.json");
  }
  var result = await fetch(`${baseURL}/job`);
  var jsonResult: Job[] = await result.json();
  console.log(jsonResult);
  return jsonResult;
}

export async function fetchDraftList(taskId: number): Promise<Draft[]> {
  if (mock) {
    return require("../mocks/drafts.json");
  }
  var result = await fetch(`${baseURL}/draft/task/${taskId}`);
  var jsonResult: Draft[] = await result.json();
  console.log(jsonResult);
  return jsonResult;
}

export async function fetchTaskDetail(taskId: number): Promise<Task> {
  if (mock) {
    return require("../mocks/tasks.json")[0];
  }
  var result = await fetch(`${baseURL}/task/${taskId.toString()}`);
  var jsonResult: Task = await result.json();
  console.log(jsonResult);
  return jsonResult;
}

export async function fetchJobDetail(jobId: number): Promise<Job> {
  if (mock) {
    return require("../mocks/jobs.json")[0];
  }
  var result = await fetch(`${baseURL}/job/${jobId.toString()}`);
  var jsonResult: Job = await result.json();
  console.log(jsonResult);
  return jsonResult;
}

export async function createDraft(
  taskId: number,
  mnemonic: string,
  filepath: string
) {
  try {
    const body = {
      userid: getUserId(),
      taskid: taskId,
      mnemonic: mnemonic,
      filepath: filepath,
    };
    var result = await axios.post(`${baseURL}/draft`, body);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    // throw new Error(error);
  }
}

export async function createTask(
  price: number,
  taskName: string,
  description: string,
  jobId: number
) {
  try {
    const body = {
      price: price,
      taskname: taskName,
      description: description,
      jobid: jobId,
    };

    var result = await axios.post(`${baseURL}/task`, body);
    console.log(result);
    return result;
  } catch (error) {
    throw new Error("Error creating a new task, please try again");
  }
}

export async function createJob(
  userId: number,
  jobName: string,
  description: string
) {
  try {
    const body = {
      userid: userId,
      jobname: jobName,
      description: description,
    };
    // console.log(body);
    var result = await axios.post(`${baseURL}/job`, body);
    console.log(result);
    return result;
  } catch (error) {
    throw new Error("Error creating a new job, please try again");
  }
}

export async function rejectDraft(draftId: number, mnemonic: string) {
  try {
    const body = {
      mnemonic: mnemonic,
    };
    console.log(body);
    var result = await axios.patch(`${baseURL}/draft/${draftId}`, body);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating draft");
  }
}

export async function approveDraft(
  taskId: number,
  draftId: number,
  mnemonic: string
) {
  try {
    const body = {
      approved_draftid: draftId,
      mnemonic: mnemonic,
    };
    var result = await axios.patch(`${baseURL}/task/approval/${taskId}`, body);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating draft");
  }
}

export async function releaseDraftIP(
  taskId: number,
  draftId: number,
  mnemonic: string
) {
  try {
    const body = {
      approved_draftid: draftId,
      mnemonic: mnemonic,
    };
    console.log("releaseing up");
    var result = await axios.patch(
      `${baseURL}/task/release_ip/${taskId}`,
      body
    );
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Error release ip draft");
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
    console.log(result);
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
    console.log(result);
    return result.data.id as number;
  } catch (error) {
    throw new Error("Error has occured");
  }
}

export async function uploadFile(data: any) {
  var result: any = await axios.post(`${baseURL}/upload`, data, {});
  return result.data;
}
