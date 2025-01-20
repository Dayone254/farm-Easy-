import { useState, useEffect } from "react";
import { Check, X, Circle } from "lucide-react";
import { Button } from "./ui/button";
import { useFarmStore } from "@/stores/farmStore";
import { useQuery } from "@tanstack/react-query";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  category: "crop" | "soil" | "order" | "market";
}

const TaskList = () => {
  const farmDetails = useFarmStore((state) => state.farmDetails);
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fetch orders using React Query
  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      // Simulating API call for pending orders
      return [
        { id: 1, status: "Pending", items: "Wheat (50kg)" },
        { id: 2, status: "Pending", items: "Rice (100kg)" }
      ];
    }
  });

  // Fetch market prices using React Query
  const { data: marketPrices } = useQuery({
    queryKey: ['marketPrices'],
    queryFn: async () => {
      // Simulating API call for market prices
      return [
        { crop: "Wheat", price: 320, trend: "up" },
        { crop: "Rice", price: 450, trend: "down" }
      ];
    }
  });

  useEffect(() => {
    const generateTasks = () => {
      const newTasks: Task[] = [];

      // Generate tasks from crop data
      farmDetails?.crops.forEach((crop) => {
        const plantDate = new Date(crop.plantingDate);
        const harvestDate = new Date(crop.expectedHarvest);
        const today = new Date();

        if (today > plantDate && today < harvestDate) {
          newTasks.push({
            id: Date.now() + Math.random(),
            text: `Monitor ${crop.name} growth progress - ${crop.area} acres`,
            completed: false,
            category: "crop"
          });
        }

        // Add irrigation task if soil moisture is low
        if (farmDetails.soil.drainage === "poor") {
          newTasks.push({
            id: Date.now() + Math.random(),
            text: `Check irrigation for ${crop.name} field`,
            completed: false,
            category: "soil"
          });
        }
      });

      // Add tasks for pending orders
      orders?.forEach((order) => {
        if (order.status === "Pending") {
          newTasks.push({
            id: Date.now() + Math.random(),
            text: `Prepare order: ${order.items}`,
            completed: false,
            category: "order"
          });
        }
      });

      // Add market-related tasks
      marketPrices?.forEach((price) => {
        if (price.trend === "up") {
          newTasks.push({
            id: Date.now() + Math.random(),
            text: `Consider selling ${price.crop} - Price trending up`,
            completed: false,
            category: "market"
          });
        }
      });

      setTasks(newTasks);
    };

    generateTasks();
  }, [farmDetails, orders, marketPrices]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getCategoryColor = (category: Task["category"]) => {
    switch (category) {
      case "crop":
        return "bg-green-100";
      case "soil":
        return "bg-brown-100";
      case "order":
        return "bg-blue-100";
      case "market":
        return "bg-yellow-100";
      default:
        return "bg-gray-100";
    }
  };

  if (!farmDetails) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-500">Please add farm details to see tasks</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div 
          key={task.id} 
          className={`flex items-center justify-between p-3 rounded-lg shadow-sm ${getCategoryColor(task.category)}`}
        >
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleTask(task.id)}
              className={task.completed ? "text-green-500" : "text-gray-400"}
            >
              {task.completed ? <Check /> : <Circle />}
            </Button>
            <span className={task.completed ? "line-through text-gray-400" : ""}>
              {task.text}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeTask(task.id)}
            className="text-red-500 hover:text-red-600"
          >
            <X />
          </Button>
        </div>
      ))}
      {tasks.length === 0 && (
        <div className="text-center p-4">
          <p className="text-gray-500">No tasks for today</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;