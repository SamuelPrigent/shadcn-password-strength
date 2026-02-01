"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface PasswordInputProps
  extends Omit<React.ComponentProps<"input">, "type"> {
  id: string;
  visible?: boolean;
  onToggleVisible?: () => void;
}

export function PasswordInput({
  className,
  visible: controlledVisible,
  onToggleVisible,
  ...props
}: PasswordInputProps) {
  const [internalVisible, setInternalVisible] = useState(false);

  const visible =
    controlledVisible !== undefined ? controlledVisible : internalVisible;

  const handleToggle = () => {
    if (onToggleVisible) {
      onToggleVisible();
    } else {
      setInternalVisible((v) => !v);
    }
  };

  return (
    <div className="relative">
      <Input
        type={visible ? "text" : "password"}
        className={cn("pr-9", className)}
        {...props}
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={handleToggle}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
