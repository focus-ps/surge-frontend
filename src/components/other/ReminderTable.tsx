"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BellRing, MoreVertical } from "lucide-react";
import { format } from "date-fns";

interface Reminder {
  name: string;
  notes?: string;
  date: Date;
  recurring: boolean;
  dateAdded: Date;
}

export default function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      name: "Birthday",
      date: new Date("2024-02-05"),
      recurring: true,
      dateAdded: new Date("2024-10-21"),
    },
    {
      name: "Focus Anniversary",
      date: new Date("2024-08-08"),
      recurring: true,
      dateAdded: new Date("2024-03-30"),
    },
    {
      name: "MBA Graduation",
      notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed...",
      date: new Date("2024-11-11"),
      recurring: false,
      dateAdded: new Date("2023-01-02"),
    },
  ]);

  const [newReminder, setNewReminder] = useState<Partial<Reminder>>({
    recurring: false,
  });
  const [open, setOpen] = useState(false);

  const handleAddReminder = () => {
    if (newReminder.name && newReminder.date) {
      setReminders([
        ...reminders,
        {
          ...newReminder as Reminder,
          dateAdded: new Date(),
        },
      ]);
      setNewReminder({ recurring: false });
      setOpen(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg overflow-hidden border border-gray-100">
        <div className="p-6">
          <div className="flex justify-end">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors">
                  + Reminder
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                  <DialogTitle>Add New Reminder</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Reminder Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newReminder.name || ""}
                      onChange={(e) =>
                        setNewReminder({ ...newReminder, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Notes
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newReminder.notes || ""}
                      onChange={(e) =>
                        setNewReminder({ ...newReminder, notes: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) =>
                        setNewReminder({ ...newReminder, date: new Date(e.target.value) })
                      }
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={newReminder.recurring}
                      onChange={(e) =>
                        setNewReminder({ ...newReminder, recurring: e.target.checked })
                      }
                    />
                    <label className="text-sm font-medium text-gray-700">
                      Recurring
                    </label>
                  </div>
                  <button
                    onClick={handleAddReminder}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Add Reminder
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="grid grid-cols-5 gap-6 px-6 py-3 bg-gray-50 font-medium text-xs text-gray-500">
            <div>Reminder Name</div>
            <div>Notes</div>
            <div>Date of Reminder</div>
            <div>Recurring</div>
            <div>Date Added</div>
          </div>
          {reminders.map((reminder, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-4 px-6 py-4 items-center hover:bg-gray-50 font-sm text-sm"
            >
              <div>{reminder.name}</div>
              <div className="text-gray-500 truncate">{reminder.notes || "-"}</div>
              <div>{format(reminder.date, "dd-MM-yy")}</div>
              <div>{reminder.recurring ? "Yes" : "No"}</div>
              <div className="flex justify-between items-center">
                <span>{format(reminder.dateAdded, "dd-MM-yy")}</span>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}