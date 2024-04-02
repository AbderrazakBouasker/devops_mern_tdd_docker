import express from "express"
import { addTask, getTask, removeTask} from "../controllers/taskController.js"
import requireAuth from "../middleware/requireAuth.js";
const router = express.Router();

router.post("/addTask", addTask)
router.get("/getTask", getTask)
router.get("/removeTask", removeTask)

export default router;
