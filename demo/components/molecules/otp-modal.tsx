"use client";

import { useState } from "react";
import { AlertDialogProps } from "@radix-ui/react-alert-dialog";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { LoadingButton } from "./loading-button";

interface Props extends Omit<AlertDialogProps, "children"> {
  description?: string;
  title?: string;
  handleConfirm: (otp: string) => void;
  isPending?: boolean;
}
export function OTPModal({
  defaultOpen,
  onOpenChange,
  open,
  description,
  title,
  handleConfirm,
  isPending,
}: Props) {
  const [otp, setOtp] = useState("");

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title || "One-Time Password"}</AlertDialogTitle>
          <AlertDialogDescription>
            {description || "Please enter the one-time password sent to you."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center justify-center p-4">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={setOtp}
            pattern={REGEXP_ONLY_DIGITS}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <LoadingButton
              disabled={otp.length !== 6 || isPending}
              onClick={() => handleConfirm(otp)}
              isLoading={isPending}
            >
              Confirm
            </LoadingButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
