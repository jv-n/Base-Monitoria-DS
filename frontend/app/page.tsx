"use client";

import { useState, useEffect } from "react";
import axios from "axios";

type Task = {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  userId: string;
};

type User = {
  id: string;
  name: string;
  email: string;
};

const API_BASE = "http://localhost:3001"

function TaskCard({ task, showUser = false, users }: { task: Task; showUser?: boolean; users: User[] }) {
  const user = users.find((u) => u.id === task.userId);
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-zinc-900">{task.title}</h3>
        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${task.completed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
          {task.completed ? "Done" : "Pending"}
        </span>
      </div>
      <p className="mt-1 text-sm text-zinc-500">{task.description}</p>
      {showUser && user && (
        <p className="mt-2 text-xs text-zinc-400">Assigned to: {user.name}</p>
      )}
    </div>
  );
}

function AllTasksView({ tasks, users }: { tasks: Task[]; users: User[] }) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} showUser users={users} />
      ))}
    </div>
  );
}

function ByUserView({ users, tasks }: { users: User[]; tasks: Task[] }) {
  const [selectedUserId, setSelectedUserId] = useState<string>(users[0]?.id);
  const userTasks = tasks.filter((t) => t.userId === selectedUserId);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => setSelectedUserId(user.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              selectedUserId === user.id
                ? "bg-zinc-900 text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
            }`}
          >
            {user.name}
          </button>
        ))}
      </div>
      {userTasks.length === 0 ? (
        <p className="text-sm text-zinc-400">No tasks for this user.</p>
      ) : (
        <div className="space-y-3">
          {userTasks.map((task) => (
            <TaskCard key={task.id} task={task} users={users} />
          ))}
        </div>
      )}
    </div>
  );
}

function AllUsersView({ users, tasks }: { users: User[]; tasks: Task[] }) {
  return (
    <div className="space-y-6">
      {users.map((user) => {
        const userTasks = tasks.filter((t) => t.userId === user.id);
        const counts = {
          done: userTasks.filter((t) => t.completed).length,
          pending: userTasks.filter((t) => !t.completed).length,
        };
        return (
          <div key={user.id} className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="mb-3">
              <h3 className="font-semibold text-zinc-900">{user.name}</h3>
              <p className="text-xs text-zinc-400">{user.email}</p>
            </div>
            <div className="mb-4 flex gap-3">
              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                {counts.done} done
              </span>
              <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                {counts.pending} pending
              </span>
            </div>
            <div className="space-y-2">
              {userTasks.map((task) => (
                <TaskCard key={task.id} task={task} users={users} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

type Tab = "all_tasks" | "by_user" | "all_users";

const TABS: { id: Tab; label: string }[] = [
  { id: "all_tasks", label: "All Tasks" },
  { id: "by_user", label: "By User" },
  { id: "all_users", label: "All Users" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("all_tasks");

  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, tasksRes] = await Promise.all([
          axios.get(`${API_BASE}/users/`),
          axios.get(`${API_BASE}/tasks/`),
        ]);
        setUsers(usersRes.data);
        setTasks(tasksRes.data);

        console.log(usersRes);
        

      } catch (error) {
        console.log("Erro ao buscar dados", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-1 text-2xl font-bold text-zinc-900">Task Dashboard</h1>
        <p className="mb-6 text-sm text-zinc-500">Manage and view tasks across your team.</p>

        <div className="mb-6 flex gap-1 rounded-lg border border-zinc-200 bg-white p-1 shadow-sm">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-600 hover:bg-zinc-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-sm text-zinc-400">Loading...</p>
        ) : (
          <>
            {activeTab === "all_tasks" && <AllTasksView tasks={tasks} users={users} />}
            {activeTab === "by_user" && <ByUserView users={users} tasks={tasks} />}
            {activeTab === "all_users" && <AllUsersView users={users} tasks={tasks} />}
          </>
        )}
      </div>
    </div>
  );
}
