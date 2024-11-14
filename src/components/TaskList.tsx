import { useState } from "react";
import { Check, X, Circle } from "lucide-react";
import { Button } from "./ui/button";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Water the corn field before noon", completed: false },
    { id: 2, text: "Check soil moisture in wheat section", completed: false },
    { id: 3, text: "Review market prices for today's harvest", completed: false },
    { id: 4, text: "Confirm delivery for order #1234", completed: false },
  ]);

  const toggleTask = (id: number) => {
    if (!id) return;
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const removeTask = (id: number) => {
    if (!id) return;
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="space-y-4">
      {tasks?.map((task) => (
        <div key={task?.id} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => task?.id && toggleTask(task.id)}
              className={task?.completed ? "text-green-500" : "text-gray-400"}
            >
              {task?.completed ? <Check /> : <Circle />}
            </Button>
            <span className={task?.completed ? "line-through text-gray-400" : ""}>
              {task?.text}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => task?.id && removeTask(task.id)}
            className="text-red-500 hover:text-red-600"
          >
            <X />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;