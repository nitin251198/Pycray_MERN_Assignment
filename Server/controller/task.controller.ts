import Task from "../db/schema/Task";
import { validateObjectId } from '../utils/validation';
import { Request } from "../custom";
import { Response } from "express";

const getTasks = async (req: Request, res: Response) => {
  try {
    let id = req.user.id;
    const data = await Task.find({user:id});
    res.status(200).send({
      data,
      status: true,
      message: "Tasks get successfully.."
    });
  }
  catch (err:any) {
    console.error(err);
    return res.status(400).send({
      status: false,
      message: err.message
    });
  }
}

const getAllTask = async (req: Request, res: Response) => {
  try {
    const data = await Task.find();
    res.status(200).send({
      data,
      status: true,
      message: "Task found successfully.."
    });
  }
  catch (err:any) {
    console.error(err);
    return res.status(400).send({
      status: false,
      message: err.message
    });
  }
}


const postTask = async (req: Request, res: Response) => {
  try {
    const { description, title, priority, status, dueDate } = req.body;
    if (!title) {
      return res.status(400).send({
        status: false,
        message: "Title of task can't be empty"
      });
    }
    const data = await Task.create({
      user: req.user.id,
      description,
      title,
      priority,
      status,
      dueDate
    });
    res.status(200).send({
      data,
      status: true,
      message: "Task created successfully.."
    });
  }
  catch (err:any) {
    console.error(err);
    return res.status(400).send({
      status: false,
      message: err.message
    });
  }
}

const putTask = async (req: Request, res: Response) => {
  try {
    const { description, title, priority, status, dueDate } = req.body;
    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).send({
        status: false,
        message: "Task id not valid"
      });
    }
    if (!title) {
      return res.status(400).send({
        status: false,
        message: "Title of task not found"
      });
    }


    let data = await Task.findById(req.params.taskId).lean();
    if (!data) {
      return res.status(400).send({
        status: false,
        message: "Task with given id not found"
      });
    }

    if (data.user != req.user.id) {
      return res.status(403).send({
        status: false,
        message: "You can't update a task of another user"
      });
    }

    data = await Task.findByIdAndUpdate(req.params.taskId, { description, title, priority, status, dueDate }, { new: true });
    res.status(200).send({
      data,
      status: true,
      message: "Task updated successfully.."
    });
  }
  catch (err:any) {
    console.error(err);
    return res.status(400).send({
      status: false,
      message: err.message
    });
  }
}



const deleteTask = async (req: Request, res: Response) => {
  try {
    if (!validateObjectId(req.params.taskId)) {
      return res.status(400).send({
        status: false,
        message: "Task id not valid"
      });
    }

    let data = await Task.findById(req.params.taskId).lean();
    if (!data) {
      return res.status(400).send({
        status: false,
        message: "Task with given id not found"
      });
    }

    if (data.user != req.user.id) {
      return res.status(403).send({
        status: false,
        message: "You can't delete task of another user"
      });
    }

    await Task.findByIdAndDelete(req.params.taskId);
    res.status(200).send({
      status: true,
      message: "Task deleted successfully.."
    });
  }
  catch (err:any) {
    console.error(err);
    return res.status(400).send({
      status: false,
      message: err.message
    });
  }
}


export { postTask, deleteTask, getTasks, putTask };