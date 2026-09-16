import type { Dispatch, SetStateAction } from "react";

export type Setter<T> = Dispatch<SetStateAction<T>>;

export type ChannelKind = "team" | "messaging";
