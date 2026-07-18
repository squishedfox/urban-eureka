import { useState } from "react";

export type EventStateName = "pending" | "fetching" | "error" | "success";
export const useEventState = () => useState<EventStateName>("pending");

export const useTranslations = () => {
  // TODO: add translations

  return useState<"en-US" | "fr-FR" | "es-ES" | "es-MX">("en-US");
};
