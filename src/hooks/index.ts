import { useState } from "react";

export type EventStateName = "pending" | "fetching" | "error" | "success";
export const useEventState = () => useState<EventStateName>("pending");
