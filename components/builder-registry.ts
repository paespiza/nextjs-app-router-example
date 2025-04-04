import { builder as rawBuilder } from "@builder.io/react";
import type { Builder } from "@builder.io/react";
import LocalePicker from "./LocalePicker";

const builder = rawBuilder as unknown as Builder;

builder.init("f154bf67d18c42acae68064617b93b4b");

(builder as any).registerComponent(LocalePicker, {
    name: "Locale Picker",
    inputs: [],
  });
  
