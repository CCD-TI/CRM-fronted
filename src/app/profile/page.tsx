"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ChatsCard } from "../(home)/_components/chats-card";

import { useEffect, useState } from "react";

export default function Page() {


  return (
    <div className="mx-auto w-full max-w-[970px]">
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <ChatsCard  />
      </div>
    </div>
  );
}
