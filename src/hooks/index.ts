import { useState } from "react";

export type EventState = "pending" | "success" | "error";

export const useEventState = () => useState<EventState>("pending");
