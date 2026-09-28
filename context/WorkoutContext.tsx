"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Workout } from "@/types/workout";

interface WorkoutContextType {
  todayPlan: Workout[];
  savedList: Workout[];
  completedIds: number[];
  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  saveForLater: (workout: Workout) => boolean;
  removeFromSaved: (id: number) => void;
  toggleMarkAsDone: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isCompleted: (id: number) => boolean;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [todayPlan, setTodayPlan] = useState<Workout[]>([]);
  const [savedList, setSavedList] = useState<Workout[]>([]);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedPlan = localStorage.getItem("fitlog_plan");
      const storedSaved = localStorage.getItem("fitlog_saved");
      const storedDone = localStorage.getItem("fitlog_done");

      if (storedPlan) {
        try {
          setTodayPlan(JSON.parse(storedPlan));
        } catch {
          setTodayPlan([]);
        }
      }

      if (storedSaved) {
        try {
          setSavedList(JSON.parse(storedSaved));
        } catch {
          setSavedList([]);
        }
      }

      if (storedDone) {
        try {
          setCompletedIds(JSON.parse(storedDone));
        } catch {
          setCompletedIds([]);
        }
      }

      setIsLoaded(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_plan", JSON.stringify(todayPlan));
    }
  }, [todayPlan, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_saved", JSON.stringify(savedList));
    }
  }, [savedList, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_done", JSON.stringify(completedIds));
    }
  }, [completedIds, isLoaded]);

  const addToPlan = (workout: Workout) => {
    if (todayPlan.length >= 5) {
      toast.error("Cap of 5 lifts reached for today!");
      return false;
    }
    if (todayPlan.some((item) => item.id === workout.id)) {
      toast.error("Already added to today's plan!");
      return false;
    }
    setTodayPlan((prev) => [...prev, workout]);
    toast.success("Added to today's plan");
    return true;
  };

  const removeFromPlan = (id: number) => {
    setTodayPlan((prev) => prev.filter((item) => item.id !== id));
    setCompletedIds((prev) => prev.filter((itemId) => itemId !== id));
    toast.success("Removed from today's plan");
  };

  const saveForLater = (workout: Workout) => {
    if (savedList.some((item) => item.id === workout.id)) {
      toast.error("Already saved for later!");
      return false;
    }
    setSavedList((prev) => [...prev, workout]);
    toast.success("Saved for later");
    return true;
  };

  const removeFromSaved = (id: number) => {
    setSavedList((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from saved");
  };

  const toggleMarkAsDone = (id: number) => {
    if (completedIds.includes(id)) {
      setCompletedIds((prev) => prev.filter((itemId) => itemId !== id));
      toast.success("Marked as not done");
    } else {
      setCompletedIds((prev) => [...prev, id]);
      toast.success("Workout marked as done!");
    }
  };

  const isInPlan = (id: number) => {
    return todayPlan.some((item) => item.id === id);
  };

  const isSaved = (id: number) => {
    return savedList.some((item) => item.id === id);
  };

  const isCompleted = (id: number) => {
    return completedIds.includes(id);
  };

  return (
    <WorkoutContext.Provider
      value={{
        todayPlan,
        savedList,
        completedIds,
        addToPlan,
        removeFromPlan,
        saveForLater,
        removeFromSaved,
        toggleMarkAsDone,
        isInPlan,
        isSaved,
        isCompleted,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkoutContext() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkoutContext must be used within a WorkoutProvider");
  }
  return context;
}
